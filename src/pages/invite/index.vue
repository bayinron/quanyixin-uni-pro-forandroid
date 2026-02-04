<template>
    <MyNavBar title="" />
    <div class="invite_warp">
        <image class="yqbg" src="@/static/img/yqhybg.png" mode="widthFix" />
        <div class="erweima">
            <qrcode-vue :value="spreadurl" :size="82" level="H" render-as="svg" class="qr-code" />
        </div>
        <view class="invite_url">{{ spreadurl }}</view>
        <div class="invite_text">
            <div class="code-copy-btn goldbtn" :data-clipboard-text="spreadurl" @click="copyCode">复制链接发送好友</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getInvest } from '@/api/index';
import QrcodeVue from 'qrcode.vue';
import globalTool from '@/utils/globalTool';
import MyNavBar from '@/components/MyNavBar.vue';

const spreadurl = ref('');

const copyCode = () => {
    globalTool.copyText(spreadurl.value, '已复制到剪贴板');
};

onShow(() => {
    getData();
});

function getData() {
    getInvest().then((data: any) => {
        spreadurl.value = `${location.origin}/#/pages/register/index?bianhao=${data.bianhao}`;
    });
}
</script>

<style scoped lang="scss">
.invite_warp {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #000;
    padding-bottom: 50rpx;
    .yqbg {
        width: 100%;
        height: auto;
        left: 0;
    }
    .invite_url {
        display: inline-block;
        font-size: 26rpx;
        color: #000000;
        line-height: 30rpx;
        position: absolute;
        top: 73%;
        left: 65.5%;
        transform: translateX(-50%);
        width: 320rpx;
        text-wrap: wrap;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
        overflow-wrap: break-word;
        white-space: normal;
    }
    .erweima {
        width: 23%;
        position: absolute;
        top: 74%;
        left: 26.5%;
        transform: translateX(-50%);

        .qr-code {
            width: 100%;
            height: 100%;
        }
    }
    .invite_text {
        // position: absolute;
        // bottom: 0;
        // left: 50%;
        // transform: translate(-50%, -50%);
        width: 710rpx;
        margin: 0 auto;
        text-align: center;
        display: inline-block;
        .code-copy-btn {
            width: 500rpx;
            height: 80rpx;
            margin: 0 auto;
            border-radius: 10rpx;
            margin-top: 20rpx;
            font-size: 26rpx;
            color: #000000;
            line-height: 80rpx;
        }
    }
}
</style>
