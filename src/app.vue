<template>
    <view class="container">
        <status-bar background-color="#141414" bar-style="light-content" />
    </view>
</template>

<script>
    export default {
        name: "app",

        mounted() {
            this.$scanner.start();
        },
    };
</script>

<style>
    .container {
        background-color: #141414;
        align-items: center;
        justify-content: center;
        flex: 1;
    }

    .text {
        color: #999;
    }
</style>
