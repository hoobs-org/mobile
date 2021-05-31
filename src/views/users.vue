<template>
    <div :key="version" id="users"></div>
</template>

<script>
    export default {
        name: "users",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #users {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
