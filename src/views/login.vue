<template>
    <div :key="version" id="login"></div>
</template>

<script>
    export default {
        name: "login",

        data() {
            return {
                version: 0,
            };
        },
    };
</script>

<style scoped>
    #login {
        flex: 1;
        display: flex;
        background: var(--application-background);
    }
</style>
