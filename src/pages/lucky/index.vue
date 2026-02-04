<template>
    <view class="lucky-page">
        <view class="page-header">
            <text class="title">福利活动</text>
            <text class="subtitle">邀请好友获得抽奖机会</text>
        </view>
        
        <LuckyGrid 
            :prizes="prizes"
            :defaultSpeed="200"
            :defaultTimes="50"
            @finish="onLotteryFinish"
        />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LuckyGrid from '@/components/LuckyGrid.vue';

const prizes = ref([
    {
        image: '/static/img/red-packet.png',
        name: '588现金红包',
        price: '¥588'
    },
    {
        image: '/static/img/phone.png',
        name: '苹果16PM',
    },
    {
        image: '/static/img/red-packet.png',
        name: '38现金红包',
        price: '¥38'
    },
    {
        image: '/static/img/scooter.png',
        name: '电动车'
    },
    {
        image: '/static/img/logo.png',
        name: '谢谢参与'
    },
    {
        image: '/static/img/red-packet.png',
        name: '18现金红包',
        price: '¥18'
    },
    {
        image: '/static/img/red-packet.png',
        name: '88现金红包',
        price: '¥88'
    },
    {
        image: '/static/img/tablet.png',
        name: '华为PURE X平板'
    },
    {
        image: '/static/img/red-packet.png',
        name: '188现金红包',
        price: '¥188'
    }
]);

const onLotteryFinish = (index: number) => {
    const prize = prizes.value[index];
    uni.showModal({
        title: '恭喜',
        content: `您抽中了${prize.name}`,
        showCancel: false
    });
};
</script>

<style lang="scss" scoped>
.lucky-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #1e6df7 0%, #2b7fff 100%);
    padding: 40rpx 20rpx;
}

.page-header {
    text-align: center;
    margin-bottom: 40rpx;
    
    .title {
        font-size: 48rpx;
        color: #fff;
        font-weight: bold;
        margin-bottom: 20rpx;
        display: block;
    }
    
    .subtitle {
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.8);
        display: block;
    }
}
</style> 