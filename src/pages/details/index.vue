<template>
    <view class="details_warp">
        
        <view class="details">
            <view class="tab-bar">
                <text 
                    v-for="(item, index) in tabs" 
                    :key="index"
                    :class="{ active: type === item.value }"
                    @click="changeTab(item.value)"
                >
                    {{ item.name }}
                </text>
            </view>
        </view>

        <view v-if="wallet.length === 0" class="notdata">暂无数据</view>

        <template v-else>
            <!-- 理财明细 -->
            <view v-if="type === 'lc'" class="pedo_wrap">
                <view v-for="(item, index) in wallet" :key="index" class="pedo">
                    <view class="content_warp">
                        <image src="@/static/img/hb.png" mode="aspectFit" />
                        <view class="content">
                            <view class="title-row">
                                <text>{{ item.lname }}</text>
                                <text class="days">{{ item.days }}天</text>
                                <text>利息：{{ item.lixi }}%</text>
                            </view>
                            <text class="date">{{ item.addtime }} - {{ item.endtime }}</text>
                        </view>
                        <text :class="['amount', item.lx === '收入' ? 'income' : 'expense']">
                            {{ item.lx === '收入' ? '+' : '-' }}{{ item.moneys }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 其他明细 -->
            <view v-else class="pedo_wrap">
                <view v-for="(item, index) in wallet" :key="index" class="pedo">
                    <view class="content_warp">
                        <image src="@/static/img/hb.png" mode="aspectFit" />
                        <view class="content">
                            <text class="desc">{{ item.shuoming || '-' }}（{{ item.res }}）</text>
                            <text class="date">{{ item.addtime }}</text>
                        </view>
                        <text :class="['amount', item.lx === '收入' ? 'income' : 'expense']">
                            {{ item.lx === '收入' ? '+' : '-' }}{{ item.moneys }}
                        </text>
                    </view>
                </view>
            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getstream, getjfstream, getszstream, gethdstream, getlicaimx } from '@/api/index';

interface WalletItem {
    lname?: string;
    days?: string;
    lixi?: string;
    addtime: string;
    endtime?: string;
    moneys: string;
    lx: string;
    shuoming?: string;
    res?: string;
}

const type = ref('zj');
const wallet = ref<WalletItem[]>([]);

const tabs = [
    { name: '资金明细', value: 'zj' },
    { name: '活动明细', value: 'hd' },
    { name: '积分明细', value: 'jf' },
    { name: '理财明细', value: 'lc' }
];

const back = () => {
    uni.navigateBack();
};

const changeTab = async (newType: string) => {
    type.value = newType;
    await getData();
};

const getData = async () => {
    const apiMap: any = {
        zj: getszstream,
        hd: gethdstream,
        jf: getjfstream,
        lc: getlicaimx
    };
    
    const res = await apiMap[type.value]();
    wallet.value = type.value === 'lc' ? res.licai : res.records;
};
onLoad((options:any)=>{
    type.value = options.type?options.type:'zj';
    getData();
})
</script>

<style lang="scss" scoped>
.details_warp {
    min-height: 100vh;
    background: #f5f7fa;

    .details {

        .tab-bar {
            display: flex;
            justify-content: space-between;
            background: #000;
            padding: 0;
            
            text {
                flex: 1;
                height: 88rpx;
                line-height: 88rpx;
                text-align: center;
                font-size: 28rpx;
                color: rgba(255, 255, 255, 0.8);
                position: relative;

                &.active {
                    color: #fff;
                    font-weight: 500;
                    
                    &::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 40rpx;
                        height: 4rpx;
                        background: #fff;
                        border-radius: 2rpx;
                    }
                }
            }
        }
    }

    .notdata {
        text-align: center;
        padding: 40rpx;
        color: #999;
        font-size: 28rpx;
    }

    .pedo_wrap {
        padding: 20rpx;

        .pedo {
            background: #fff;
            border-radius: 12rpx;
            margin-bottom: 20rpx;

            .content_warp {
                padding: 30rpx;
                display: flex;
                align-items: center;

                image {
                    width: 80rpx;
                    height: 80rpx;
                    margin-right: 20rpx;
                }

                .content {
                    flex: 1;

                    .title-row {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10rpx;
                        font-size: 28rpx;
                        color: #333;

                        .days {
                            margin: 0 10rpx;
                        }
                    }

                    .desc {
                        font-size: 28rpx;
                        color: #333;
                        margin-bottom: 10rpx;
                        display: block;
                    }

                    .date {
                        font-size: 24rpx;
                        color: #999;
                        display: block;
                    }
                }

                .amount {
                    font-size: 32rpx;
                    font-weight: bold;

                    &.income {
                        color: #ff6b21;
                    }

                    &.expense {
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>
