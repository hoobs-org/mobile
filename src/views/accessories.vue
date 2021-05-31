<template>
    <div :key="version" id="accessories"></div>
</template>

<script>
    export default {
        name: "accessories",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #accessories {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
