<template>
    <div :key="version" id="bridges"></div>
</template>

<script>
    export default {
        name: "bridges",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #bridges {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
