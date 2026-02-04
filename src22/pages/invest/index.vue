<template>
    <div class="invest">
        <div>投资</div>
        <image mode="widthFix" class="invest_bg" src="@/static/img/tzlc.png" alt="" />
        <div class="invest_wrap">
            <div class="invest_wrap1">
                <p>安稳理财 持有不操心</p>
                <span>长期投资收益更高</span>
            </div>
            <div class="invest_wrap2">
                <em>{{ query.lname }}</em>
                <input v-model="money" type="text" placeholder="请输入买入金额" />
                <div class="invest_wrap3">
                    <span>预计收益</span>
                    <i>{{ calculateProfit }}元</i>
                </div>
                <div class="invest_wrap3" style="margin-top: 30rpx">
                    <span>持仓时间</span>
                    <i>{{ query.days }}天</i>
                </div>
                <div class="invest_wrap4" @click="handleInvest">立即买入</div>
                <div class="invest_wrap6">
                    <i>重要事项：</i>
                    <span>
                        锁定期：您的资金将锁定{{ query.days }}天。在此期间，您无法进行赎回
                        <br />
                        自动赎回：产品到期后，系统将自动将本金和利息赎回，并将资金返还至您的个人账户
                    </span>
                </div>
            </div>
        </div>

        <div v-if="showSuccess" class="adv">
            <div class="adv_text">
                <image mode="widthFix" class="ggao" src="@/static/img/invest_tan.png" alt="" />
                <div class="buy_s">
                    <span>- 安稳理财 持有不操心 -</span>
                    <p>{{ successMsg }}</p>
                </div>
                <image mode="widthFix" class="close" src="@/static/imgs/close.png" @click="showSuccess = false" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { postGreat } from '../../api/getdata';

const money = ref('');
const showSuccess = ref(false);
const successMsg = ref('');
const query = ref<any>(); 
onLoad((options:any) => {
    query.value = options;
});
const calculateProfit = computed(() => {
    const profit = Number(money.value) * (Number(query.value.shouyi) * 0.01) * Number(query.value.days);
    return profit.toFixed(2);
});

function handleInvest() {
    if (Number(money.value) < Number(query.value.moneys)) {
        uni.showToast({
            title: '输入金额必须大于起投金额',
            icon: 'none'
        });
        return;
    }

    postGreat(query.value.id as string, money.value).then((data: any) => {
        showSuccess.value = true;
        successMsg.value = data.msg;
    });
}
</script>

<style lang="scss" scoped>
.invest {
    height: 100%;
    position: relative;

    .invest_bg {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .invest_wrap {
        position: relative;
        top: 260rpx;

        .invest_wrap1 {
            color: #fff;
            font-size: 60rpx;
            font-weight: 700;
            width: 90%;
            margin: auto;
        }

        .invest_wrap2 {
            width: 100%;
            margin: 40rpx auto 0;
            border-top-left-radius: 20rpx;
            border-top-right-radius: 20rpx;
            background: #fff;
            padding: 0 40rpx 100rpx;

            em {
                width: 30%;
                font-style: normal;
                color: #f2f6fe;
                font-size: 28rpx;
                background-color: rgba(22, 206, 229, 0.2);
                padding: 20rpx 60rpx;
                color: #16cee5;
                display: block;
                text-align: center;
                margin: 0 auto;
                border-bottom-left-radius: 30rpx;
                border-bottom-right-radius: 30rpx;
            }

            input {
                border-radius: 16rpx;
                background-color: #f3f9fe;
                color: #000;
                line-height: 90rpx;
                height: 90rpx;
                border: 1rpx solid #16cee5;
                font-size: 28rpx;
                padding-left: 20rpx;
                width: 100%;
                margin-bottom: 40rpx;
                margin-top: 70rpx;
            }

            .invest_wrap3 {
                display: flex;
                justify-content: space-between;
                margin: 0 30rpx 20rpx;

                span {
                    font-size: 28rpx;
                    color: #000;
                    font-weight: 600;
                }

                i {
                    font-size: 28rpx;
                    color: #000;
                    font-style: normal;
                    font-weight: 600;
                }
            }

            .invest_wrap4 {
                width: 90%;
                border-radius: 50rpx;
                background-color: #16cee5;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20rpx;
                text-align: center;
                font-size: 32rpx;
                color: #fff;
                line-height: 100rpx;
                height: 100rpx;
                margin: 120rpx auto 0;
            }

            .invest_wrap6 {
                position: relative;
                width: 90%;
                margin: 200rpx auto 0;
                background-color: hsla(0, 0%, 78%, 0.2);
                border-radius: 50rpx;
                padding: 40rpx;

                i {
                    font-style: normal;
                    color: #000;
                    font-size: 28rpx;
                    display: block;
                    padding-bottom: 20rpx;
                }

                span {
                    font-size: 28rpx;
                    color: #888;
                    display: block;
                    letter-spacing: 2rpx;
                }
            }
        }
    }

    .adv {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 600;

        .adv_image {
            width: 90%;
            position: absolute;
            top: 16%;
            left: 5%;
            z-index: 888;
        }

        .adv_text {
            color: #333;
            position: absolute;
            top: 30%;
            width: 100%;
            border-radius: 6px;
            font-size: 32rpx;

            .ggao {
                width: 86%;
                position: absolute;
                top: 0;
                left: 7%;
            }

            .buy_s {
                position: relative;
                display: block;
                text-align: center;
                padding-top: 360rpx;

                p {
                    font-size: 44rpx;
                    color: #000000;
                }

                span {
                    font-size: 32rpx;
                    color: #727272;
                    margin-top: 20rpx;
                }
            }

            .adv_content {
                height: 400rpx;
                width: 65%;
                margin: 320rpx auto 60rpx;
                overflow: scroll;
                position: relative;
                z-index: 999999;
                font-weight: bold;
                color: #000;
            }

            .close {
                display: block;
                width: 100rpx;
                position: relative;
                margin: 240rpx auto 0;
            }
        }
    }
}
</style>
