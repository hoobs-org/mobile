import hoobs from "@hoobs/sdk";
import Vue from "vue-native-core";
import Scanner from "./scanner";

import register from "expo/build/launch/registerRootComponent";
import store from "./store";
import actions from "./actions";
import app from "./app.vue";

const scanner = new Scanner();
const io = hoobs.sdk.io();

hoobs.sdk.config.token.get(() => store.state.session);
hoobs.sdk.config.token.set((token) => { store.commit("SESSION:SET", token); });

scanner.on("device", (data) => store.commit("IO:DEVICE", data));
scanner.on("clear", () => store.commit("IO:DEVICE:CLEAR"));

io.on("log", (data) => store.commit("IO:LOG", data));
io.on("monitor", (data) => store.commit("IO:MONITOR", data));
io.on("notification", (data) => store.commit("IO:NOTIFICATION", data));
io.on("accessory_change", (data) => store.commit("IO:ACCESSORY:CHANGE", data));
io.on("room_change", (data) => store.commit("IO:ROOM:CHANGE", data));

io.on("connect", () => actions.emit("io", "connected"));
io.on("reconnect", () => actions.emit("io", "connected"));
io.on("disconnect", () => actions.emit("io", "disconnected"));

actions.on("log", "history", () => {
    hoobs.sdk.log().then((messages) => store.commit("LOG:HISTORY", messages));
});

const { current } = store.state;

if (current) hoobs.sdk.config.host.set(current.ip, current.port);

Vue.use(io);
Vue.use(hoobs);
Vue.use(store);
Vue.use(scanner);
Vue.use(actions);

register(app);
