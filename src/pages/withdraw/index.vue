<template>
    <div class="withdraw_warp">
        <div class="withdraw_warp1">
            <div class="withdraw_header">
                <div class="title_section">
                    <h1>一键提现 安心无忧</h1>
                    <div class="withdraw_banner">
                        <span>可提现{{ userInfo.benjin }}</span>
                    </div>
                </div>
                <div class="illustration_section">
                    <img src="@/static/img2/txicon.png" alt="" />
                </div>
            </div>
            <view class="content">
                <div class="shu">
                    <!-- <div class="choose_money">
                        <div v-for="amount in userInfo.tixian_sel" :key="amount" :class="{ active: money === Number(amount) }" @click="money = Number(amount)">
                            {{ amount }}
                        </div>
                    </div> -->
                    <view class="input_warp">
                        <input type="number" v-model="money" placeholder="请输入提现金额" />
                    </view>
                </div>

                <div class="withdraw_warp3">
                    <span class="bank-info-title">银行卡信息</span>

                    <div class="neir_warp">
                        <div class="ne">
                            <p>姓名</p>
                        </div>
                        <div class="ne">
                            <input v-model="authentication.bankuser" type="text" placeholder="请输入姓名" autocomplete="bankuser" disabled />
                        </div>
                    </div>

                    <div class="neir_warp">
                        <div class="ne">
                            <p>银行名称</p>
                        </div>
                        <div class="ne">
                            <input v-model="authentication.bankname" type="text" placeholder="请输入银行名称" autocomplete="bankname" disabled />
                        </div>
                    </div>

                    <div class="neir_warp">
                        <div class="ne">
                            <p>银行卡号</p>
                        </div>
                        <div class="ne">
                            <input :value="getBankCode(authentication.bankcode)" type="text" placeholder="请输入银行卡号" autocomplete="bankcode" disabled />
                        </div>
                    </div>

                    <div class="mima">
                        <p style="border: 0">
                            <img src="@/static/img/suo.png" alt="" />
                            <input v-model="usepwd" type="password" placeholder="请输入支付密码" autocomplete="off" />
                            <a @click="goToPayPwd">忘记密码?</a>
                        </p>
                    </div>

                    <div class="ke">
                        <p style="margin: 20rpx auto">提现方式</p>
                        <div class="choose_type">
                            <div v-for="(item, index) in withdrawTypes" :key="index" :class="{ active: tday === item.value }" @click="tday = item.value">
                                <span>{{ item.label }}</span>
                            </div>
                        </div>

                        <div class="withdraw_warp4 clearfix">
                            <p>*提现手续费</p>
                            <span>1: 选择T1提现手续费为{{ txfee.shouxufei*100 }}%</span>
                            <span>2: 选择T3提现手续费为{{ txfee.shouxufei2*100 }}%</span>
                            <span v-if="parseFloat(txfee.shouxufei3) === 0">3: 选择T7提现免手续费</span>
                            <span v-else>3: 选择T7提现手续费为{{ txfee.shouxufei3*100 }}%</span>
                            <span>*提现最低金额{{ txfee.tixian_min }}元</span>
                        </div>
                        <div class="color-red text-34rpx">注：提现时间为周一至周五9：00-23：00</div>
                        <div class="zf">
                            <p class="goldbtn" @click="submit">确认</p>
                        </div>
                    </div>
                </div>
            </view>
        </div>
        <customer-service />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { withdrawals, getuserdetail, getAuthentication, getTxfee } from '../../api/index';
import globalTool from '@/utils/globalTool';
import CustomerService from '@/components/CustomerService.vue';
const withdrawTypes = [
    { value: 1, label: 'T+1提现到账' },
    { value: 3, label: 'T+3提现到账' },
    { value: 8, label: 'T+7提现到账' }
];
function toCustomer() {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
}
const getBankCode = (bankcode: string) => {
    if (bankcode) {
        //把 bankcode 的前4位和后4位用 * 代替
        return bankcode.slice(0, 4) + ' **** ' + bankcode.slice(-4);
    }
    return '';
};
const money = ref<number>();
const usepwd = ref('');
const tday = ref(1);
const userInfo = ref<any>({});
const authentication = ref({
    usecode: '',
    bankcode: '',
    bankuser: '',
    bankname: ''
});
const getUrl = (_type: string) => {
    const token = uni.getStorageSync('token');
    const url = `/api/kefu_url.php?token=${token}&type=${_type}`;
    uni.navigateTo({
        url: `/pages/chatcon/index?url=${url}`
    });
};
function getAuthenticationData() {
    getAuthentication()
        .then((data: any) => {
            authentication.value = data;
        })
        .catch((err: any) => {
            authentication.value = {
                usecode: '',
                bankcode: '',
                bankuser: '',
                bankname: ''
            };
            uni.showModal({
                title: '提示',
                content: '请先进行实名认证',
                confirmText: '去认证',
                cancelText: '取消',
                success: (res) => {
                    if (res.confirm) {
                        uni.navigateTo({
                            url: '/pages/auth/index'
                        });
                    }
                }
            });
        });
}

const txfee = ref<any>({
    shouxufei: '',
    shouxufei2: '',
    shouxufei3: '',
    tixian_min: '',
    tixians: ''
});
onShow(() => {
    initData();
    getAuthenticationData();
    getTxfee().then((data: any) => {
        txfee.value = data.data;
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

    withdrawals(authentication.value.bankcode, authentication.value.bankname, authentication.value.bankuser, Number(money.value), usepwd.value, tday.value.toString()).then((data: any) => {
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
page {
    background-color: #000;
}

/* 确保整个页面容器都是黑色 */
.withdraw_warp {
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

        .withdraw_warp2 {
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20rpx 0;

            p {
                font-size: 34rpx;
                color: #333;
                font-weight: 500;
            }

            span {
                font-size: 28rpx;
                color: #335ef8;
                font-weight: 500;
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
                    width: 150rpx;

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

                .ne {

                    p {
                        font-size: 32rpx;
                        color: #333;
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
                        font-size: 30rpx;
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
                            border: 1px solid #5b3601;
                            color: #5b3601;
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

                    img {
                        width: 30%;
                        position: absolute;
                        right: 0;
                        bottom: 40rpx;
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
                        box-shadow: 0 6rpx 20rpx rgba(51, 94, 248, 0.3);
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
