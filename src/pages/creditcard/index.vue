<script setup lang="ts">
import { ref } from 'vue';
import { getAck, getOrderInfo, postOrder } from '@/api/index';

interface DayMoney {
    days: string;
    lixi: string;
}

interface BankInfoType {
    bankpic: string;
    bankname: string;
    bankcode: string;
    benjin: string;
    tianshu: string;
    bankuser: string;
    riqi: string;
    day_moneys: DayMoney[];
    moneys_diy: string[];
    uselevel: string;
    zid: string;
    jianjie: string;
    is_jd:string;//进度控制（要显示进度条），0无进度控制
  jd:string;//进度%，如1就是1%
}

import DaihuanRule from '@/components/DaihuanRule.vue';
import RuleTab from '@/components/RuleTab.vue';
const ruleList = ref<any[]>([
    {
        title: '新人体验专享',
        content: '新人首次注册账户平台赠送5000专享体验券,代还天数为1天,代还时间结束后利润自动返还账户,体验券由系统自动回收。',
        remark: '日利率为1%(5000×1%=50/天)',
        extra: '新人添加小助手可额外获得新手奖励12元 体验券收益及新手奖励均可提现'
    },
    {
        title: '普通专区',
        content: '起始代还金额为200 最高20000',
        remark: '代还天数为1天 日利率1% 每日可代还1次',
        extra: '(每日签到可额外获得6元)'
    },
    {
        title: 'VIP1专区',
        content: '起始代还金额为10000 最高为30000,',
        remark: '需分享1位普通会员 代还天数为3天 日利率1.2% 每日可代还1次',
        extra: '(每日签到可额外获得12元)'
    }
]);
const BankInfo = ref<BankInfoType>({} as BankInfoType);
const days = ref('');
const lixi = ref('');
const zid = ref('');
const url = ref('');
const px = ref('');

const getData = async () => {
    // const currentPx = uni.getStorageSync('px');
    // px.value = currentPx;
    const res: any = await getOrderInfo(px.value);
    BankInfo.value = res;
    days.value = res.day_moneys[0].days;
    lixi.value = res.day_moneys[0].lixi;
    if(res.moneys_diy?.length > 0){
        select_money.value = res.moneys_diy[0];
    }
    // days.value = '3';
    zid.value = res.zid;
};

const handleDaySelect = (item: DayMoney) => {
    days.value = item.days;
    lixi.value = item.lixi;
};
const select_money = ref('');
const moneySelect = (item: string) => {
    select_money.value = item;
};

const ok = async () => {
    if (!days.value) {
        uni.showToast({
            title: '请选择代还天数',
            icon: 'none'
        });
        return;
    }
    if (BankInfo.value.benjin == '0') {
        uni.showToast({
            title: '金额不能为0',
            icon: 'none'
        });
        return;
    }

    const token = uni.getStorageSync('token');
    const currentPx = uni.getStorageSync('px');
    const daysNumber = parseInt(days.value, 10);
    const res: any = await postOrder(px.value, daysNumber,px.value == '19' ?Number(select_money.value) : Number(BankInfo.value.benjin), Number(lixi.value), zid.value);

    if (res.result === 'true') {
        uni.showModal({
            title: '提示',
            content: '提交成功',
            showCancel: false,
            success: () => {
                uni.navigateTo({
                    url: '/pages/finish/index'
                });
            }
        });
    }
};
const getShouyi = () => {
    const shouyi = Number(select_money.value) * Number(lixi.value) * 0.01;
    return `${select_money.value} * ${lixi.value}% = ${shouyi.toFixed(2)}`;
};
onLoad((options: any) => {
    px.value = options.px;
    uni.setNavigationBarTitle({
        title: options.title
    });
    // uni.setStorageSync('px', px.value);
    getData();
    getAck().then((res: any) => {
        ruleList.value = res.data;
    });
});
</script>

<template>
    <view class="creditcard_warp">
        <view class="user-card">
            <!-- 账户余额区域 -->
            <view class="creditbg-warp">
                <image class="creditbg" src="@/static/img2/creditbg.png" mode="widthFix" />
            </view>
            <view class="balance-section">
                <view class="balance-content">
                    <view class="balance-title flex items-center">
                        <text>{{ BankInfo.bankname }}</text>
                        <image class="w-100rpx ml-20rpx" src="@/static/img/zjbz.png" mode="widthFix" />
                    </view>
                    <view class="flex justify-between mb-40rpx">
                        <view>
                            <view class="balance">
                                <text class="amount">{{ BankInfo.bankcode }}</text>
                            </view>
                            <view class="balance-title flex items-center">
                                <text>持卡人：{{ BankInfo.bankuser }}</text>
                            </view>
                        </view>
                        <view class="rightdiv">
                            <view class="balance align-right">
                                <text class="amount">{{ BankInfo.benjin }}</text>
                            </view>
                            <view class="balance-title text-right">账户金额</view>
                        </view>
                    </view>
                    <!-- 分割线 -->
                     <template v-if="px!='19'">

                         <view class="line"></view>
                         <view class="stats-row">
                             <view class="stat-item leftdiv">
                                 <text class="label">还款时间</text>
                                 <text class="value">{{ BankInfo.riqi }}</text>
                             </view>
                             <view class="stat-item rightdiv">
                                 <text class="label">还款日</text>
                                 <text class="value">{{ BankInfo.tianshu }}</text>
                             </view>
                         </view>
                     </template>
                </view>
            </view>
        </view>

        <view class="return_warp">
            <template v-if="BankInfo.moneys_diy?.length > 0">
                <text class="title">代还金额</text>
                <view class="days-selection">
                    <view class="days-row">
                    <template v-for="(item, index) in BankInfo.moneys_diy || []" :key="index">
                        <view :class="{ active: select_money === item }" @tap="moneySelect(item)" class="day-item2"> {{ item }} </view>
                    </template>
                    </view>
                </view>

            </template>
            <text class="title">代还天数</text>
            <view class="days-selection">
                <view class="days-row2">
                    <template v-for="(item, index) in BankInfo.day_moneys || []" :key="item.days">
                        <view v-if="item.days !== '0' && item.days !== ''" :class="{ active: days === item.days }" @tap="handleDaySelect(item)" class="day-item"> {{ item.days }}天 </view>
                    </template>
                </view>
            </view>
            <view v-if="BankInfo.moneys_diy?.length > 0" class="mb-20rpx">预计收益：{{ getShouyi() }}元</view>
            <div class="jianjie" v-html="BankInfo.jianjie" v-if="px=='19'"></div>
            <!-- <view class="mei pb-120rpx" v-else>
                <view class="bg-black" style="border-radius: 20rpx">
                    <DaihuanRule :ruleList="ruleList" />
                </view>
            </view> -->
            <RuleTab :list="ruleList" />
        </view>

        

        
    </view>
    <!-- 进度条 -->
    <view v-if="BankInfo.is_jd && BankInfo.is_jd !== '0'" class="progress-container">
            <view class="progress-bar">
                <view class="progress-fill" :style="{ width: BankInfo.jd + '%' }"></view>
            </view>
            <text class="progress-text">{{ BankInfo.jd }}%</text>
        </view>
    <view class="lpod goldbtn" @tap="ok">
            <text>代还</text>
        </view>
</template>

<style lang="scss" scoped>
.creditcard_warp {
    width: 100%;
    background: linear-gradient(to bottom, #000000, #f4be43);
    // padding-bottom: 180rpx;
}

.header {
    padding: 20rpx;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
}

.customer_bg {
    width: 100%;
}

.creditcard {
    padding: 20rpx;
    background-color: #fff;
}

.credi {
    display: flex;
    align-items: center;
}

.credi image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
}

.tcard {
    display: flex;
    flex-direction: column;
}

.dai_warp,
.huan_warp {
    margin-top: 20rpx;
}

.dai {
    display: flex;
    justify-content: space-between;
    margin-top: 10rpx;
}

.return_warp {
    padding: 20rpx;
    background-color: #fff;
    margin-top: 20rpx;
    padding-bottom: 0rpx;

    .title {
        font-size: 28rpx;
        font-weight: bold;
        text-align: center;
        display: block;
    }
    .days-selection {
        margin-top: 20rpx;
        width: 100%;
    }
    .jianjie {
       background-color: #d3d4d558;
       padding: 20rpx;
       border-radius: 20rpx;
       margin-top: 20rpx;
       width: 100%;
    }
    .days-row {
        display: flex;
        // justify-content: space-around;
        margin-bottom: 20rpx;
        gap: 20rpx;
        flex-wrap: wrap;
    }
    .days-row2 {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20rpx;
        gap: 20rpx;
        flex-wrap: wrap;
    }
    .day-item {
        background: linear-gradient(135deg, #1b0f08, #2d1b13);
        color: #f4be43;
        padding: 16rpx 32rpx;
        border-radius: 25rpx;
        font-size: 28rpx;
        font-weight: 600;
        width: 220rpx;

        min-width: 120rpx;
        text-align: center;
        border: 2rpx solid transparent;
        box-shadow: 0 4rpx 12rpx rgba(27, 15, 8, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(244, 190, 67, 0.2), transparent);
            transition: left 0.5s ease;
        }

        &:active {
            transform: translateY(2rpx);
            box-shadow: 0 2rpx 8rpx rgba(27, 15, 8, 0.4);
        }

        &:active::before {
            left: 100%;
        }
        &.active {
            background: linear-gradient(135deg, #f4be43, #d4a574);
            color: #1b0f08;
            border: 2rpx solid #1b0f08;
            box-shadow: 0 6rpx 20rpx rgba(244, 190, 67, 0.4), 0 0 0 4rpx rgba(27, 15, 8, 0.2);
            transform: scale(1.05);
        }
    }
    .day-item2 {
        background: linear-gradient(135deg, #1b0f08, #2d1b13);
        color: #f4be43;
        padding: 16rpx 32rpx;
        width: 220rpx;
        border-radius: 25rpx;
        font-size: 28rpx;
        font-weight: 600;
        min-width: 120rpx;
        text-align: center;
        border: 2rpx solid transparent;
        box-shadow: 0 4rpx 12rpx rgba(27, 15, 8, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(244, 190, 67, 0.2), transparent);
            transition: left 0.5s ease;
        }

        &:active {
            transform: translateY(2rpx);
            box-shadow: 0 2rpx 8rpx rgba(27, 15, 8, 0.4);
        }

        &:active::before {
            left: 100%;
        }
        &.active {
            background: linear-gradient(135deg, #f4be43, #d4a574);
            color: #1b0f08;
            border: 2rpx solid #1b0f08;
            box-shadow: 0 6rpx 20rpx rgba(244, 190, 67, 0.4), 0 0 0 4rpx rgba(27, 15, 8, 0.2);
            transform: scale(1.05);
        }
    }
}

.retu {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
}

.retu view {
    padding: 10rpx 20rpx;
    border: 1px solid #ddd;
    border-radius: 8rpx;
}

.retu view.active {
    background-color: #007aff;
    color: #fff;
}

.progress-container {
    margin: 20rpx;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    gap: 20rpx;
    background-color: #fff;
    padding: 24rpx;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
    border: 2rpx solid #e5e5e5;

    .progress-bar {
        flex: 1;
        height: 20rpx;
        background-color: #f0f0f0;
        border-radius: 10rpx;
        overflow: hidden;
        box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
        position: relative;

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #335ef8 0%, #2a62a5 50%, #1e4fd4 100%);
            border-radius: 10rpx;
            transition: width 0.5s ease;
            box-shadow: 0 2rpx 8rpx rgba(51, 94, 248, 0.4);
            position: relative;
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                animation: shimmer 2s infinite;
            }
        }
    }

    .progress-text {
        font-size: 32rpx;
        color: #335ef8;
        font-weight: 700;
        min-width: 80rpx;
        text-align: right;
        text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
    }
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.lpod {
    
    background-color: #007aff;
    color: #fff;
    text-align: center;
    padding: 20rpx;
    width: 96%;
    margin: 20rpx auto;
    border-radius: 8rpx;
    // z-index: 10000;
}
.user-card {
    // background: linear-gradient(to bottom, #2b7fff, #1e6df7);
    // padding: 40rpx 30rpx;
    color: #fff;
    padding: 30rpx 20rpx 0 20rpx;
    .creditbg-warp {
        padding: 20rpx;
        width: 100%;
        height: 100%;
    }
    .user-info {
        display: flex;
        align-items: center;

        padding: 50rpx 20rpx 0 20rpx;
        margin-left: 40rpx;
        .avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
            margin-right: 20rpx;
        }

        .user-detail {
            color: #000;
            .nickname {
                font-size: 32rpx;
                margin-bottom: 10rpx;
                font-weight: bold;
            }

            .phone {
                font-size: 28rpx;
                opacity: 0.9;

                .vip-tag {
                    background: #ffd700;
                    color: #333;
                    padding: 4rpx 12rpx;
                    border-radius: 20rpx;
                    font-size: 24rpx;
                    margin-left: 10rpx;
                }
            }
        }
    }

    .balance-section {
        border-radius: 20rpx;
        border: 1px solid #5b3601;
        background: linear-gradient(to bottom, #1b0f08, #675940);
        position: relative;
        padding: 30rpx;
        width: 94%;
        margin: 0 auto;
        .balance-content {
            position: relative;
            z-index: 2;
        }
        .balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;

            .amount {
                font-size: 35rpx;
                font-weight: bold;
            }
            &.align-right {
                justify-content: flex-end;
                text-align: right;
            }

            .action-buttons {
                display: flex;
                gap: 20rpx;

                .action-btn {
                    min-width: 160rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    border-radius: 35rpx;
                    font-size: 28rpx;
                    padding: 0 40rpx;
                    border: none;

                    &.recharge {
                        background: #1f359a;
                        color: #fff;
                        border: 2rpx solid #fff;
                    }

                    &.withdraw {
                        background: #fff;
                        color: #2b5cff;
                    }

                    &::after {
                        border: none;
                    }
                }
            }
        }
        .line {
            width: 100%;
            height: 1px;
            background-color: #8e7654ae;
            margin: 20rpx 0;
        }
        .stats-row {
            display: flex;
            justify-content: space-between;
            padding: 0;
            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                &.rightdiv {
                    align-items: flex-end;
                    text-align: right;
                }

                .label {
                    font-size: 24rpx;
                    margin-bottom: 10rpx;
                }

                .value {
                    font-size: 28rpx;
                }
            }
        }
    }
}

// moved into .return_warp as nested rules
</style>
