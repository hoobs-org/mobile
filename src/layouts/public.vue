<template>
    <div id="public">
        <slot />
    </div>
</template>

<script>
    export default {
        name: "public",
    };
</script>

<style scoped>
    #public {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-family: "Montserrat", sans-serif;
        color: var(--application-text);
        background-image: var(--backdrop);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        overflow: hidden;
    }
</style>
