<script lang="ts" setup>
import { ref } from 'vue';
import { withdrawalsusdt, getbankinfo, gettrc20address } from '@/api/index';

const usdt = ref('');
const bankcode = ref('');
const bankuser = ref('');
const bankadd = ref('');
const bankid = ref('');
const money = ref('');
const usepwd = ref('');
const tday = ref(1);
const lx = ref('1');
const isLoading = ref(false);
const pay_pwd = ref('');

const types = [
    { text: 'USDT(TRC20)', value: '1' },
    { text: 'USDT(ERC20)', value: '2' }
];


// function changeLx(value: any) {
//     lx.value = value.key;
// }
const disabled = ref(false);


function GetBank() {
    getbankinfo().then((data: any) => {
        bankcode.value = data.bankcode;
        bankuser.value = data.bankuser;
        if (bankcode.value) {
            disabled.value = true;
        }
    });
}

function ok() {
    if (money.value == '') {
        uni.showToast({ title: '请输入提现金额' });
        return;
    }
    if (usdt.value == '') {
        uni.showToast({ title: '请输入usdt地址' });
        return;
    }
    if (usepwd.value == '') {
        uni.showToast({ title: '请输入提现密码' });
        return;
    }

    if (isLoading.value) return;

    isLoading.value = true;
    withdrawalsusdt(lx.value, usdt.value, Number(money.value), usepwd.value, tday.value.toString())
        .then((data: any) => {
            isLoading.value = false;
            uni.showToast({ title: '提交成功' });
        })
        .finally(() => {
            isLoading.value = false;
        });
}

function toCustomer() {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
}

onShow(() => {
    // 使用 uni 存储，兼容 App
    pay_pwd.value = uni.getStorageSync('pay_pwd') || '';
    // gettrc20address().then((data: any) => {
    //     usdt.value = data.usdt_trc20_address;
    // });
    gettrc20address().then((data: any) => {
        if (data.usdt_trc20_address != '') {
            usdt.value = data.usdt_trc20_address;
        }
    });
});
</script>

<template>
    <div class="usdt-withdraw">
        <div class="withdraw_warp1">
            <div class="withdraw_header">
                <div class="title_section">
                    <h1>USDT一键提现</h1>
                    <div class="withdraw_banner">
                        <span>USDT</span>
                    </div>
                </div>
                <div class="illustration_section">
                    <img src="@/static/img2/txicon.png" alt="" />
                </div>
            </div>
            
            <view class="content">
                <div class="shu">
                    <!-- <div class="choose_money">
                        <div v-for="amount in ['100', '500', '1000', '2000', '5000', '10000', '20000', '50000', '100000']" :key="amount" :class="{ active: money === amount }" @click="money = amount">
                            {{ amount }}u
                        </div>
                    </div> -->
                    <view class="input_warp">
                        <input type="number" v-model="money" placeholder="请输入提现金额" />
                    </view>
                </div>

                <div class="withdraw_warp3">
                    <span class="bank-info-title">USDT信息</span>

                    <div class="neir_warp">
                        <div class="ne">
                            <p>USDT地址</p>
                        </div>
                        <div class="ne">
                            <input type="text" v-model="usdt" placeholder="请输入USDT地址" disabled />
                        </div>
                    </div>

                    <div class="neir_warp">
                        <div class="ne">
                            <p>提现网络</p>
                        </div>
                        <div class="ne">
                            <uni-data-select class="select_input" v-model="lx" :localdata="types" disabled></uni-data-select>
                        </div>
                    </div>  

                    <div class="mima">
                        <p style="border: 0">
                            <img src="@/static/img/suo.png" alt="" />
                            <input type="password" v-model="usepwd" placeholder="请输入支付密码" />
                            <a :href="'#/pages/topay/index?pay_pwd=' + pay_pwd">忘记密码?</a>
                        </p>
                    </div>

                    <div class="ke">
                        

                        <div class="zf">
                            <p class="goldbtn" @click="ok">{{ isLoading ? '正在提交...' : '确认' }}</p>
                        </div>
                    </div>
                    <div class="color-red text-34rpx">注：提现时间为周一至周五9：00-23：00</div>

                    <div class="color-red text-30rpx text-center">提现免手续费 T+3不定时到账</div>
                </div>
            </view>
        </div>
        <customer-service />
    </div>
</template>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.usdt-withdraw {
    background-color: #000;
    min-height: 100vh;
    width: 100%;
    position: relative;
    padding-bottom: 40rpx;
    padding-top: 0;
    margin-top: 0;
    
    /* 确保子元素也不会产生白色空隙 */
    * {
        box-sizing: border-box;
    }

    .withdraw_warp1 {
        position: relative;
        
        .content {
            border-radius: 20rpx;
            padding: 20rpx 0;
            border: 1rpx solid #ffffff;
            width: 95%;
            margin: 0 auto;
        }
        
        .withdraw_header {
            width: 90%;
            margin: 30rpx auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 20rpx;
            box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

            .title_section {
                flex: 1;
                margin-right: 30rpx;

                h1 {
                    font-size: 40rpx;
                    color: #ffffff;
                    font-weight: 700;
                    margin-bottom: 20rpx;
                    line-height: 1.2;
                }

                .withdraw_banner {
                    background: linear-gradient(to right, #f9dfb7, #ffc676);
                    color: #855100;
                    font-size: 28rpx;
                    padding: 15rpx 25rpx;
                    border-radius: 15rpx;
                    display: inline-block;
                    font-weight: 600;
                    border: 2rpx dashed #855100;
                    position: relative;
                    
                    &::before {
                        content: '';
                        position: absolute;
                        top: -2rpx;
                        left: -2rpx;
                        right: -2rpx;
                        bottom: -2rpx;
                        background: linear-gradient(to right, #f9dfb7, #ffc676);
                        border-radius: 15rpx;
                        z-index: -1;
                    }
                }
            }

            .illustration_section {
                width: 180rpx;
                height: 180rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
        .input_warp {
            width: 90%;
            height: 80rpx;
            margin: 20rpx auto 0;
            input {
                width: 100%;
                height: 100%;
                border: 1rpx solid #ffffff;
                border-radius: 10rpx;
                padding-left: 20rpx;
                color: #ffffff;
            }
        }
        .shu {
            margin-top: 20rpx;

            .choose_money {
                width: 95%;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                gap: 10rpx;
                justify-content: space-between;
                
                div {
                    width: 200rpx;
                    background: #fff;
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    text-align: center;
                    border-radius: 12rpx;
                    margin-bottom: 20rpx;
                    box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);
                    transition: all 0.3s ease;

                    &.active {
                        background: #ae8c54;
                        color: #fff;
                        font-weight: 700;
                        box-shadow: 0 4rpx 15rpx rgba(51, 94, 248, 0.3);
                    }
                }
            }
        }

        .withdraw_warp3 {
            width: 90%;
            margin: 20rpx auto 0;

            .bank-info-title {
                display: block;
                margin: 30rpx 0;
                font-size: 32rpx;
                color: #fff;
                font-weight: 600;
            }

            .neir_warp {
                background-color: #f9f1e5;
                display: flex;
                padding: 20rpx;
                border-radius: 16rpx;
                margin-bottom: 20rpx;
                box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);
                :deep .uni-select__input-text {
                        width: 84%;
                        color: #333;
                    }

                .ne {
                    display: flex;
                    align-items: center;
                    .select_input {
                        width: 400rpx;
                    }
                    p {
                        font-size: 32rpx;
                        color: #333;
                        font-weight: 600;
                        padding-left: 20rpx;
                        width: 180rpx;
                    }

                    input {
                        width: 450rpx;
                        line-height: 100rpx;
                        height: 100rpx;
                        padding-left: 0rpx;
                        border: none;
                        background: none;
                        font-size: 30rpx;
                    }
                    
                    :deep .uni-select__input-text {
                        width: 84%;
                        color: #333;
                    }

                    .uni-data-select {
                        width: 500rpx;
                    }
                }
            }

            .mima {
                background-color: #f9f1e5;
                padding: 20rpx;
                margin-top: 40rpx;
                border-radius: 16rpx;
                box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                p {
                    display: flex;
                    align-items: center;
                    padding: 20rpx;

                    img {
                        width: 40rpx;
                        height: 40rpx;
                        margin-right: 20rpx;
                    }

                    input {
                        flex: 1;
                        border: none;
                        background: none;
                        font-size: 30rpx;
                    }

                    a {
                        color: #5b3601;
                        font-size: 28rpx;
                    }
                }
            }

            .ke {
                width: 100%;
                margin: auto;
                padding-bottom: 40rpx;

                p {
                    font-size: 32rpx;
                    color: #fff;
                    font-weight: 600;
                }

                .choose_type {
                    display: flex;
                    background-color: #f5efe2;
                    padding: 0rpx;
                    border-radius: 16rpx;
                    box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                    div {
                        flex: 1;
                        margin: 20rpx;
                        line-height: 70rpx;
                        height: 70rpx;
                        border-radius: 10rpx;
                        text-align: center;
                        transition: all 0.3s ease;
                        border: 1px solid #f5efe2;

                        &.active {
                            border: 1px solid #335ef8;
                            color: #335ef8;
                            background-color: rgba(51, 94, 248, 0.05);
                            font-weight: 500;
                        }

                        span {
                            font-size: 28rpx;
                        }
                    }
                }

                .withdraw_warp4 {
                    margin-top: 30rpx;
                    padding: 20rpx 10rpx;
                    position: relative;

                    p {
                        font-size: 28rpx;
                        color: #fff;
                        margin-bottom: 10rpx;
                    }

                    span {
                        font-size: 26rpx;
                        color: #fff;
                        display: block;
                        margin-top: 10rpx;
                    }
                }

                .zf {
                    width: 100%;
                    margin: 60rpx auto;

                    p {
                        width: 100%;
                        height: 96rpx;
                        line-height: 96rpx;
                        text-align: center;
                        font-weight: 700;
                        font-size: 32rpx;
                        border-radius: 48rpx;
                    }
                }
            }
        }
    }
}

.clearfix::after {
    content: '';
    display: table;
    clear: both;
}
</style>
