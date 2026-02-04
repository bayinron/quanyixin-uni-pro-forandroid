<template>
    <view class="takeout_warp">        
        <view v-if="data.length === 0" class="notdata">暂无数据</view>
        
        <view v-else class="depo">
            <view 
                v-for="(item, index) in data" 
                :key="index" 
                class="transfer_warp"
                @click="newsDetail(item.Id)"
            >
                <view class="amount-row">
                    <text>-{{ item.moneys }}（{{ item.res }}）</text>
                    <text>{{ item.days }}</text>
                </view>
                <view class="info-row">
                    <text>{{ item.addtime }}</text>
                    <text>{{ item.shuoming }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gettxstream } from '@/api/index';

interface TakeoutItem {
    Id: string;
    moneys: string;
    res: string;
    days: string;
    addtime: string;
    shuoming: string;
}

const data = ref<TakeoutItem[]>([]);

const back = () => {
    uni.navigateBack();
};

const newsDetail = (id: string) => {
    uni.navigateTo({
        url: `/pages/news/detail?id=${id}`
    });
};

const getData = async () => {
    const res = await gettxstream();
    data.value = res.records || [];
};

getData();
</script>

<style lang="scss" scoped>
.takeout_warp {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 20rpx;

    .notdata {
        text-align: center;
        padding: 40rpx;
        color: #999;
        font-size: 28rpx;
    }

    .depo {
        .transfer_warp {
            background: #fff;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
            padding: 30rpx;

            .amount-row {
                display: flex;
                justify-content: space-between;
                font-size: 32rpx;
                color: #333;
                margin-bottom: 16rpx;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                font-size: 24rpx;
                color: #999;
            }
        }
    }
}
</style>
