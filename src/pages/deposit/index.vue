<template>
    <view class="deposit_warp">
        
        <view v-if="data.length === 0" class="notdata">暂无数据</view>
        
        <view v-else class="depo">
            <view 
                v-for="(item, index) in data" 
                :key="index" 
                class="transfer_warp"
                @click="newsDetail(item.Id)"
            >
                <view class="transfer-content">
                    <view class="left">
                        <text class="desc">{{ item.shuoming || '-' }}（{{ item.res }}）</text>
                        <text class="amount">+{{ item.moneys }}</text>
                    </view>
                    <text class="time">{{ item.addtime }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getstream } from '@/api/index';

interface DepositItem {
    Id: string;
    shuoming: string;
    res: string;
    moneys: string;
    addtime: string;
}

const data = ref<DepositItem[]>([]);

const back = () => {
    uni.navigateBack();
};

const newsDetail = (id: string) => {
    uni.navigateTo({
        url: `/pages/news/detail?id=${id}`
    });
};

const getData = async () => {
    const res = await getstream();
    data.value = res.records || [];
};

getData();
</script>

<style lang="scss" scoped>
.deposit_warp {
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

            .transfer-content {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    .desc {
                        font-size: 28rpx;
                        color: #333;
                        margin-bottom: 10rpx;
                        display: block;
                    }

                    .amount {
                        font-size: 32rpx;
                        color: #ff6b21;
                        font-weight: bold;
                    }
                }

                .time {
                    font-size: 24rpx;
                    color: #999;
                }
            }
        }
    }
}
</style>
