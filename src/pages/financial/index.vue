<template>
    <view class="mall-container">
        <!-- 顶部资产卡片 -->
        <view class="points-card">
            <view class="points-value">
                <view class="header-row">
                    <text class="points-label">总资产余额</text>
                    <view class="security-badge">
                        <text class="security-icon">✓</text>
                        <text class="security-text">安全保障</text>
                    </view>
                </view>
                <text class="points-num">¥{{ info.zongzichan }}</text>
            </view>
        </view>

        <!-- 账户信息区域 -->
        <view class="account-section">
            <view class="account-stats">
                <view class="stat-item">
                    <text class="stat-label">总收益</text>
                    <text class="stat-value">¥{{ info.licai_income_total }}</text>
                </view>
                <view class="stat-item">
                    <text class="stat-label">余额宝</text>
                    <text class="stat-value">¥{{ info.yue }}</text>
                </view>
                <view class="stat-item">
                    <text class="stat-label">昨日收益</text>
                    <text class="stat-value">¥{{ info.licai_income_today }}</text>
                </view>
            </view>

            <view class="withdraw-deposit">
                <view class="withdraw-prompt">
                    <text class="prompt-text">提现金额</text>
                </view>
                <view class="input-row">
                    <input type="text" v-model="enterMoney" placeholder="请输入提现金额" class="amount-input" />
                    <text class="withdraw-all" @tap="withdrawAll">全部提现</text>
                </view>
                <view class="action-buttons">
                    <view class="action-btn withdraw-btn" @tap="handleWithdraw">取出</view>
                    <view class="action-btn deposit-btn" @tap="handleDeposit">存入</view>
                </view>
            </view>
        </view>

        <!-- 余额宝产品列表 -->
        <view class="section-title">
            <text>全意宝产品</text>
        </view>

        <view class="balance-products">
            <view class="product-item" v-for="(item, index) in datalists" :key="index" @tap="showDepositPopup(item)">
                <view class="product-header">
                    <view class="product-tab">全意宝</view>
                </view>
                <view class="product-content">
                    <view class="yield-section">
                        <text class="yield-rate">{{ item.shouyi }}%</text>
                        <text class="yield-desc">近7日预计收益</text>
                    </view>
                    <view class="action-section">
                        <text class="product-duration">理财天数{{ item.days }}天 | {{ item.moneys }}元起存</text>
                        <view class="deposit-now-btn">立即存入</view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 存入弹窗 -->
        <uni-popup ref="depositPopup" type="center" background-color="#fff" :mask-click="true">
            <view class="deposit-popup">
                <view class="popup-title">存入金额（元）</view>
                <view class="popup-input">
                    <input type="digit" v-model="depositAmount" placeholder="请输入存入金额" class="amount-input" />
                </view>
                <view class="confirm-btn goldbtn" @tap="confirmDeposit">确认存入</view>
            </view>
        </uni-popup>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getposition, getGreat, postGreat, intobalance, outbalance } from '@/api/index';

interface ProductItem {
    bianhao: string;
    lname: string;
    days: string;
    moneys: string;
    shouyi: string;
}

interface FinancialInfo {
    licai_income_today: number;
    licai_income_total: number;
    licai_money_pendding: number;
    yue: number;
    zongshouyi: number;
    zongzichan: number;
    zuoshouyi: number;
}

interface GreatResponse {
    licai: ProductItem[];
}

const depositPopup = ref();
const depositAmount = ref('');
const enterMoney = ref('');
const datalists = ref<ProductItem[]>([]);
const info = ref<FinancialInfo>({
    licai_income_today: 0,
    licai_income_total: 0,
    licai_money_pendding: 0,
    yue: 0,
    zongshouyi: 0,
    zongzichan: 0,
    zuoshouyi: 0
});

const currentProduct = ref<ProductItem | null>(null);

const showDepositPopup = (item: ProductItem) => {
    currentProduct.value = item;
    depositPopup.value.open();
};

const withdrawAll = () => {
    enterMoney.value = info.value.yue.toString();
};

const handleWithdraw = async () => {
    if (!enterMoney.value) return;
    const res = await outbalance(Number(enterMoney.value));
    enterMoney.value = '';
    getData();
};

const handleDeposit = async () => {
    if (!enterMoney.value) return;
    const res = await intobalance(Number(enterMoney.value));
    enterMoney.value = '';
    getData();
};

const confirmDeposit = async () => {
    if (!depositAmount.value || !currentProduct.value) return;
    if (Number(depositAmount.value) < Number(currentProduct.value.moneys)) return;

    const res = await postGreat(currentProduct.value.bianhao, Number(depositAmount.value));
    depositPopup.value.close();
    depositAmount.value = '';
    getData();
};

const getData = async () => {
    const res: any = await getposition();
    info.value = res;

    const res2: any = await getGreat();
    datalists.value = res2?.licai || [];
};

onShow(() => {
    getData();
});
</script>

<style lang="scss" scoped>
page {
    background-color: #f5f5f5;
}

.mall-container {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 40rpx;
    :deep(.uni-popup__wrapper) {
        border-radius: 20rpx;
    }
}

.points-card {
    position: relative;
    height: 380rpx;
    background: #f5f5f5;
    padding: 30rpx;
    overflow: hidden;

    .points-value {
        position: relative;
        z-index: 2;
        margin-top: 100rpx;
        padding: 40rpx;
        width: 100%;
        margin: 0 auto;
        border-radius: 20rpx;
        background: linear-gradient(to bottom, #1b0f08 24%, #675940 99%);
        border: 1px solid #8b4513;

        .header-row {
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
        }

        .points-label {
            font-size: 32rpx;
            color: #fff;
            font-weight: 600;
            margin-right: 20rpx;
        }

        .security-badge {
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 50rpx;
            padding: 8rpx 16rpx;
            border: 1px solid rgba(255, 255, 255, 0.3);

            .security-icon {
                font-size: 20rpx;
                color: #8b4513;
                margin-right: 8rpx;
                font-weight: bold;
            }

            .security-text {
                font-size: 22rpx;
                color: #8b4513;
                font-weight: 600;
            }
        }

        .points-num {
            font-size: 72rpx;
            color: #fff;
            font-weight: 800;
            display: block;
            margin-bottom: 10rpx;
        }
    }
}

// 账户信息区域样式
.account-section {
    background: #fff;
    margin: 0 20rpx;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-top: -20rpx;
    position: relative;
    z-index: 10;
    box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.08);
}

.account-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1px solid #f0f0f0;

    .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .stat-value {
            font-size: 36rpx;
            font-weight: 700;
            color: #B48A4A;
            margin-bottom: 10rpx;
        }

        .stat-label {
            font-size: 28rpx;
            color: #666;
            font-weight: 500;
        }
    }
}

.withdraw-deposit {
    padding: 0;
    background: transparent;
}

.withdraw-prompt {
    margin-bottom: 20rpx;
    font-size: 28rpx;
    color: #666;
    font-weight: 500;
}

.balance-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
}

.balance-label {
    color: #333;
    font-size: 28rpx;
}

.balance-amount {
    color: #ff9900;
    font-weight: bold;
    font-size: 32rpx;
    margin: 0 16rpx;
}

.withdraw-all {
    color: #ff4757;
    font-size: 26rpx;
    margin-left: auto;
    padding: 0 8rpx;
    cursor: pointer;
}

.input-row {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    .amount-input {
        flex: 1;
        border: 1rpx solid #e0e0e0;
        border-radius: 12rpx;
        background: #fafafa;
        box-sizing: border-box;
        height: 80rpx;
        padding: 0 20rpx;
        font-size: 30rpx;
        margin-right: 20rpx;
    }

    .withdraw-all {
        color: #ff4757;
        font-size: 26rpx;
        white-space: nowrap;
    }
}

.action-buttons {
    display: flex;
    gap: 20rpx;
}

.action-btn {
    flex: 1;
    text-align: center;
    padding: 24rpx 0;
    border-radius: 12rpx;
    font-size: 30rpx;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.withdraw-btn {
    background: #fff;
    color: #333;
    border: 2rpx solid #d4af37;

    &:active {
        background: #f8f8f8;
    }
}

.deposit-btn {
    background: linear-gradient(135deg, #714603 0%, #8E5600 100%);
    color: #fff;
    border: 2rpx solid #d4af37;

    &:active {
        background: linear-gradient(135deg, #b8860b 0%, #a0522d 100%);
    }
}

.section-title {
    font-size: 32rpx;
    color: #333;
    font-weight: 700;
    margin: 40rpx 30rpx 20rpx;
}

.balance-products {
    padding: 0 20rpx;

    .product-item {
        background-color: #fff;
        border-radius: 16rpx;
        padding: 0;
        margin-bottom: 20rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
        border: 1rpx solid #f0f0f0;
        position: relative;
        overflow: hidden;

        .product-header {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;

            .product-tab {
                background: linear-gradient(to bottom, #1b0f08 24%, #675940 99%);
                color: #fff;
                font-size: 28rpx;
                font-weight: 600;
                padding: 12rpx 40rpx;
                border-radius: 0 0 32rpx 0;
                white-space: nowrap;
            }
        }

        .product-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30rpx 24rpx;
            padding-top: 50rpx;

            .yield-section {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-top: 20rpx;
                .yield-rate {
                    font-size: 48rpx;
                    color: #855100;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 8rpx;
                }

                .yield-desc {
                    font-size: 24rpx;
                    color: #666;
                }
            }

            .action-section {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .product-duration {
                    font-size: 26rpx;
                    color: #666;
                    margin-bottom: 15rpx;
                    text-align: right;
                }

                .deposit-now-btn {
                    background: linear-gradient(135deg, #714603 0%, #8E5600 100%);
                    color: #fff;
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    padding: 0 30rpx;
                    border-radius: 35rpx;
                    white-space: nowrap;
                    font-weight: 600;
                    box-shadow: 0 4rpx 12rpx rgba(255, 215, 0, 0.3);
                    transition: all 0.3s ease;
                    
                    &:active {
                        transform: translateY(2rpx);
                        box-shadow: 0 2rpx 8rpx rgba(255, 215, 0, 0.3);
                    }
                }
            }
        }
    }
}

.deposit-popup {
    width: 600rpx;
    padding: 40rpx;
    border-radius: 20rpx;

    .popup-title {
        font-size: 32rpx;
        color: #333;
        font-weight: 600;
        text-align: left;
        margin-bottom: 40rpx;
    }

    .popup-input {
        margin-bottom: 40rpx;

        .amount-input {
            width: 100%;
            height: 80rpx;
            border: none;
            border-bottom: 1px solid #eee;
            font-size: 32rpx;
            padding: 0 20rpx;
        }
    }

    .confirm-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
        color: #fff;
        font-size: 32rpx;
        border: none;
        border-radius: 44rpx;
        text-align: center;
        font-weight: 600;
    }
}
</style>
