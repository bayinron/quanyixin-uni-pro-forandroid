<template>
    <MyNavBar title="" />
    <view class="zhuli-container">
        <image mode="widthFix" src="@/static/img/zhuli3.png" class="zhuli-img"></image>
        <image mode="widthFix" src="@/static/img/zhuli2.png" class="zhuli-img"></image>
        <image mode="widthFix" src="@/static/img/zhuli1.png" class="zhuli-img"></image>
    </view>
</template>
<script setup lang="ts">
import MyNavBar from '@/components/MyNavBar.vue';
</script>
<style lang="scss" scoped>
.zhuli-container {
    width: 750rpx;
    font-size: 0; /* 消除图片之间的间距 */
    line-height: 0;
    
    .zhuli-image {
        width: 750rpx;
        display: block; /* 消除图片之间的间距 */
    }
}
</style>
