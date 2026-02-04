<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getZhanche, getXindaiTitle, postOrder2 } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
interface LoanItem {
    zid: string;
    pic: string;
    title: string;
    yumoneys: string;
    jianjie: string;
    qishu: string;
    sqishu: string;
    danqi: string;
    lixi: string;
    days: string;//投资天数
    cfg:CfgItem[]
    
}
interface CfgItem {
    m: string;//金额
    f: string;//利率
}
const is_yuyue=ref<string>(''); //用户是否可投资。0不可投资，1可投资

const userStore = useUserStore();
const xindai = ref<LoanItem[]>([]);
const type = ref('normal');
const titles = ref<any[]>([]);
const lx = ref('');
const days = ref('');
const lixi = ref('');
const info = ref<LoanItem>({} as LoanItem);
const touzi_con = ref(false);
const num = ref('');
const selectedAmount = ref<CfgItem>({} as CfgItem); // 选中的投资金额
const prefixUrl = userStore.prefixUrl;
const px = ref('');

onLoad((options: any) => {
    px.value = options.px;
    getData();
});

const getTitle = async () => {
    const res: any = await getXindaiTitle(px.value);
    titles.value = res.data;
    lx.value = res.data[0].lei;
    getData();
};

const getData = async () => {
    const res: any = await getZhanche(px.value);
    xindai.value = res.loan;
    is_yuyue.value = res.is_yuyue;
    
};

const order = (item: LoanItem) => {
    info.value = item;
    touzi_con.value = true;
};

// 联系客服预约
const contactService = () => {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
};

const close = () => {
    touzi_con.value = false;
    days.value = '';
    num.value = '';
    selectedAmount.value = {} as CfgItem;
};

// 选择投资金额
const selectAmount = (amount: CfgItem) => {
    selectedAmount.value = amount;
};

// 获取总收益
const getTotalProfit = () => {
    if (selectedAmount.value && days.value && info.value.lixi) {
        const amount = Number(selectedAmount.value);
        const dayCount = Number(days.value);
        const interest = parseFloat(info.value.lixi);
        return (amount * dayCount * interest / 100).toFixed(2);
    }
    return '0';
};

// 获取收益计算公式文本
const getProfitFormula = () => {
    if (selectedAmount.value && days.value && info.value.lixi) {
        const profit = getTotalProfit();
        return `${selectedAmount.value}*${days.value}天*${info.value.lixi}%=${profit}`;
    }
    return '';
};

const ok = async () => {
    if (!selectedAmount.value.m) {
        uni.showToast({
            title: '请选择投资金额',
            icon: 'none'
        });
        return;
    }

    const lixiNumber = parseFloat(selectedAmount.value.f);
    const amount = Number(selectedAmount.value.m);
    const res: any = await postOrder2(info.value.zid, amount, lixiNumber);

    uni.showToast({
        title: '提交成功',
        icon: 'success'
    });
    touzi_con.value = false;
    days.value = '';
    selectedAmount.value = {} as CfgItem;
    num.value = '';
    getData();
};
</script>

<template>
    <view class="carloan_warp">

        <view v-for="(item, index) in xindai" :key="index">
            <view class="carloan">
                <image :src="prefixUrl + item.pic" mode="aspectFit"></image>
                <view class="ce">
                    <text class="title">{{ item.title }}</text>
                    <view class="loan-info">
                        <view v-if="is_yuyue === '1'" class="invest-btn" @tap="order(item)">立即投资</view>
                        <view v-else class="invest-btn" @tap="contactService">联系客服预约</view>
                    </view>
                </view>
            </view>
            <view class="xx">
                <view>{{ item.jianjie }}</view>
            </view>
        </view>

        <view v-if="touzi_con" class="modal_wrap" @tap.stop="close">
            <view class="modal_con" @tap.stop>
                <!-- 投资期限 -->
                <view class="info-row">
                    <text class="info-label">投资期限</text>
                    <text class="info-value">{{ info.days || '请选择' }}天</text>
                </view>
                
                <!-- 投资金额 -->
                <view class="info-row">
                    <text class="info-label">投资金额</text>
                    <view class="amount-buttons">
                        <view 
                            v-for="(cfg, index) in info.cfg || []" 
                            :key="index"
                            class="amount-btn"
                            :class="{ active: selectedAmount.m === cfg.m }"
                            @tap="selectAmount(cfg)"
                        >
                            {{ cfg.m }}
                        </view>
                    </view>
                </view>
                
                <!-- 日利息 -->
                <view class="info-row">
                    <text class="info-label">日利息</text>
                    <text class="info-value">{{ selectedAmount.f || '0' }}%</text>
                </view>
                
                <!-- 总收益 -->
                <view class="info-row">
                    <text class="info-label">总收益</text>
                    <text class="info-value profit-value">{{ Number(selectedAmount.m) * Number(selectedAmount.f) * Number(info.days) / 100 || '0' }}</text>
                </view>
                
                <!-- 选择投资天数 -->
                
                
                <!-- 底部按钮 -->
                <view class="modal-buttons">
                    <view class="cancel-btn" @tap.stop="close">取消</view>
                    <view 
                        v-if="is_yuyue === '1'" 
                        class="confirm-btn" 
                        @tap.stop="ok"
                    >
                        确认投资
                    </view>
                    <view 
                        v-else 
                        class="confirm-btn" 
                        @tap.stop="contactService"
                    >
                        联系客服预约
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.carloan_warp {
    width: 100%;
    background-color: #f8f8f8;
}

.header {
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    font-size: 36rpx;
    background-color: #fff;
    position: relative;
    border-bottom: 2rpx solid #f1f1f1;
}

.carloan {
    padding: 30rpx 20rpx;
    display: flex;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);

    image {
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;
        border-radius: 12rpx;
        overflow: hidden;
        flex-shrink: 0;
    }

    .ce {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        min-width: 0;
        align-items: center;
        .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }

        .loan-info {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .invest-btn {
                background-color: #335ef8;
                color: #fff;
                padding: 16rpx 40rpx;
                border-radius: 40rpx;
                font-size: 28rpx;
                font-weight: 500;
                transition: all 0.3s ease;
                box-shadow: 0 4rpx 12rpx rgba(51, 94, 248, 0.3);
                
                &:active {
                    opacity: 0.8;
                    transform: scale(0.98);
                }
            }
        }
    }
}

.xx {
    padding: 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
}

.modal_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal_con {
    width: 80%;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 40rpx;

    .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
        

        .info-label {
            font-size: 28rpx;
            color: #333;
        }

        .info-value {
            font-size: 28rpx;
            color: #333;
            
            &.profit-value {
                color: #333;
                font-size: 26rpx;
            }
        }

        .amount-buttons {
            display: flex;
            gap: 15rpx;
            flex: 1;
            justify-content: flex-end;
            flex-wrap: wrap;
            .amount-btn {
                padding: 12rpx 12rpx;
                border-radius: 8rpx;
                font-size: 28rpx;
                background-color: #f5f5f5;
                color: #333;
                transition: all 0.3s ease;
                min-width: 100rpx;
                text-align: center;

                &.active {
                    background-color: #335ef8;
                    color: #fff;
                }
            }
        }
    }

    .choose_day {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40rpx;
        gap: 15rpx;

        view {
            flex: 1;
            min-width: 25%;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            font-size: 28rpx;
            border-radius: 8rpx;
            background-color: #f5f5f5;

            &.active {
                background-color: #335ef8;
                color: #fff;
                font-weight: bold;
            }
        }
    }

    .modal-buttons {
        display: flex;
        gap: 20rpx;
        margin-top: 40rpx;

        .cancel-btn {
            flex: 1;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background-color: #fff;
            color: #333;
            border: 1rpx solid #e5e5e5;
            border-radius: 8rpx;
            font-size: 32rpx;
        }

        .confirm-btn {
            flex: 1;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            background-color: #335ef8;
            color: #fff;
            border-radius: 8rpx;
            font-size: 32rpx;
        }
    }
}

.clearfix:after {
    content: '';
    display: block;
    clear: both;
}
</style>
