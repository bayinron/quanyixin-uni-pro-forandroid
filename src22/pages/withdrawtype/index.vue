<template>
    <div class="recharge_type_wrap">
        <div class="recharge_type" @click="goWithdraw">
            <image mode="widthFix" src="@/static/img/bank.png" alt="" />
            <div>
                <p>银行卡提现</p>
            </div>
        </div>
        <div class="recharge_type" @click="goUsdtWithdraw">
            <image mode="widthFix" src="@/static/img/usdt.png" alt="" />
            <div>
                <p>USDT提现</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import globalTool from '@/utils/globalTool';
import { gettrc20address } from '../../api/getdata';
function goWithdraw() {
    uni.navigateTo({
        url: '/pages/withdraw/index'
    });
}

function goUsdtWithdraw() {
    gettrc20address().then((data: any) => {
        if (data.usdt_trc20_address != '') {
            uni.navigateTo({
                url: '/pages/usdtwithdraw/index'
            });
        } else {
            globalTool.showModal('请先绑定USDT地址', () => {
                uni.navigateTo({
                    url: '/pages/usdt/address?type=usdt'
                });
            });
        }
    });
}
</script>

<style lang="scss" scoped>
.recharge_type_wrap {
    height: 100%;
    padding-top: 0rpx;

    .recharge_type {
        background: #fff;
        padding: 40rpx 20rpx;
        margin-bottom: 1px;
        border-bottom: 1rpx solid #b1aaaa;
        display: flex;
        image {
            width: 100rpx;
            height: 90rpx;
            flex-shrink: 0;
        }

        div {
            margin-left: 20rpx;

            p {
                color: #000;
                font-size: 28rpx;
                margin-top: 20rpx;
            }

            span {
                color: #939ba4;
            }
        }
    }
}
</style>
