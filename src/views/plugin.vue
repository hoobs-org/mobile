<template>
    <div :key="version" id="plugin"></div>
</template>

<script>
    export default {
        name: "plugin",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #plugin {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
