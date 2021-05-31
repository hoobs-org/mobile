import Vue from "vue";

class Events {
    constructor() {
        this.events = new Vue();
    }

    on(view, event, callback) {
        this.events.$on(`${view}:${event}`, callback);
    }

    off(view, event) {
        this.events.$off(`${view}:${event}`);
    }

    emit(view, event, payload) {
        this.events.$emit(`${view}:${event}`, payload);
    }

    install(vue) {
        vue.mixin({ computed: { $action: () => this } });
    }
}

export default new Events();
