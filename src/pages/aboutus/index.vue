<template>
    <view>
        <!-- <MyNavBar title="" /> -->
        <image src="@/static/img/aboutus.png" class="w-full" mode="widthFix" />
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MyNavBar from '@/components/MyNavBar.vue';
import { getNotice } from '@/api/index';

const title = ref('');
const news_con = ref('');
const type = ref<number | null>(null);


function GetData() {
    getNotice('10').then((data: any) => {
        news_con.value = data.msg.con;
    });
}
function goDownload() {
    window.location.href = 'https://ya.cn/';
}
</script>

<style scoped lang="scss">
.aboutus_warp {
    background-color: #eff9ff;
    padding-bottom: 100rpx;
    min-height: 100vh;
    background-color: white;
    .aboutus {
        img {
            width: 100%;
            margin-top: -15px;
        }
        view{
            font-size: 32rpx;
            color: #333;
            margin: 0 auto;
            margin-top: -120rpx;
            text-align: center;
        }
    }

    .xr {
        position: relative;
        margin-left: 80rpx;
        font-size: 32rpx;
        width: 590rpx;
        height: 90rpx;
        background-color: #16cee5;
        border-radius: 50rpx;
        margin-top: 130rpx;
        text-align: center;
        line-height: 90rpx;
        color: #f2f2f2;
        margin-left: 60rpx;
        border-radius: 50rpx;
       
    }
}
</style>
