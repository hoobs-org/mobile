<template>
    <div id="app" :theme="theme || 'dark'">
        <component :is="$route.meta.layout">
            <router-view class="view" />
        </component>
    </div>
</template>

<script>
    import PublicLayout from "@/layouts/public.vue";
    import AuthenticatedLayout from "@/layouts/authenticated.vue";

    export default {
        name: "app",

        components: {
            "public": PublicLayout,
            "authenticated": AuthenticatedLayout,
        },

        computed: {
            theme() {
                return this.$store.state.theme;
            },
        },
    };
</script>

<style>
    @font-face {
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local("Montserrat Regular"), local("Montserrat-Regular"), url(./assets/montserrat.woff2) format("woff2");
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }

    @font-face {
        font-family: "Montserrat Black";
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: local("Montserrat Black"), local("Montserrat-Black"), url(./assets/montserrat-black.woff2) format("woff2");
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
</style>

<style>
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #app {
        width: 100%;
        height: 100%;
        display: flex;
        font-family: "Montserrat", sans-serif;
        color: var(--application-text);
        background: var(--application-background);
        overflow: hidden;
    }
</style>
