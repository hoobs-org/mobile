<template>
    <div :key="version" id="config"></div>
</template>

<script>
    export default {
        name: "config",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #config {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
