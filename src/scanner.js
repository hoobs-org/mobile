import EventEmitter from "events";
import NetInfo from "@react-native-community/netinfo";
import { ip } from "./formatters";

export default class Scanner extends EventEmitter {
    constructor() {
        super();

        this.stopped = true;

        this.total = 0;
        this.count = 0;
        this.errors = 0;

        this.timeout = 5 * 1000;
    }

    async start(devices, ...ports) {
        if (this.stopped) {
            this.stopped = false;

            this.total = 0;
            this.count = 0;
            this.errors = 0;

            this.emit("start");
            this.emit("clear");
            this.emit("progress", 0);

            const network = await this.subnet();

            console.log(network);
        }
    }

    async subnet() {
        const info = await NetInfo.fetch();
        const address = info.details.ipAddress.match(/\d+/g).map((item) => parseInt(item, 10));
        const bits = Scanner.bits(info.details.subnet);
        const mask = info.details.subnet.match(/\d+/g).map((item, index) => index === 3 ? 0 : parseInt(item, 10));
        const network = address.map((item, index) => item & mask[index]);
        const broadcast = address.map((item, index) => item | (~ mask[index] & 0xff));

        return {
            count: Math.pow(2,32 - bits) - 2,
            start: ip.expand(network.map((item, index) => index === 3 ? item + 1 : item).join(".")),
            end: ip.expand(broadcast.map((item, index) => index === 3 ? item - 1 : item).join(".")),
            address: address.join("."),
            network: network.join("."),
            broadcast: broadcast.join("."),
            cidr: `${network.join(".")}/${bits}`,
        };
    }

    stop() {
        this.stopped = true;
        this.emit("stop");
    }

    install(vue) {
        vue.mixin({
            computed: {
                $scanner: () => this,
            },
        });
    }

    static bits(subnet) {
        const nodes = subnet.match(/(\d+)/g);

        let cidr = 0;

        for (let i = 0; i < nodes.length; i += 1) {
            cidr += (((nodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }

        return cidr;
    }
}
