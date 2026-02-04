<template>
    <div class="my_warp1">
        <image class="bei" src="@/static/img/sybgbg.png" alt="" />
        <div class="my_warp">
            <div class="my">
                <image  :src="userInfo.pic ? prefixUrl + userInfo.pic : '@/static/img/smy_tx.png'" alt="" @click="editInfo" />
                <div class="vip">
                    <p>{{ userInfo.phone }}<text class="bail" v-if="userInfo.is_bail==1">保障金</text></p>
                    <div class="dj_warp">
                        <div class="dj">
                            <image mode="widthFix" src="@/static/img/dj.png" alt="" />
                            <span>L{{ userInfo.uselevel }}</span>
                        </div>
                        <div class="dj" style="margin-left: 12rpx">
                            <view v-if="userInfo.renzheng === '1'">已认证</view>
                            <view v-else @click="bindbank">实名认证</view>
                        </div>
                    </div>
                </div>
                <div class="my_con1">
                    <image mode="widthFix" style="margin-right: 40rpx" src="@/static/imgs/my_kf.png" alt="" @click="customer" />
                </div>
            </div>
            <div class="yue">
                <image mode="widthFix" src="@/static/img/yuebg.png" alt="" />
                <div class="ye">
                    <div class="ye1">
                        <p>账户余额 (¥)</p>
                        <view class="transfer_btn" v-if="userInfo.status_transfer == 1" @click="transfer">转账</view>
                    </div>
                    <div class="ye2">
                        <div class="ye3">
                            <p>{{ getBalance }}</p>
                        </div>
                        <div class="ye4">
                            <view class="transfer_btn" @click="withdraw">提款</view>
                            <view class="transfer_btn" style="background-color: rgba(22, 206, 229, 1); color: rgba(255, 255, 255, 1)" @click="customer">存款</view>
                        </div>
                    </div>
                </div>
                <div class="shuju_warp">
                    <div class="shuju">
                        <p>个人收益</p>
                        <p>总收益</p>
                        <p>理财收益</p>
                        <p>团队收益</p>
                    </div>
                    <div class="shuju">
                        <span>{{ userInfo.fenrun }}</span>
                        <span>{{ userInfo.shouyi_total }}</span>
                        <span>{{ userInfo.licaifen }}</span>
                        <span>{{ userInfo.teamfenrun }}</span>
                    </div>
                </div>
            </div>
            <div class="zhanghu_warp">
                <span>账户详情</span>
                <div class="zhanghu1">
                    <div class="zhanghu2" @click="front">
                        <image mode="widthFix" src="@/static/img/zzjj.png" alt="" />
                        <p>资金明细</p>
                    </div>
                    <div class="zhanghu2" @click="deposit">
                        <image mode="widthFix" src="@/static/img/cckk.png" alt="" />
                        <p>存款记录</p>
                    </div>
                    <div class="zhanghu2" @click="takeout">
                        <image mode="widthFix" src="@/static/img/ttkk.png" alt="" />
                        <p>提款记录</p>
                    </div>
                    <div class="zhanghu2" @click="topay">
                        <image mode="widthFix" src="@/static/img/suo1.png" alt="" />
                        <p>支付密码</p>
                    </div>
                </div>
            </div>
            <div class="data_warp">
                <span>我的信息</span>
                <div class="data1">
                    <div class="data2">
                        <div class="data3" @click="repaying">
                            <image mode="widthFix" src="@/static/img/usdticon.png" alt="" />
                            <p>USDT地址</p>
                        </div>
                        <div class="data3">
                            <image mode="widthFix" src="@/static/img/wdzc.png" alt="" @click="verified" />
                            <p>我的资产</p>
                        </div>
                        <div class="data3" @click="bindbank">
                            <image mode="widthFix" src="@/static/img/yhkh.png" alt="" />
                            <p>银行卡号</p>
                        </div>
                        <div class="data3" @click="teamreport">
                            <image mode="widthFix" src="@/static/img/wdtd1.png" alt="" />
                            <p>我的团队</p>
                        </div>
                    </div>
                    <div class="data4">
                        <div class="data5" @click="invite">
                            <image mode="widthFix" src="@/static/img/yqhy1.png" alt="" />
                            <p>邀请好友</p>
                        </div>
                        <div class="data5" @click="download">
                            <image mode="widthFix" src="@/static/img/appxz.png" alt="" />
                            <p>APP下载</p>
                        </div>
                        <div class="data5" @click="password">
                            <image mode="widthFix" src="@/static/img/editpwd.png" alt="" />
                            <p style="margin-top: 12rpx">修改密码</p>
                        </div>
                        <div class="data5" @click="address">
                            <image mode="widthFix" src="@/static/img/adress.png" alt="" />
                            <p style="margin-top: 12rpx">收货地址</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my_logout" @click="Logout">退出登录</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getAuthentication, getuserdetail, getapistrade, gettrc20address } from '../../api/getdata';
import globalTool from '@/utils/globalTool';

const userInfo = ref<any>({});
const tousu = ref('');
const authentication = ref('');
const pay_pwd = ref(0);
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const getBalance = computed(() => {
    return globalTool.addString([userInfo.value.benjin, userInfo.value.benjin0]);
});
const { prefixUrl, userdetail } = storeToRefs(userStore);
// const { userdetail, user, token, url } = store.state;
const total = computed(() => {
    return (parseFloat(userInfo.value.fenrun) + parseFloat(userInfo.value.licaifen) + parseFloat(userInfo.value.teamfenrun)).toFixed(2);
});
onShow(() => {
    InitData();
    getTousu();
    getAuthenticationData();
});

watch(
    userdetail,
    () => {
        InitData();
    },
    { deep: true }
);
function editInfo() {
    uni.navigateTo({
        url: '/pages/editInfo/index'
    });
}
function bindbank() {
    uni.navigateTo({
        url: '/pages/bindbank/index'
    });
}
function customer() {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
}
function front() {
    uni.navigateTo({
        url: '/pages/front/index'
    });
}
function deposit() {
    uni.navigateTo({
        url: '/pages/deposit/index'
    });
}
function takeout() {
    uni.navigateTo({
        url: '/pages/takeout/index'
    });
}
function topay() {
    uni.navigateTo({
        url: '/pages/topay/index'
    });
}
function repaying() {
    uni.navigateTo({
        url: '/pages/usdt/address'
    });
}
function verified() {
    uni.navigateTo({
        url: '/pages/verified/index'
    });
}
function teamreport() {
    uni.navigateTo({
        url: '/pages/teamreport/index'
    });
}
function invite() {
    uni.navigateTo({
        url: '/pages/invite/index'
    });
}
function download() {
    uni.navigateTo({
        url: '/pages/download/index'
    });
}
function password() {
    uni.navigateTo({
        url: '/pages/password/index'
    });
}
function address() {
    uni.navigateTo({
        url: '/pages/address/index'
    });
}

function InitData() {
    getuserdetail().then((data: any) => {
        userInfo.value = data;
        // 账户余额=benjin+benjin0+benjin1
        // 可提现账户余额=benjin
        // 充值账户余额benjin0
        // 预约账户余额benjin1
        // 余额宝yueb

        uni.setStorageSync('pay_pwd', data.pay_pwd);
    });
}

function toAuth() {
    if (!authentication.value) {
        uni.navigateTo({
            url: '/pages/bindbank/index'
        });
    } else {
        globalTool.showToast(authentication.value === '未审核' ? '您已提交实名认证信息，等待审核' : '您已实名认证过！');
    }
}

function team() {
    uni.navigateTo({
        url: '/pages/team/index'
    });
}

function pwd() {
    uni.navigateTo({
        url: `/pages/withdrawpwd/index?pay_pwd=${userInfo.value.pay_pwd}`
    });
}

function withdraw() {
    if (!authentication.value) {
        globalTool.showModal('请先实名认证', () => {
            uni.navigateTo({
                url: '/pages/bindbank/index'
            });
        });
    } else {
        uni.navigateTo({
            url: '/pages/withdrawtype/index'
        });
    }
}

function getAuthenticationData() {
    getAuthentication().then((data: any) => {
        authentication.value = data.result === 'true' ? data.msg : false;
    });
}

function getTousu() {
    getapistrade().then((data: any) => {
        tousu.value = data.tousu;
    });
}

function Logout() {
    globalTool.showModal(
        '确定退出登录?',
        () => {
            // store.commit('CLEAN_ALL');
            uni.clearStorage();
            uni.reLaunch({
                url: '/pages/login/index'
            });
        },
        true
    );
}

function clear() {
    globalTool.openExternalUrl('https://www.ydk789.com/html');
}
function transfer() {
    uni.navigateTo({
        url: '/pages/transfer/index'
    });
}
</script>

<style scoped lang="scss">
.my_warp1 {
    position: relative;
    background-color: #f3f4f8;
    padding-bottom: 20rpx;
    .bei {
        position: absolute;
        top: 0;
        width: 100%;
    }
    .my_warp {
        position: relative;
        top: 40rpx;
        .my {
            display: flex;
            align-items: center;
            width: 94%;
            margin: 0 0rpx 0 auto;
            > image {
                width: 120rpx;
                height: 120rpx;
                border-radius: 50%;
            }
            .vip {
                margin-left: 20rpx;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                .bail{
                    color: #ff2828;
                    font-size: 24rpx;
                    margin-left: 10rpx;
                }
                p {
                    color: white;
                    font-size: 36rpx;
                    margin-bottom: 10rpx;
                }
                .dj_warp {
                    width: 60%;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    .dj {
                        background-color: #ffffff;
                        border-radius: 50rpx;
                        display: flex;
                       
                        justify-content: center;
                        align-items: center;
                        image {
                            width: 40%;
                            vertical-align: middle;
                        }
                        span {
                            font-size: 24rpx;
                            vertical-align: middle;
                            color: #16cee5;
                        }
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        background-color: #ffffff;
                        padding: 6rpx;
                        border-radius: 50rpx;
                        text-align: center;
                        view {
                            font-size: 26rpx;
                            vertical-align: middle;
                            color: #ff9528;
                            line-height: 40rpx;
                            height: 40rpx;
                        }
                    }
                }
            }
            .my_con1 {
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin: auto 0;
                p {
                    font-size: 32rpx;
                    color: #ffffff;
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                }
                image {
                    width: 40rpx;
                }
            }
        }
        .yue {
            position: relative;
            image {
                width: 94%;
                left: 3%;
                top: 10rpx;
                position: absolute;
            }
            .ye {
                position: relative;
                width: 80%;
                margin: auto;
                top: 60rpx;
                .ye1 {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        color: #555555;
                        font-size: 26rpx;
                    }
                }
                .ye2 {
                    
                    display: flex;
                    justify-content: space-between;
                    margin-top: -20rpx;
                    .ye3 {
                       
                        flex: 1;
                        margin-top: 30rpx;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        p {
                            font-size: 48rpx;
                            font-weight: 600;
                        }
                        .btn {
                            display: inline-block;
                            width: 120rpx;
                            font-size: 26rpx;
                            background-color: #ffffff;
                            border-radius: 50rpx;
                            color: #16cee5;

                            flex: 1;
                            margin-left: 20rpx;
                            text-align: center;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            line-height: 60rpx;
                            height: 60rpx;
                            border: 0.01px solid #16cee5;
                        }
                    }
                    .ye4 {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 30rpx;
                       
                    }
                }
            }
            .shuju_warp {
                position: relative;
                width: 90%;
                margin: auto;
                top: 90rpx;
                .shuju {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    text-align: center;
                    p {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        font-size: 26rpx;
                        color: #000000;
                        font-weight: 600;
                    }
                    span {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        color: #333333;
                        font-size: 24rpx;
                        margin-top: 20rpx;
                    }
                }
            }
        }
        .zhanghu_warp {
            position: relative;
            top: 200rpx;
            span {
                color: #999999;
                font-size: 24rpx;
                padding-left: 40rpx;
            }
            .zhanghu1 {
                background-color: #ffffff;
                width: 95%;
                display: block;
                margin: 20rpx auto;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                border-radius: 30rpx;
                .zhanghu2 {
                    padding: 40rpx 0;
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    image {
                        width: 50%;
                        display: block;
                        margin: auto;
                    }
                    p {
                        text-align: center;
                        color: #202020;
                        font-size: 22rpx;
                        margin-top: 10rpx;
                    }
                }
                .zhanghu3 {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                }
            }
        }
        .data_warp {
            position: relative;
            top: 220rpx;
            span {
                color: #999999;
                font-size: 24rpx;
                padding-left: 40rpx;
            }
            .data1 {
                background-color: #ffffff;
                width: 95%;
                display: block;
                margin: 20rpx auto;
                border-radius: 30rpx;
                padding-bottom: 40rpx;
                .data2 {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    padding: 40rpx 0;
                    .data3 {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        image {
                            width: 50%;
                            display: block;
                            margin: auto;
                        }
                        p {
                            text-align: center;
                            color: #202020;
                            font-size: 22rpx;
                            margin-top: 10rpx;
                            font-weight: 600;
                        }
                    }
                }
                .data4 {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    width: 100%;
                    .data5 {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        image {
                            width: 50%;
                            display: block;
                            margin: auto;
                        }
                        p {
                            text-align: center;
                            color: #202020;
                            font-size: 22rpx;
                            font-weight: 600;
                            margin-top: 10rpx;
                        }
                    }
                }
            }
        }
    }
    .my_logout {
        width: 94%;
        margin: 300rpx auto 60rpx;
        text-align: center;
        background-color: #ffffff;
        font-weight: bold;
        font-size: 32rpx;
        color: #000;
        line-height: 90rpx;
        height: 90rpx;
        border-radius: 30rpx;
    }
}
.transfer_btn {
    background-color: #ffffff;
    border-radius: 50rpx;
    color: #16cee5;

    margin-left: 20rpx;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 60rpx;
    height: 60rpx;
    border: 0.01px solid #16cee5;
    font-size: 26rpx;
    font-weight: 600;
    width: 120rpx;
}
</style>
