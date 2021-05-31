<template>
    <div :key="version" id="plugins"></div>
</template>

<script>
    export default {
        name: "plugins",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #plugins {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
