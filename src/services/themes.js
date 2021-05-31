import Sanitize from "@hoobs/sdk/lib/sanitize";

export function path(theme, hoobs, store) {
    switch (theme) {
        case "light":
        case "dark":
            return `/defaults/${theme}/theme.css`;

        default:
            if (hoobs && store && store.state.current) {
                try {
                    return `${hoobs.sdk.config.host.get("themes")}/${theme}/theme.css`;
                } catch (_error) {
                    return "/defaults/dark/theme.css";
                }
            }

            return "/defaults/dark/theme.css";
    }
}

export async function set(name, hoobs, store) {
    const style = document.getElementById("app-theme");

    if (hoobs && store && store.state.current) {
        const config = await hoobs.sdk.config.get();

        config.theme = Sanitize(name);

        await hoobs.sdk.config.update(config);
    }

    if (style) style.setAttribute("href", path(Sanitize(name), hoobs, store));
    if (store) store.commit("THEME:SET", Sanitize(name));
}

export async function load(hoobs, store) {
    const style = document.getElementById("app-theme");

    let theme = {};

    if (hoobs && store && store.state.current) {
        const config = await hoobs.sdk.config.get();

        theme = await hoobs.sdk.theme.get(config.theme || "dark");
    }

    if (style) style.setAttribute("href", path(theme.name || "dark", hoobs, store));
    if (store) store.commit("THEME:SET", theme.name || "dark");
}

export default {
    install(vue, options) {
        vue.mixin({
            computed: {
                $theme() {
                    return {
                        load() {
                            load(options.hoobs, options.store);
                        },

                        set(name) {
                            set(name, options.hoobs, options.store);
                        },

                        async get() {
                            const config = await options.hoobs.sdk.config.get();
                            const theme = await options.hoobs.sdk.theme.get(config.theme || "dark");

                            return theme;
                        },
                    };
                },
            },
        });
    },
};
