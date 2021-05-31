<template>
    <div :key="version" id="favorites"></div>
</template>

<script>
    export default {
        name: "favorites",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #favorites {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
