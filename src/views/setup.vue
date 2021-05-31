<template>
    <div :key="version" id="setup"></div>
</template>

<script>
    export default {
        name: "setup",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #setup {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
