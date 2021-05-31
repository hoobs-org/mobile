<template>
    <div id="authenticated">
        <slot />
    </div>
</template>

<script>
    export default {
        name: "authenticated",
    };
</script>

<style scoped>
    #authenticated {
        width: 100%;
        height: 100%;
        display: flex;
        font-family: "Montserrat", sans-serif;
        color: var(--application-text);
        background: var(--application-background);
        overflow: hidden;
    }
</style>
