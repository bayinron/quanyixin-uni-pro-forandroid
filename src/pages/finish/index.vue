<template>
    <view class="finish_warp">
        <uni-nav-bar title="代还账单记录" left-icon="back" @click-left="goBack" :border="false" background-color="#000" color="#fff">
            <template #right>
                <view class="select-wrapper">
                    <uni-data-select v-model="lx" :localdata="types" :clear="false" class="nav-select" @change="handleSelect" />
                </view>
            </template>
        </uni-nav-bar>

        <view class="repaying">
            <text :class="{ active: isok === '还款中' }" @tap="handleStatusChange('还款中')">
                <text>正在代还</text>
            </text>
            <text :class="{ active: isok === '已完成' }" @tap="handleStatusChange('已完成')">
                <text>代还结束</text>
            </text>
        </view>

        <view v-if="records.length === 0" class="notdata">暂无数据</view>

        <view class="zs_warp">
            <view v-for="(item, index) in records" :key="index" class="record-item">
                <view class="record-header">
                    <text class="section-title">{{ item.dd_name }}</text>
                    <text class="status">{{ item.isok }}</text>
                </view>

                <view class="record-body">
                    <view class="amount-section">
                        <text class="currency">¥</text>
                        <text class="amount">{{ item.moneys }}</text>
                    </view>

                    <view class="details-row">
                        <text>分润：{{ item.fen }}元</text>
                        <text>代还：{{ item.days }}天</text>
                    </view>
                </view>

                <view class="record-footer">
                    <text>{{ item.endtime }}</text>
                    <view class="flex">
                        <view class="btn-detail" @tap="goToDetails(item.sid)">查看详情</view>
                        <view class="btn-contract" @tap="goToContract(item.sid)">查看合同</view>
                    </view>
                </view>
            </view>
        </view>

        <uni-popup ref="message" type="message">
            <uni-popup-message :message="msg" :type="messageType" />
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import globalTool from '@/utils/globalTool';
import { getStrade } from '@/api/index';
interface TypeOption {
    title: string;
    key: string;
    value: string;
}

interface TradeRecord {
    fen: number;
    days: number;
    endtime: string;
    dd_name: string;
    moneys: number;
    sid: string;
    isok: string;
}

interface ApiResponse {
    result: string;
    usename?: string;
    bankname?: string;
    bankpic?: string;
    ding?: TradeRecord[];
    msg?: string;
}
const records = ref<TradeRecord[]>([]);
var initRecords: any[] = [];
const show = ref(false);
const bankname = ref('');
const bankpic = ref('');
const usename = ref('');
const msg = ref('');
const isok = ref('还款中');
const lx = ref('1');
const types = ref([
    { text: '信用卡', value: '1' },
    { text: '房产', value: '2' },
    { text: '车产', value: '3' }
]);

const messageType = ref('info');
const url = ref('');

const getData = async () => {
    records.value = [];
    initRecords = [];
    const res: any = await getStrade(lx.value);
    const data: ApiResponse = res;

    usename.value = data.usename || '';
    bankname.value = data.bankname || '';
    bankpic.value = data.bankpic || '';

    initRecords = data.ding || [];
    records.value = initRecords.filter((item) => item.isok === isok.value);
};

const handleSelect = (value: string) => {
    const selected = types.value.find((item: any) => item.value === value);
    if (selected) {
        lx.value = selected.value;
        getData();
    }
};

const handleStatusChange = (status: string) => {
    isok.value = status;
    // getData();
    records.value = initRecords.filter((item) => item.isok === isok.value);
};

const goBack = () => {
    globalTool.back();
};

const goToDetails = (sid: string) => {
    uni.navigateTo({ url: `/pages/revenuedetails/index?sid=${sid}` });
};

const goToContract = (sid: string) => {
    uni.navigateTo({ url: `/pages/contract/index?sid=${sid}` });
};

onShow(() => {
    records.value = [];
    getData();
});
</script>

<style lang="scss" scoped>
.finish_warp {
    min-height: 100vh;
    background: #f5f5f5;
}

.select-wrapper {
    margin-right: 0rpx;
    border-radius: 10rpx;
    // padding: 0 20rpx;
    :deep(.nav-select) {
        .uni-select {
            position: absolute;
            top: 10rpx;
            right: 10rpx;
            z-index: 22;

            background: rgba(255, 255, 255, 0.1) !important;
            border: none !important;
            width: 140rpx !important;
            min-width: auto;
            border-radius: 10rpx;
            .uni-select__input-box {
                height: 56rpx !important;
                padding-right: 20rpx !important;
                .uni-select__input-text {
                    font-size: 24rpx;
                    color: #fff !important;
                }

                .uni-icons {
                    color: #fff !important;
                }
            }
        }
    }
    :deep(.uni-scroll-view) {
        color: black;
    }
}

.repaying {
    display: flex;
    background: #000;
    padding: 20rpx 0;

    text {
        flex: 1;
        text-align: center;
        position: relative;
        color: #fff;
        &.active {
            color: #fff !important;
            &::after {
                content: '';
                position: absolute;
                bottom: -10rpx;
                left: 50%;
                transform: translateX(-50%);
                width: 60rpx;
                height: 4rpx;
                background-color: #fff;
                border-radius: 2rpx;
            }
        }
    }
}

.notdata {
    text-align: center;
    padding: 40rpx;
    color: #999;
}

.zs_warp {
    padding: 20rpx;

    .record-item {
        background: #ffffff;
        border-radius: 12rpx;
        margin: 20rpx;
        padding: 30rpx;
        border: 1rpx solid #FFEDD7;
    }

    .record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;

        .section-title {
            font-size: 28rpx;
            color: #fff;
            font-weight: 500;
            border-radius: 0 0 80rpx 0;
            background: linear-gradient(to right, #1F1300 0%, #5E3F0F 99%);
            padding: 10rpx 20rpx;
            padding-right: 30rpx;
        }

        .status {
            font-size: 24rpx;
            color: #ff0000;
        }
    }

    .record-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;
        .amount-section {
            display: flex;
            align-items: baseline;

            .currency {
                font-size: 36rpx;
                color: #333;
                margin-right: 4rpx;
            }

            .amount {
                font-size: 46rpx;
                font-weight: bold;
                color: #333;
            }
        }

        .details-row {
            display: flex;
            gap: 30rpx;

            text {
                font-size: 24rpx;
                color: #666;
            }
        }
    }

    .record-footer {
        display: flex;
        gap: 20rpx;
        justify-content: space-between;
        button {
            flex: 1;
            height: 64rpx;
            line-height: 64rpx;
            font-size: 28rpx;
            border-radius: 32rpx;
            border: none;
            padding: 0;
        }

        .btn-detail {
            background: #ffffff;
            border: 2rpx solid #714603;
            color: #714603;
            border-radius: 32rpx;
            padding: 0 20rpx;
            margin-right: 20rpx;
        }

        .btn-contract {
            background: #714603;
            color: #ffffff;
            border-radius: 32rpx;
            padding: 0 20rpx;
        }
    }
}
</style>
