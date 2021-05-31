<template>
    <div :key="version" id="terminal"></div>
</template>

<script>
    export default {
        name: "terminal",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #terminal {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
