import hoobs from "@hoobs/sdk";
import Vue from "vue";

import App from "./app.vue";

import actions from "./services/actions";
import router from "./services/router";
import themes from "./services/themes";
import store from "./services/store";

const io = hoobs.sdk.io();

hoobs.sdk.config.token.get(() => store.state.session);
hoobs.sdk.config.token.set((token) => { store.commit("SESSION:SET", token); });

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

router.beforeEach((to, _from, next) => {
    if (store.state.current) {
        hoobs.sdk.auth.validate().then((valid) => {
            if (["/login", "/setup"].indexOf(to.path) === -1 && !valid) router.push({ path: "/login", query: { url: to.path } });
        });
    } else if (["/login", "/setup"].indexOf(to.path) === -1) {
        router.push({ path: "/login", query: { url: to.path } });
    }

    next();
});

Vue.config.productionTip = false;

Vue.use(io);
Vue.use(hoobs);
Vue.use(actions);

Vue.use(themes, { hoobs, store });

new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>",
});
