<template>
    <div class="withdraw_warp">
        <div class="withdraw_warp1">
            <div class="withdraw_warp2">
                <p>提现金额（元）</p>
                <span>可提现 {{ userInfo.benjin }}元</span>
            </div>

            <div class="shu">
                <div class="choose_money clearfix">
                    <div v-for="amount in amounts" :key="amount" :class="{ active: money === amount }" @click="money = amount">
                        {{ amount }}
                    </div>
                </div>
            </div>

            <div class="withdraw_warp3">
                <span class="bank-info-title">银行卡信息</span>

                <div class="neir_warp">
                    <div class="ne">
                        <p>姓名</p>
                    </div>
                    <div class="ne">
                        <input v-model="authentication.bankuser" type="text" placeholder="请输入姓名" autocomplete="bankuser"/>
                    </div>
                </div>

                <div class="neir_warp">
                    <div class="ne">
                        <p>银行名称</p>
                    </div>
                    <div class="ne">
                        <input v-model="authentication.bankname" type="text" placeholder="请输入银行名称" autocomplete="bankname"/>
                    </div>
                </div>

                <div class="neir_warp">
                    <div class="ne">
                        <p>银行卡号</p>
                    </div>
                    <div class="ne">
                        <input v-model="authentication.bankcode" type="text" placeholder="请输入银行卡号" autocomplete="bankcode"/>
                    </div>
                </div>

                <div class="mima">
                    <p style="border: 0">
                        <image mode="widthFix" src="@/static/img/suo.png" alt="" />
                        <input v-model="usepwd" type="password" placeholder="请输入支付密码" autocomplete="off"/>
                        <a @click="goToPayPwd">忘记密码?</a>
                    </p>
                </div>

                <div class="ke">
                    <p style="margin: 20rpx auto">提现方式</p>
                    <div class="choose_type">
                        <template v-for="(item, index) in withdrawConfig.cfg" :key="index">
                            <div
                                v-if="item.open === true"
                                :class="['choose_type_item', { active: tday === item.day }]"
                                @click="tday = item.day"
                            >
                                <span>T+{{ item.day }}提现到账</span>
                            </div>
                        </template>
                    </div>

                    <div class="withdraw_warp4 clearfix">
                        <p>*提现手续费</p>
                        <span v-for="(item, index) in withdrawConfig.cfg" :key="index">
                            <span v-if="item.open === true">
                                <span v-if="Number(item.rate) > 0">
                                    {{ index + 1 }}: 选择T{{ item.day }}提现手续费为{{ Number(item.rate) * 100 }}%
                                </span>
                                <span v-else>
                                    {{ index + 1 }}: 选择T{{ item.day }}提现免手续费
                                </span>
                            </span>
                        </span>
                        <p>*提现时间</p>
                        <span>提现时间：{{ withdrawConfig.time.kaitime }} - {{ withdrawConfig.time.shoutime }}</span>
                        <image mode="widthFix" src="@/static/img/kkkfff.png" alt="" @click="toCustomer" />
                    </div>

                    <div class="zf">
                        <p @click="submit">确认</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { withdrawals, getuserdetail, getAuthentication, getTixianCfg } from '../../api/getdata';
import type { WithdrawConfig } from '@/api/types';
import globalTool from '@/utils/globalTool';

const amounts = [200, 500, 1000, 2000, 5000, 10000, 50000, 100000, 200000];

function toCustomer() {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
}

const money = ref<number>(0);
const usepwd = ref('');
const tday = ref(1);
const userInfo = ref<any>({});
const authentication = ref({
    usecode: '',
    bankcode: '',
    bankuser: '',
    bankname: ''
});

const withdrawConfig = ref<WithdrawConfig>({
    time: {
        kaitime: '',
        shoutime: ''
    },
    cfg: []
});

function getAuthenticationData() {
    getAuthentication().then((data: any) => {
        if (data.result === 'true') {
            authentication.value = data;
        } else {
            authentication.value = {
                usecode: '',
                bankcode: '',
                bankuser: '',
                bankname: ''
            };
        }
    });
}
onMounted(() => {
    initData();
    getAuthenticationData();
    getTixianCfg().then((res: any) => {
        withdrawConfig.value = res.data as WithdrawConfig;
    });
});

function initData() {
    getuserdetail().then((data: any) => {
        if (data.result === 'true') {
            userInfo.value = data;
        }
    });
}

function goToPayPwd() {
    uni.navigateTo({
        url: '/pages/topay/index'
    });
}

function submit() {
    if (!validateForm()) return;

    withdrawals(authentication.value.bankcode, authentication.value.bankname, authentication.value.bankuser, money.value.toString(), usepwd.value, tday.value.toString()).then((data: any) => {
        if (data.result === 'true') {
            uni.navigateBack();
        }
    });
}

function validateForm() {
    if (!money.value) {
        globalTool.showToast('请输入提现金额');
        return false;
    }
    if (!authentication.value.bankcode) {
        globalTool.showToast('请输入银行卡号');
        return false;
    }
    if (!authentication.value.bankname) {
        globalTool.showToast('请输入银行名称');
        return false;
    }
    if (!authentication.value.bankuser) {
        globalTool.showToast('请输入姓名');
        return false;
    }
    if (!usepwd.value) {
        globalTool.showToast('请输入支付密码');
        return false;
    }
    return true;
}
</script>

<style lang="scss" scoped>
.withdraw_warp {
    background-color: #eff9ff;
    height: 100%;
    width: 100%;
    position: relative;
    padding-bottom: 40rpx;

    .withdraw_warp1 {
        position: relative;
        top: 20rpx;

        .withdraw_warp2 {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
                font-size: 32rpx;
                color: #000;
            }

            span {
                font-size: 28rpx;
                color: #000;
            }
        }

        .shu {
            margin-top: 20rpx;

            .choose_money {
                div {
                    width: 30%;
                    float: left;
                    margin: 0 1.6%;
                    background: #fff;
                    font-size: 32rpx;
                    height: 90rpx;
                    line-height: 90rpx;
                    text-align: center;
                    border-radius: 12rpx;
                    margin-bottom: 20rpx;

                    &.active {
                        background: #16cee5;
                        color: #fff;
                        font-weight: 700;
                    }
                }
            }
        }

        .withdraw_warp3 {
            width: 90%;
            margin: 0 auto;

            .bank-info-title {
                display: block;
                margin: 30rpx 0;
                font-size: 32rpx;
                color: #000;
                font-weight: 600;
            }

            .neir_warp {
                background-color: #fff;
                display: flex;
                padding: 20rpx;

                .ne {
                    border-bottom: 1px solid #d4e2eb;

                    p {
                        font-size: 32rpx;
                        color: #000;
                        font-weight: 600;
                        padding-left: 20rpx;
                        padding-top: 30rpx;
                        width: 160rpx;
                    }

                    input {
                        width: 450rpx;
                        line-height: 100rpx;
                        height: 100rpx;
                        padding-left: 0rpx;
                        border: none;
                        background: none;
                    }
                }
            }

            .mima {
                background-color: #fff;
                padding: 20rpx;
                margin-top: 40rpx;

                p {
                    display: flex;
                    align-items: center;
                    padding: 20rpx;

                    image {
                        width: 40rpx;
                        height: 40rpx;
                        margin-right: 20rpx;
                    }

                    input {
                        flex: 1;
                        border: none;
                        background: none;
                        font-size: 28rpx;
                    }

                    a {
                        color: #d43030;
                        font-size: 28rpx;
                    }
                }
            }

            .ke {
                width: 100%;
                margin: auto;
                padding-bottom: 40rpx;

                .choose_type {
                    display: flex;
                    background-color: #fff;
                    padding: 20rpx;

                    div {
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
        }
    }
}
</style>
