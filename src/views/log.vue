<template>
    <div :key="version" id="log"></div>
</template>

<script>
    export default {
        name: "log",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #log {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
