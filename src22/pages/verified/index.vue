<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getGreat, getuserdetail, intobalance, outbalance, getposition, huazhuan } from '../../api/getdata';
import globalTool from '@/utils/globalTool';

interface UserInfo {
    zzic: string;
    fenrun: string;
    yesfenrun: string;
    licaifen: string;
    benjin_keyong: string;
    yiti: string;
    teamfenrun: string;
    yuebao: string;
}

interface DataItem {
    bianhao: string;
    shouyi: string;
    days: string;
    moneys: string;
    lname: string;
}

const enterMoney = ref('');
const datalists = ref<DataItem[]>([]);
const userInfo = ref<any>({});
const bianhao = ref('');
const from = ref('benjin0');
const to = ref('benjin1');
onShow(() => {
    getData();
    // Getyuebao();
    // Getdatas();
});
const getBalance = computed(() => {
    return globalTool.addString([userInfo.value.benjin, userInfo.value.benjin0, userInfo.value.benjin1, userInfo.value.yueb]);
});
const popup = ref();
const transferAmount = ref('');
function getData() {
    getuserdetail().then((data: any) => {
        userInfo.value = data;
    });
}

function Getdatas() {
    getGreat().then((data: any) => {
        datalists.value = data.licai;
    });
}
function Getyuebao() {
    // getposition().then((data: any) => {
    // });
}

function out() {
    if (!enterMoney.value) {
        uni.showToast({ title: '请输入转出金额' });
        return;
    }

    outbalance(enterMoney.value).then(() => {
        uni.showToast({ title: '转出成功' });
        enterMoney.value = '';
        popup.value.close();

        getData();
    });
}

function into() {
    if (!enterMoney.value) {
        uni.showToast({ title: '请输入转入金额' });
        return;
    }

    intobalance(enterMoney.value).then(() => {
        uni.showToast({ title: '转入成功' });
        enterMoney.value = '';
        popup.value.close();
        getData();
    });
}

function buy(bianhao: string, shouyi: string, days: string, moneys: string, lname: string) {
    uni.navigateTo({
        url: `/pages/invest/index?id=${bianhao}&shouyi=${shouyi}&days=${days}&moneys=${moneys}&lname=${lname}`
    });
}

function toInvite() {
    uni.navigateTo({
        url: '/pages/invite/index'
    });
}

function toFinancial() {
    uni.navigateTo({
        url: '/pages/home/financial/index'
    });
}
const inouttitle = ref('');
function outClick() {
    inouttitle.value = '转出';
    popup.value.open();
}
function intoClick() {
    inouttitle.value = '转入';
    popup.value.open();
}
function confirm(value: any) {
    console.log(value);
    enterMoney.value = value;
    if (inouttitle.value == '转出') {
        out();
    } else {
        into();
    }
}
function close() {
    console.log('close');
    popup.value.close();
}
function huazhuanClick() {
    from.value = from.value == 'benjin0' ? 'benjin1' : 'benjin0';
    to.value = to.value == 'benjin0' ? 'benjin1' : 'benjin0';
}
function huazhuanConfirm() {
    if (!transferAmount.value) {
        uni.showToast({ title: '请输入划转金额' });
        return;
    }
    huazhuan(transferAmount.value, from.value, to.value).then((res: any) => {
        console.log(res);
        getData();
        setTimeout(() => {
            uni.showToast({ title: '划转成功' });
        }, 500);
    });
}
</script>

<template>
    <div class="verified_warp">
        <div class="verified_wrap">
            <image mode="widthFix" class="verified_bg" src="@/static/img/zzcbg.png" alt="" />

            <div class="verified_con">
                <div class="zzc">
                    <div class="flex flex-col pt-20rpx">
                        <div class="flex flex-col">
                            <span>总资产</span>
                            <image mode="widthFix" src="@/static/img/ZJBZ.png" alt="" />
                        </div>
                    </div>
                    <div class="">
                        <span>{{ getBalance }}</span>
                    </div>
                </div>

                <div class="zc">
                    <div class="zc_wrap">
                        <div>
                            <p>总收益</p>
                            <span>{{ userInfo.shouyi_total }}</span>
                        </div>
                        <div>
                            <p>昨日收益</p>
                            <span>{{ userInfo.yesfenrun }}</span>
                        </div>
                        <div>
                            <p>总提现</p>
                            <span class="shouyi">{{ userInfo.yiti }}</span>
                        </div>
                    </div>

                    <div class="zc_wrap">
                        <div>
                            <p>可提现账户</p>
                            <span>{{ userInfo.benjin }}</span>
                        </div>
                        <div>
                            <p>充值账户</p>
                            <span>{{ userInfo.benjin0 }}</span>
                        </div>
                        <div>
                            <p>预约账户</p>
                            <span>{{ userInfo.benjin1 }}</span>
                        </div>
                    </div>
                    <div class="yuebao-wrap">
                        <div class="yuebao-left">
                            <div class="title">余额宝</div>
                            <div class="amount">
                                <div class="label">金额(元)</div>
                                <div class="value">{{ userInfo.yueb }}</div>
                            </div>
                            <div class="button-group">
                                <button class="transfer-out" @click="outClick">转出</button>
                                <button class="transfer-in" @click="intoClick">转入</button>
                            </div>
                        </div>
                        <div class="yuebao-right">
                            <div class="transfer-path">
                                <div class="path-item">
                                    <text class="label">从</text>
                                    <text class="value">{{ from == 'benjin0' ? '充值账户' : '预约账户' }}</text>
                                </div>
                                <div class="path-line">
                                    <div class="dot"></div>
                                    <div class="dot"></div>
                                </div>
                                <div class="path-item">
                                    <text class="label">到</text>
                                    <text class="value">{{ to == 'benjin0' ? '充值账户' : '预约账户' }}</text>
                                </div>
                                <image mode="widthFix" @click="huazhuanClick" class="hzimg" src="@/static/imgs/hz.png" alt="" />
                            </div>
                            <div class="transfer-amount">
                                <div class="label">划转金额</div>
                                <!-- <div class="value">500.00</div> -->
                                <input type="text" v-model="transferAmount" placeholder="请输入" class="transfer-input" placeholder-style="color: #999;font-size: 28rpx;" />
                            </div>
                            <button class="confirm-btn" @click="huazhuanConfirm">确定</button>
                        </div>
                    </div>
                    <!-- <div class="verified_warp_content">
                        <input type="number" v-model="enterMoney" placeholder="请输入购买金额" />
                        <div class="verified_warp_content2">
                            <p @click="out">取出</p>
                            <p style="background-color: rgba(22, 206, 229, 1); color: #fff" @click="into">存入</p>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- <div class="verified2" @click="toInvite">
                <image mode="widthFix" src="@/static/img/yqhydjj.png" alt="" />
            </div> -->

            <!-- <div class="shu">
                <image mode="widthFix" src="@/static/img/shu.png" alt="" />
                <span>稳健精选</span>
            </div>

            <div class="verified5" @click="toFinancial">
                <div class="shouyi_warp">
                    <div v-for="(item, index) in datalists" :key="index" :class="['shouyi', { active: bianhao == item.bianhao }]" @click="buy(item.bianhao, item.shouyi, item.days, item.moneys, item.lname)">
                        <p>近七日预计收益</p>
                        <span>{{ item.shouyi }}%</span>
                        <i>{{ item.lname }}</i>
                        <em
                            >理财<span>{{ item.days }}天</span> ｜ <span>{{ item.moneys }}</span> 元起投</em
                        >
                    </div>
                </div>
            </div> -->
        </div>
        <div class="tip-wrap">
            <div class="tip-section">
                <div class="tip-title">
                    <div class="line"></div>
                    账户资产结构说明
                    <div class="line"></div>
                </div>

                <div class="tip-content">
                    <div class="tip-item">
                        <div class="item-title">充值账户说明：</div>
                        <div class="item-desc">充值账户为用户通过银行转账、快捷支付等方式充值后形成的账户余额，可用于参与所有专区垫还服务</div>
                    </div>

                    <div class="tip-item">
                        <div class="item-title">可提账户说明：</div>
                        <div class="item-desc">可提账户中的金额由垫还完成返还的本金、收益及其他可提现与福利金额，该账户内资金支持实时提现及普通专区垫还操作</div>
                    </div>

                    <div class="tip-item">
                        <div class="item-title">预约账户说明：</div>
                        <div class="item-desc">预约账户为用户用于预约参与平台"应急专区""爱心援助专区"等专项项目的专用金存放账户</div>
                    </div>
                </div>
            </div>

            <div class="tip-section">
                <div class="tip-title">
                    <div class="line"></div>
                    重要提示
                    <div class="line"></div>
                </div>

                <div class="tip-content">
                    <div class="tip-item">
                        <div class="item-title">资金提现政策说明（合规要求）</div>
                        <div class="item-desc">为积极配合国家关于反洗钱的法律法规，保障用户资金安全，平台对新充值资金的提现作如下规定：</div>
                        <div class="item-desc">用户通过充值渠道（如银行卡、支付平台等）新转入的资金，需至少参与一次任意专区的"垫还操作"后，方可申请提现。</div>
                        <div class="item-desc">该规定旨在有效防范洗钱、非法套现等风险，符合《反洗钱法》等相关政策要求。未进行垫还操作的充值资金，将暂时锁定在充值账户中，无法直接提现。</div>
                    </div>

                    <div class="tip-item">
                        <div class="item-title">合法使用路径说明：</div>
                        <div class="item-desc">用户充值后参与任意专区项目，即视为完成一次有效操作；</div>
                        <div class="item-desc">完成操作后，相应资金（含本金及可能的收益）将按规则返还至可提账户，可正常发起提现申请。</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 转入转出金额输入框弹窗 uni-popup -->
        <uni-popup ref="popup" type="center">
            <uni-popup-dialog mode="input" message="成功消息" :title="inouttitle" :duration="2000" placeholder="请输入" confirm-text="确定" cancel-text="取消" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>

            <!-- <div class="popup-content">
                <input type="text" v-model="enterMoney" placeholder="请输入" class="transfer-input" placeholder-style="color: #999;font-size: 28rpx;" />
            </div> -->
        </uni-popup>
    </div>
</template>
<style lang="scss" scoped>
.verified_warp {
    height: 100%;
    position: relative;
    padding-top: 20rpx;
    background-color: #eff9ff;

    .vux-header {
        background: #fff !important;

        .vux-header-left {
            .left-arrow:before {
                border-color: #000 !important;
                font-weight: bold !important;
            }
        }

        .vux-header-title {
            color: #000 !important;
        }
    }

    .verified_wrap {
        position: relative;

        .verified_bg {
            position: absolute;
            left: 20rpx;
            width: 96%;
            display: block;
            margin: 0 auto;
        }

        .rl {
            width: 180rpx;
            height: 180rpx;
            float: right;
            margin-right: 80rpx;
        }

        .verified_con {
            width: 96%;
            border-radius: 20rpx;
            margin: 0 auto;
            position: relative;
            z-index: 33;

            .zzc {
                width: 85%;
                margin: 0 auto;
                margin-top: 20rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                image {
                    width: 150rpx;
                    height: 36rpx;
                }

                p {
                    font-size: 24rpx;
                    color: #ffffff;
                }

                span {
                    font-size: 30rpx;
                    font-weight: bold;
                    display: block;
                    color: #ffffff;
                }
            }

            .zc {
                border-radius: 20rpx;
                margin: 0 auto;
                padding: 20rpx 0;
                margin-top: 20rpx;

                .zc_wrap {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    width: 100%;
                    color: #ffffff;

                    div {
                        width: 30%;
                        text-align: center;
                        margin: 24rpx auto;

                        p {
                            font-size: 24rpx;
                        }

                        span {
                            display: block;
                            font-size: 28rpx;
                        }

                        .shouyi {
                            font-weight: bold;
                        }
                    }
                }

                .verified_warp_content {
                    width: 100%;
                    margin: auto;
                    background-color: #ffffff;
                    padding: 40rpx;
                    border-bottom-left-radius: 10rpx;
                    border-bottom-right-radius: 10rpx;

                    input {
                        background: #efefef;
                        padding: 0 20rpx;
                        width: 100%;
                        margin-bottom: 20rpx;
                        line-height: 90rpx;
                        height: 90rpx;
                        color: #939ba4;
                        font-size: 28rpx;
                        position: relative;
                        border-radius: 20rpx;
                    }

                    .verified_warp_content2 {
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;

                        p {
                            border: 0.01px solid #16cee5;
                            margin: 0 10rpx;
                            position: relative;
                            padding: 20rpx 60rpx;
                            border-radius: 40rpx;
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            color: #16cee5;
                            font-size: 32rpx;
                            text-align: center;
                        }
                    }
                }
            }
        }

        .verified2 {
            width: 90%;
            display: block;
            margin: 20rpx auto;

            image {
                width: 100%;
            }
        }

        .shu {
            padding-left: 40rpx;

            image {
                width: 1%;
            }

            span {
                font-size: 36rpx;
                margin-left: 20rpx;
                font-weight: 700;
            }
        }

        .verified4 {
            width: 90%;
            margin: 20rpx auto 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;

            p {
                font-size: 32rpx;
                color: #000;
                margin-right: 10rpx;
            }

            span {
                font-size: 26rpx;
                color: #383838;
            }
        }

        .verified5 {
            .shouyi_warp {
                width: 95%;
                margin: 40rpx auto;
                display: flex;
                flex-wrap: wrap;
                .shouyi {
                    width: 46%;
                    display: inline-block;
                    margin: 0 10rpx;
                    background-color: #ffffff;
                    text-align: center;
                    padding: 40rpx 20rpx;
                    border-radius: 10rpx;
                    margin-bottom: 20rpx;

                    &.active {
                        border-radius: 2rpx solid red;
                    }

                    p {
                        color: #000000;
                        font-size: 24rpx;
                        margin-bottom: 40rpx;
                    }

                    span {
                        margin-top: 40rpx;
                        color: #16cee5;
                        font-size: 64rpx;
                        font-style: normal;
                    }

                    i {
                        margin: 40rpx auto 14rpx auto;
                        font-weight: bold;
                        font-size: 32rpx;
                        color: #000000;
                        font-style: normal;
                        display: block;
                    }

                    em {
                        margin-top: 20rpx;
                        font-size: 24rpx;
                        color: #999999;
                        font-style: normal;

                        span {
                            font-size: 24rpx;
                        }
                    }
                }

                .verified11 {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    margin-top: 20rpx;

                    p {
                        border-radius: 2px;
                        background: #e8f0ff;
                        font-size: 24rpx;
                        color: #5e88eb;
                        padding: 10rpx;
                        text-align: center;
                    }
                }

                .verified12 {
                    font-size: 28rpx;
                    color: #a6a6a6;
                    margin-top: 20rpx;
                }
            }
        }
    }
}

.yuebao-wrap {
    display: flex;
    background: #fff;
    border-radius: 20rpx;
    margin: 0rpx;
    margin-top: 40rpx;
    padding: 20rpx;

    .yuebao-left {
        flex: 1;
        padding-right: 30rpx;

        .title {
            font-size: 36rpx;
            font-weight: bold;
            color: #333;
            margin-bottom: 30rpx;
        }

        .amount {
            margin: 20rpx 0 40rpx;

            .label {
                font-size: 28rpx;
                color: #999;
                margin-bottom: 10rpx;
                text-align: center;
            }

            .value {
                font-size: 48rpx;
                font-weight: bold;
                color: #333;
                text-align: center;
            }
        }

        .button-group {
            display: flex;
            flex-direction: column;
            gap: 20rpx;

            button {
                width: 100%;
                padding: 0rpx 0;
                border-radius: 40rpx;
                font-size: 32rpx;
                text-align: center;

                &.transfer-out {
                    background: transparent;
                    border: 2rpx solid #16cee5;
                    color: #16cee5;
                }

                &.transfer-in {
                    background: #16cee5;
                    color: #fff;
                    border: none;
                }
            }
        }
    }

    .yuebao-right {
        flex: 1;
        border-left: 2rpx solid #eee;
        padding-left: 10rpx;

        .transfer-path {
            margin-bottom: 60rpx;
            position: relative;

            .path-line {
                position: absolute;
                left: 30rpx;
                top: 50%;
                transform: translateY(-50%);
                width: 4rpx;
                height: 60rpx;
                background: #16cee5;

                .dot {
                    position: absolute;
                    width: 12rpx;
                    height: 12rpx;
                    border-radius: 50%;
                    background: #16cee5;
                    left: -4rpx;

                    &:first-child {
                        top: -6rpx;
                    }

                    &:last-child {
                        bottom: -6rpx;
                    }
                }
            }
            .hzimg {
                width: 60rpx;
                height: auto;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            .path-item {
                padding-left: 60rpx;
                margin: 35rpx 0;
                position: relative;

                .label {
                    font-size: 28rpx;
                    color: #999;
                    margin-bottom: 10rpx;
                    margin-right: 10rpx;
                }

                .value {
                    font-size: 32rpx;
                    color: #333;
                }
            }
        }

        .transfer-amount {
            padding: 20rpx;
            border-radius: 10rpx;
            margin: 30rpx 0;
            display: flex;
            align-items: center;
            .label {
                font-size: 28rpx;
                color: #0e0101;
                margin-right: 10rpx;
            }

            .value {
                font-size: 36rpx;
                color: #333;
                margin-top: 10rpx;
            }
            .transfer-input {
                width: 100%;
                border-radius: 10rpx;
                background: #f5f5f5;
                //占用剩余宽度
                flex: 1;
            }
        }

        .confirm-btn {
            width: 100%;
            padding: 0rpx 0;
            border-radius: 40rpx;
            font-size: 32rpx;
            text-align: center;
            background: #16cee5;
            color: #fff;
            border: none;
            margin-top: 40rpx;
        }
    }
}
.popup-content {
    padding: 20rpx;
}

.tip-wrap {
    background: #fff;
    margin: 20rpx;
    padding: 30rpx;
    border-radius: 20rpx;

    .tip-section {
        margin-bottom: 40rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .tip-title {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 30rpx;
            color: #333;
            font-size: 32rpx;
            font-weight: bold;

            .line {
                width: 60rpx;
                height: 2rpx;
                background: #16cee5;
                margin: 0 20rpx;
            }
        }

        .tip-content {
            .tip-item {
                margin-bottom: 30rpx;

                &:last-child {
                    margin-bottom: 0;
                }

                .item-title {
                    font-size: 28rpx;
                    color: #333;
                    font-weight: bold;
                    margin-bottom: 10rpx;
                }

                .item-desc {
                    font-size: 26rpx;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 10rpx;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>
