<template>
    <div class="webapp-webview">
        <MyNavBar title="客服" />

        <iframe :src="url" frameborder="0" allowfullscreen></iframe>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const url = ref('');
const setUrl = (newUrl: string) => {
    url.value = newUrl;
}
onLoad((options: any) => {
    setUrl(options.url);
})
</script>
<style lang="scss" scoped>
.webapp-webview {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: #FFFFFF;
}

iframe {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    border: none;
    position: relative;
    z-index: 100;
}
</style>