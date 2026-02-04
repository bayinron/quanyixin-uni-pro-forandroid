<script lang="ts" setup>
import { ref } from 'vue';
import { withdrawalsusdt, getbankinfo, gettrc20address, getTixianCfg } from '../../api/getdata';
import type { WithdrawConfig } from '@/api/types';

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
const amounts = ['200', '500', '1000', '2000', '5000', '10000', '50000', '100000', '200000'];
const withdrawTypes = [
    { value: 1, label: 'T+1提现到账' },
    { value: 3, label: 'T+3提现到账' },
    { value: 8, label: 'T+7提现到账' }
];
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
    withdrawalsusdt(lx.value, usdt.value, money.value, usepwd.value, tday.value.toString())
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
const withdrawConfig = ref<WithdrawConfig>({
    time: {
        kaitime: '',
        shoutime: ''
    },
    cfg: []
});
onMounted(() => {
    pay_pwd.value = localStorage.getItem('pay_pwd') || '';
    gettrc20address().then((data: any) => {
        usdt.value = data.usdt_trc20_address;
    });
    getTixianCfg().then((res: any) => {
        withdrawConfig.value = res.data as WithdrawConfig;
    });
});
</script>

<template>
    <div class="lkx">
        <!-- <div class="withdraw" style="margin-top: 90rpx; text-align: center"></div> -->

        <div class="shu">
            <div class="choose_money">
                <p>请选择提现金额</p>
                <div class="money_list">
                    <div v-for="item in amounts" :class="{ active: money == item }" @click="money = item">
                        {{ item }}
                    </div>
                </div>
            </div>

            <div v-if="money != ''" style="color: #000; padding-left: 40rpx; margin-bottom: 20rpx">手续费:{{ tday == 1 ? (Number(money) * 0.015).toFixed(2) : tday == 3 ? (Number(money) * 0.005).toFixed(2) : 0 }}元</div>
        </div>

        <p class="choose">请选择提现方式</p>

        <div class="neir" style="width: 95%; margin: 0 auto">
            <div class="neir_warp">
                <div class="ne">
                    <p>USDT地址</p>
                </div>
                <div class="ne">
                    <input type="text" v-model="usdt" placeholder="请输入USDT地址" disabled class="address_input" />
                </div>
            </div>

            <div class="neir_warp">
                <div class="ne">
                    <p>提现网络：</p>
                </div>
                <div class="ne">
                    <!-- <Select class="selectLx" style="margin-top: 20rpx" :nullOption="false" :datas="types" v-model="lx" @change="changeLx" /> -->
                    <uni-data-select v-model="lx" :localdata="types" disabled></uni-data-select>
                </div>
            </div>
        </div>

        <div class="mima">
            <p style="border: 0">
                <image mode="widthFix" src="@/static/img/suo.png" alt="" />
                <input type="password" v-model="usepwd" placeholder="请输入支付密码" />
                <a :href="'#/pages/topay/index?pay_pwd=' + pay_pwd">忘记密码?</a>
            </p>
        </div>

        <div class="ke" style="margin: 40rpx 30rpx">
            <!-- <div class="choose_type2" style="display: block">
                <div :class="{ active: tday == 1 }" style="width: 90%; margin: 20rpx auto" @click="tday = 1"></div>
            </div> -->
            <p style="margin: 20rpx auto">提现方式</p>
            <div class="choose_type2">
                <template v-for="(item, index) in withdrawConfig.cfg" :key="index" >

                    <div v-if="item.open == true" class="choose_type2_item" :class="{ active: tday === item.day }" @click="tday = item.day"" >
                        <span >  T+{{ item.day }}提现到账</span>
                    </div>
                </template>
            </div>

            <div class="withdraw_warp4 clearfix">
                <p>*提现手续费</p>
                <span v-for="(item, index) in withdrawConfig.cfg" :key="index">
                    <span v-if="item.open == true">
                        <span v-if="Number(item.rate) > 0"> {{ index + 1 }}: 选择T{{ item.day }}提现手续费为{{ Number(item.rate) * 100 }}% </span>
                        <span v-else> {{ index + 1 }}: 选择T{{ item.day }}提现免手续费 </span>
                    </span>
                </span>
                <p>*提现时间</p>
                <span>提现时间：{{ withdrawConfig.time.kaitime }} - {{ withdrawConfig.time.shoutime }}</span>
            </div>
        </div>

        <div class="qr" @click="ok">
            <p style="width: 90%; line-height: 90rpx; height: 90rpx; text-align: center; display: block; margin: 0 auto; background-color: rgba(22, 206, 229, 1); font-size: 32rpx; border-radius: 50rpx; color: #fff">
                {{ isLoading ? '正在提交...' : '确定' }}
            </p>
        </div>

        <div>
            <image mode="widthFix" class="chat_icon" src="@/static/img/kkkfff.png" alt="" @click="toCustomer" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lkx {
    background: #eff9ff;
    height: 100%;
    overflow: hidden;
    padding-bottom: 20rpx;
    .choose {
        margin: 0 20rpx 20rpx;
        font-size: 32rpx;
    }

    .mima {
        width: 95%;
        margin: 0 auto;
        background-color: #fff;
        padding: 20rpx;
        border-radius: 10rpx;
        margin-top: 40rpx;

        p {
            display: flex;
            align-items: center;
            color: #000;
            line-height: 80rpx;
            height: 80rpx;
            font-size: 28rpx;
            font-weight: 600;
            border-radius: 10rpx;
            padding-left: 20rpx;

            image {
                width: 7%;
                margin-right: 20rpx;
            }

            input {
                width: 60%;
                font-weight: 400;
                border: none;
                background: 0;
            }

            a {
                color: #d43030;
                display: block;
                position: relative;
                margin-left: 40rpx;
            }
        }
    }

    .neir {
        .neir_warp {
            background-color: #fff;
            display: flex;
            padding-bottom: 20rpx;
            padding: 20rpx;

            .ne {
                padding: 0 20rpx;
                flex: 1;
                border-bottom: 0.01px solid #d4e2eb;

                p {
                    font-size: 32rpx;
                    color: #000;
                    font-weight: 600;
                    line-height: 80rpx;
                    width: 180rpx;
                }

                input {
                    width: 500rpx;
                    line-height: 100rpx;
                    height: 100rpx;
                    width: 300rpx !important;
                    padding-right: 20rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    border: none;
                    background-color: 0;
                }
                :deep .uni-select__input-text {
                    width: 84%;
                }

                .uni-data-select {
                    width: 500rpx;
                }
            }
        }
    }
}

.choose_money {
    width: 94%;
    margin: 0 auto;

    p {
        line-height: 80rpx;
        font-size: 32rpx !important;
        color: #000 !important;
        padding-left: 20rpx !important;
    }
    .money_list {
        display: flex;
        flex-wrap: wrap;
        div {
            width: 30%;
            margin: 0 1.6%;
            background: #fff;
            font-size: 32rpx;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
        }

        .active {
            background: #16cee5;
            color: #fff;
            font-weight: 700;
        }
    }
}

.chat_icon {
    position: fixed;
    width: 200rpx;
    z-index: 898;
    right: 20rpx;
    top: 70%;
}

.ke {
    .choose_type2 {
        display: flex;
        background-color: #fff;
        padding: 20rpx;

        .choose_type2_item {
            flex: 1;
            margin: 20rpx;
            line-height: 70rpx;
            height: 70rpx;
            border-radius: 10rpx;
            text-align: center;

            &.active {
                border: 1px solid #16cee5;
                color: #16cee5;
            }

            span {
                font-size: 28rpx;
            }
        }
    }

    .withdraw_warp4 {
        margin-top: 30rpx;

        p {
            font-size: 26rpx;
            color: #000;
        }

        span {
            font-size: 24rpx;
            color: gray;
            display: block;
            margin-top: 10rpx;
        }

        image {
            width: 30%;
            position: absolute;
            right: 0;
            bottom: 160rpx;
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
            background: #16cee5;
            color: #fff;
            font-weight: 700;
            font-size: 28rpx;
            border-radius: 48rpx;
        }
    }
}
</style>
