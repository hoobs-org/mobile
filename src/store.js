import Vue from "vue-native-core";
import Vuex from "vuex";
import Persist from "vuex-persist";
import Storage from "./storeage";
import { units, timespan } from "./formatters";

Vue.use(Vuex);

const emitter = () => {
    return (store) => {
        store.subscribe(mutation => {
            if (mutation.type === "RESTORE_MUTATION") {
                store._vm.$root.$emit("storageReady");
            }
        });
    };
};

const persistence = new Persist({
    key: "hoobs:state",
    strictMode: true,
    storage: Storage,
    asyncStorage: true,
    reducer: (state) => ({
        bridges: state.bridges,
        cpu: state.cpu,
        memory: state.memory,
        temp: state.temp,
        session: state.session,
        user: state.user,
        notifications: state.notifications,
        snapshots: state.snapshots,
        streaming: state.streaming,
        navigation: state.navigation,
    }),
});

export default new Vuex.Store({
    state: {
        log: [],
        current: null,
        devices: [],
        bridges: [],
        cpu: {
            used: null,
            history: [
                [0, 0], [1, 0], [2, 0], [3, 0],
                [4, 0], [5, 0], [6, 0], [7, 0],
                [8, 0], [9, 0], [10, 0], [11, 0],
                [12, 0], [13, 0], [14, 0], [15, 0],
                [16, 0], [17, 0], [18, 0], [19, 0],
            ],
        },
        memory: {
            load: null,
            total: null,
            used: null,
            history: [
                [0, 0], [1, 0], [2, 0], [3, 0],
                [4, 0], [5, 0], [6, 0], [7, 0],
                [8, 0], [9, 0], [10, 0], [11, 0],
                [12, 0], [13, 0], [14, 0], [15, 0],
                [16, 0], [17, 0], [18, 0], [19, 0],
            ],
        },
        heap: 0,
        temp: null,
        session: "",
        user: {
            permissions: {},
        },
        auth: false,
        notifications: [],
        snapshots: {},
        streaming: {},
        latest: null,
        navigation: false,
        accessory: null,
        room: null,
        theme: null,
    },

    getters: {
        theme(state) {
            return state.theme;
        },
    },

    mutations: {
        "RESTORE_MUTATION": persistence.RESTORE_MUTATION,

        "IO:DEVICE": (state, payload) => {
            const index = state.devices.findIndex((item) => item.mac === payload.mac);

            if (index >= 0) {
                state.devices[index] = payload;
            } else {
                state.devices.push(payload);
            }
        },

        "IO:DEVICE:SET": (state, payload) => {
            state.current = payload;
        },

        "IO:DEVICE:CLEAR": (state) => {
            state.current = null;
            state.devices = [];
        },

        "IO:LOG": (state, payload) => {
            state.log.push(payload);
            state.log = state.log.slice(Math.max(state.log.length - 5000, 0));
        },

        "IO:MONITOR": (state, payload) => {
            const keys = Object.keys(payload.data.bridges);
            const bridges = [];

            for (let i = 0; i < keys.length; i += 1) {
                const { ...bridge } = payload.data.bridges[keys[i]];

                bridges.push({
                    id: keys[i],
                    display: bridge.display,
                    version: bridge.version,
                    running: bridge.running,
                    uptime: timespan(bridge.uptime),
                    heap: bridge.heap,
                });
            }

            state.bridges = bridges;
            state.temp = (payload.data.temp.main || -1) > -1 ? payload.data.temp.main : null;

            state.cpu.used = 100 - Math.round(payload.data.cpu.currentLoadIdle || 100);
            state.cpu.available = Math.round(payload.data.cpu.currentLoadIdle || 100);

            state.memory.load = Math.round((payload.data.memory.total || 0) > 0 ? ((payload.data.memory.active || 0) * 100) / (payload.data.memory.total || 0) : 0);
            state.memory.total = units(payload.data.memory.total || 0);
            state.memory.used = units(payload.data.memory.active || 0);

            for (let i = 0; i < state.cpu.history.length - 1; i += 1) {
                state.cpu.history[i] = state.cpu.history[i + 1];
                state.cpu.history[i][0] = i;

                state.memory.history[i] = state.memory.history[i + 1];
                state.memory.history[i][0] = `${i}`;
            }

            state.cpu.history[state.cpu.history.length - 1] = [state.cpu.history.length - 1, state.cpu.used];
            state.memory.history[state.memory.history.length - 1] = [state.memory.history.length - 1, state.memory.load];
            state.heap = payload.data.heap;
        },

        "IO:NOTIFICATION": (state, payload) => {
            const now = (new Date()).getTime();

            const notification = {
                id: `${now}:${Math.random()}`,
                time: now,
                event: payload.event,
                bridge: payload.bridge,
                type: payload.data.type,
                title: payload.data.title,
                description: payload.data.description,
                icon: payload.data.icon,
                ttl: now + (1 * 60 * 60 * 1000),
            };

            if (state.latest) clearTimeout(state.latest.timer);

            state.latest = {
                timer: setTimeout(() => {
                    state.latest = null;
                }, 10 * 1000),
                notification,
            };

            state.notifications.unshift(notification);
        },

        "IO:SNAPSHOT:UPDATE": (state, payload) => {
            state.snapshots[payload.id] = payload.data;
        },

        "IO:ACCESSORY:CHANGE": (state, payload) => {
            state.accessory = payload.data;
        },

        "IO:ROOM:CHANGE": (state, payload) => {
            state.room = payload.data;
        },

        "SESSION:SET": (state, token) => {
            state.session = token;

            if (token && token !== "") {
                const user = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

                state.user = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    permissions: user.permissions || {},
                };
            } else {
                state.user = {
                    permissions: {},
                };
            }
        },

        "SESSION:DISABLE": (state) => {
            state.session = "";

            state.user = {
                id: 1,
                name: "unavailable",
                username: "unavailable",
                permissions: {
                    accessories: true,
                    bridges: true,
                    config: true,
                    controller: true,
                    plugins: true,
                    reboot: true,
                    terminal: true,
                    users: false,
                },
            };
        },

        "LOG:HISTORY": (state, messages) => {
            state.log = messages;
            state.log = state.log.slice(1).slice(-5000);
        },

        "NOTIFICATION:ADD": (state, payload) => {
            const now = (new Date()).getTime();
            const { ...notification } = payload;

            notification.id = `${now}:${Math.random()}`;
            notification.time = now;
            notification.ttl = now + (1 * 60 * 60 * 1000);

            state.notifications.unshift(notification);
        },

        "NOTIFICATION:DISMISS": (state, id) => {
            state.notifications = state.notifications.filter((item) => (item.id || "") !== "" && (item.id || "") !== id);
        },

        "NOTIFICATION:DISMISS:LATEST": (state) => {
            if (state.latest) clearTimeout(state.latest.timer);

            state.latest = null;
        },

        "NOTIFICATION:DISMISS:ALL": (state) => {
            state.notifications = [];
        },

        "NOTIFICATION:DISMISS:OLD": (state) => {
            const now = (new Date()).getTime();

            state.notifications = state.notifications.filter((item) => (item.ttl || 0) > now);
        },

        "NAVIGATION:STATE": (state, value) => {
            state.navigation = value;
        },

        "AUTH:STATE": (state, value) => {
            if (value === "enabled") {
                state.auth = true;
            } else {
                state.auth = false;
            }
        },

        "THEME:SET": (state, theme) => {
            state.theme = theme;
        },

        "ACCESSORY:STREAMING": (state, payload) => {
            state.streaming[payload.id] = payload.data;
        },
    },

    plugins: [persistence.plugin, emitter()],
    persistence,

    install(vue) {
        vue.mixin({ computed: { $store: () => this } });
    },
});
