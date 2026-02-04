<script lang="ts" setup>
import { ref } from 'vue';
import globalTool from '@/utils/globalTool';

function getRuntimeOrigin() {
    if (typeof window !== 'undefined' && window.location) {
        return window.location.origin;
    }
    return import.meta.env.VITE_APP_BASE_URL || '';
}

const defaultOrigin = import.meta.env.VITE_APP_BASE_URL || 'https://xykqain.trustmining.cn';
const runtimeOrigin = getRuntimeOrigin() || defaultOrigin;
const baseUrl = runtimeOrigin.includes('localhost') ? 'https://xykqain.trustmining.cn' : runtimeOrigin;
const url = ref(baseUrl);

function openDownload() {
    globalTool.openExternalUrl(`${url.value}/html`);
}
</script>

<template>
    <div class="download">
        <image mode="widthFix" class="download_bg" src="@/static/img/aaa1.png" alt="" />

        <div class="download_warp">
            <div class="download_btn" @click="openDownload">
                立即下载
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.download {
    min-height: 100vh;
    overflow: hidden;
    position: relative;

    .download_bg {
        position: absolute;
        width: 100%;
    }

    .download_warp {
        position: relative;
        text-align: center;
        position: absolute;
        bottom: 50rpx;
        z-index: 2;
        width: 650rpx;
        left: 50rpx;
        .download_btn {
            border-radius: 50rpx;
            background: linear-gradient(90deg, #a288f3, #6370f3);
            box-shadow: 0 4rpx 8rpx hsla(0, 0%, 100%, 0.25);
            display: flex;
            justify-content: center;

            margin: 60rpx auto;
            line-height: 90rpx;
            height: 90rpx;
            font-size: 32rpx;
            color: #fff;
        }
    }
}
</style>
