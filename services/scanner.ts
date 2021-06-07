import EventEmitter from "events";
import NetInfo from "@react-native-community/netinfo";
import { ip } from "./formatters";

interface Subnet {
    count: number;
    start?: number;
    end?: number;
    address: string;
    network: string;
    broadcast: string;
    cidr: string;
}

interface Active {
    ip: string;
    port: number;
    application: string;
    version: string;
    mac?: string;
}

export default class Scanner extends EventEmitter {
    declare stopped: boolean;

    declare total: number;

    declare count: number;

    declare errors: number;

    declare timeout: number;

    constructor() {
        super();

        this.stopped = true;

        this.total = 0;
        this.count = 0;
        this.errors = 0;

        this.timeout = 5 * 1000;
    }

    async start(devices: Active[], ...ports: number[]): Promise<void> {
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

    async subnet(): Promise<Subnet> {
        const info = await NetInfo.fetch("wifi");
        const details: any | undefined = info.details;
        const address: number[] = (details?.ipAddress || "").match(/\d+/g).map((item: string) => parseInt(item, 10));
        const bits = Scanner.bits(details?.subnet);
        const mask = details?.subnet.match(/\d+/g).map((item: string, index: number) => index === 3 ? 0 : parseInt(item, 10));
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

    static bits(subnet: string) {
        const nodes: number[] = (subnet.match(/(\d+)/g) || []).map((item: any) => parseInt(item, 10));

        let cidr = 0;

        for (let i = 0; i < nodes.length; i += 1) {
            cidr += (((nodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }

        return cidr;
    }
}
