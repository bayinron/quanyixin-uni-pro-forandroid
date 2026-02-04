<template>
    <view class="page flex-col">
        <view class="box_1 flex-row">
            <view class="group_1">
                <view class="box_2`">
                    <text class="text_1">垫资周期</text>
                    <view class="group_8">
                        <view class="text-wrapper_1 flex-col" :class="item.open == '0' ? 'no' : formdata.day == item.day ? 'cur' : 'normalbg'" v-for="(item, index) in datas.pro.days_moneys" @click="sellv(item)">
                            <text class="text_8">{{ item.day }}天&nbsp;{{ item.rate }}%</text>
                        </view>
                    </view>
                </view>
                <view class="box_3 flex-col">
                    <view class="text-wrapper_2 flex-row justify-between">
                        <text class="text_3">垫资类型：{{ datas.pro.dname }}</text>
                        <text class="text_4">{{ datas.pro.con }}</text>
                    </view>
                    <view class="text-group_1 flex-col">
                        <text class="text_5">垫资金额</text>
                        <text class="text_6">{{ dianzimoney }}元</text>
                        <view class="text-wrapper_3">
                            <text class="text_7">本次垫资收益:</text>
                            <text class="text_8">{{ dianzishouyi }}元</text>
                        </view>
                    </view>
                    <view class="box_4 flex-row justify-between">
                        <view class="text-wrapper_4">
                            <text class="text_9">垫资日期:</text>
                            <text class="text_10">{{ datas.riqi }}</text>
                        </view>
                        <view class="text-wrapper_5">
                            <text class="text_11">到期时间:</text>
                            <text class="text_12">{{ endtime }}</text>
                        </view>
                    </view>
                </view>
                <view class="text-wrapper_6 flex-col" @click="gotobuy">
                    <text class="text_13">确认</text>
                </view>
            </view>
        </view>
        <view class="box_5 flex-col">
            <view class="box_8 flex-col">
                <view class="text-wrapper_7 flex-row">
                    <text class="text_16">账户余额（¥）</text>
                    <text class="text_17">账户信息</text>
                    <text class="text_18">智汇L{{ datas.pro.uselevel1 }}</text>
                </view>
                <view class="text-wrapper_8 flex-row">
                    <text class="text_19">{{ datas.my10 }}</text>
                    <view class="text-wrapper_9 flex-row">
                        <text class="text_20">垫资方</text>
                        <text class="text_21">{{ datas.user.usename }}</text>
                    </view>
                </view>
                <view class="section_1 flex-row justify-between">
                    <view class="text-group_2 flex-col">
                        <text class="text_22">垫资对象</text>
                        <text class="text_23">{{ datas.bank.usename }}</text>
                    </view>
                    <view class="text-group_3 flex-col">
                        <text class="text_24">还款账户</text>
                        <text class="text_25">{{ datas.bank.bankcode }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { _buypro, getOneDh } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
interface Datas {
    user: { issuoding: ''; renzheng: ''; usename: ''; uselevel: ''; benjin_dong: ''; benjin: ''; chong: '' };
    pro: { id: ''; bianhao: ''; zqid: ''; uselevel: ''; uselevel1: ''; pic: ''; dname: ''; dhs: ''; moneys_min: ''; moneys: ''; days_moneys: []; xm_total: ''; xm_yu: ''; con: ''; jianjie: ''; isok: ''; lx: ''; dlx: ''; px: ''; qishu: []; zq_name: '' };
    bank: { id: ''; usename: ''; bankcode: ''; bankname: ''; bankpic: '' };
    riqi: '';
}
const userStore = useUserStore();
interface FormData {
    zqid: '';
    id: '';
    qishu: 1;
    money: '';
    day: 0;
    bankid: 0;
}
const { prefixUrl } = storeToRefs(userStore);
const datas: any = ref<any>({
    user: {
        issuoding: '',
        renzheng: '',
        usename: '',
        uselevel: '',
        benjin_dong: '',
        benjin: '',
        chong: ''
    },
    pro: {
        id: '',
        bianhao: '',
        zqid: '',
        uselevel: '',
        uselevel1: '',
        pic: '',
        dname: '',
        dhs: '',
        moneys_min: '',
        moneys: '',
        days_moneys: [],
        xm_total: '',
        xm_yu: 0,
        con: '',
        jianjie: '',
        isok: '',
        lx: '',
        dlx: '',
        px: '',
        qishu: [],
        zq_name: ''
    },
    bank: {
        id: '',
        usename: '',
        bankcode: '',
        bankname: '',
        bankpic: ''
    },
    riqi: '',
    my10: 0
});
const formdata: any = ref<FormData>({} as FormData);
const msg = ref('');
const show = ref(false);
const zq_name = ref('');
onShow(() => {
    //getData();
});

function sellv(item: any) {
    if (item.open == '1') {
        formdata.value.day = item.day;
        formdata.value.rate = item.rate;
    }
}
const endtime = computed(() => {
    const end = new Date(datas.value.riqi).getTime() + formdata.value.day * 24 * 60 * 60 * 1000;
    const endtime = new Date(end).toLocaleString().split(' ')[0];
    return endtime.replace(/\//g, '-');
});
//垫资金额
const dianzimoney = computed(() => {
    return (datas.value.my10 > parseInt(datas.value.pro.moneys) ? parseInt(datas.value.pro.moneys) : parseInt(datas.value.my10)) ;
});
//垫资收益
const dianzishouyi = computed(() => {
    //     my10=用户余额的整10数
    // moneys_min=本产品最低投资金额
    // monyes=本产品投资最大 金额
    // 收益=投资金额*天数*利率/100

    const dz = (datas.value.my10 > parseInt(datas.value.pro.moneys) ? parseInt(datas.value.pro.moneys) : parseInt(datas.value.my10));

    const sy = dz * formdata.value.day * formdata.value.rate * 0.01;
    return sy.toFixed(2);
});
function gotobuy() {
    if(datas.value.my10 < parseInt(datas.value.pro.moneys_min)){
        uni.showToast({
            title: '余额不足',
            icon: 'none'
        });
        return;
    }
    let form = formdata.value;
    //console.log(JSON.stringify(form))
    _buypro(form.zqid, form.id, dianzimoney.value.toString(), form.qishu, form.day, form.bankid).then((res: any) => {
        uni.showToast({
            title: '垫资成功',
            icon: 'success'
        });
        uni.navigateBack();
    });
}
function go(item: any) {
    if (item.id == 5) {
        uni.navigateTo({
            url: `/pages/experience/qiye?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    }
}

function getData(zqid: any, id: any) {
    getOneDh(zqid, id).then((res: any) => {
        datas.value = res.data;
        zq_name.value = res.data.pro.zq_name;
        formdata.value.zqid = res.data.pro.zqid;
        formdata.value.id = res.data.pro.id;
        formdata.value.moneys = res.data.pro.moneys_min;
        formdata.value.bankid = res.data.bank.id;
        for (let i = 0; i < res.data.pro.days_moneys.length; i++) {
            if (res.data.pro.days_moneys[i].open == '1') {
                formdata.value.day = res.data.pro.days_moneys[i].day;
                break;
            }
        }
        sellv(res.data.pro.days_moneys[0]);
     
        uni.setNavigationBarTitle({
            title: zq_name.value
        });
    });
}
onLoad(async (options: any) => {
    const pages = getCurrentPages();
    const currentPage: any = pages[pages.length - 1];
    if (currentPage?.options) {
        const { zqid, id } = currentPage.options;

        //console.log(JSON.stringify(currentPage.options))
        getData(zqid, id);
    }
});
</script>
<style lang="scss" scoped>
view {
    box-sizing: border-box;
}
.group_8 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20rpx;
    width: 100%;
}
.normalbg {
    background-color: #e6ebff !important;
    color: #335ef8;
}
.cur {
    background-color: #335ef8 !important;
    color: #fff !important;
}
.text-wrapper_1 {
    width: 110px;
    border-radius: 8rpx;
    margin-top: 10rpx;
    padding: 17rpx 28rpx 16rpx 30rpx;
    text-align: center;
    .text_2 {
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 1);
        font-size: 32rpx;
        font-family: PingFang-SC-Heavy;
        font-weight: normal;
        text-align: right;
        white-space: nowrap;
        line-height: 45rpx;
    }
}
.page {
    background-color: rgba(239, 249, 255, 1);
    position: relative;
    width: 750rpx;
    height: auto;
    overflow: hidden;
    padding-top: 400rpx;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    .box_1 {
        .group_1 {
            margin-bottom: 67rpx;
            padding: 63rpx 24rpx 61rpx 24rpx;
            width: 100%;
            .box_2 {
                background-color: rgba(255, 255, 255, 1);
                border-radius: 0rpx 0rpx 15rpx 15rpx;
                padding: 30rpx 473rpx 30rpx 30rpx;
                width: 100%;

                .text_1 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 32rpx;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 45rpx;
                    margin-right: 71rpx;
                }
            }
            .box_3 {
                background-color: rgba(255, 255, 255, 1);
                border-radius: 15rpx;
                margin-top: 30rpx;
                padding: 20rpx 26rpx 30rpx 24rpx;
                .text-wrapper_2 {
                    width: 652rpx;
                    .text_3 {
                        overflow-wrap: break-word;
                        color: #335ef8;
                        font-size: 24rpx;
                        font-family: PingFang-SC-Regular;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                    .text_4 {
                        overflow-wrap: break-word;
                        color: #335ef8;
                        font-size: 24rpx;
                        font-family: HanziPenSC-W3;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-group_1 {
                    margin-top: 37rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    align-content: center;
                    .text_5 {
                        overflow-wrap: break-word;
                        color: rgba(153, 153, 153, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                        align-self: center;
                    }
                    .text_6 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 48rpx;
                        font-family: PingFangSC-Semibold;
                        font-weight: 600;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 67rpx;
                        align-self: center;
                    }
                    .text-wrapper_3 {
                        width: 257rpx;
                        height: 36rpx;
                        overflow-wrap: break-word;
                        font-size: 0;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 36rpx;
                        margin-top: 16rpx;
                        .text_7 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 36rpx;
                        }
                        .text_8 {
                            overflow-wrap: break-word;
                            color: #335ef8;
                            font-size: 24rpx;
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 36rpx;
                        }
                    }
                }
                .box_4 {
                    width: 652rpx;
                    margin-top: 40rpx;
                    .text-wrapper_4 {
                        width: 322rpx;
                        height: 33rpx;
                        overflow-wrap: break-word;
                        font-size: 0;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                        .text_9 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                        .text_10 {
                            overflow-wrap: break-word;
                            color: rgba(85, 85, 85, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                    }
                    .text-wrapper_5 {
                        width: 291rpx;
                        height: 33rpx;
                        overflow-wrap: break-word;
                        font-size: 0;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                        .text_11 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                        .text_12 {
                            overflow-wrap: break-word;
                            color: rgba(85, 85, 85, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                    }
                }
            }
            .text-wrapper_6 {
                background: linear-gradient(to right, #335ef8, #5478ff);
                border-radius: 48rpx;
                align-self: center;
                width: 590rpx;
                margin: 0 auto;
                margin-top: 105rpx;
                padding: 23rpx 263rpx 22rpx 3rpx;
                box-shadow: 0 6rpx 20rpx rgba(51, 94, 248, 0.3);
                .text_13 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 32rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 45rpx;
                }
            }
        }
        .image_1 {
            width: 750rpx;
            height: 68rpx;
            margin: 1066rpx 0 0 -750rpx;
        }
    }
    .box_5 {
        height: 380rpx;
        background: #335ef8;
        background-size: 100% 100%;
        width: 750rpx;
        position: absolute;
        border-bottom-left-radius: 50% 10%;
        border-bottom-right-radius: 50% 10%;
        left: 0;
        top: 0;
        .box_6 {
            margin-left: 14rpx;
            .text_14 {
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 24rpx;
                font-family: Helvetica;
                font-weight: normal;
                text-align: right;
                white-space: nowrap;
                line-height: 29rpx;
            }
            .image_2 {
                width: 33rpx;
                height: 20rpx;
                margin: 2rpx 0 7rpx 456rpx;
            }
            .image_3 {
                width: 29rpx;
                height: 20rpx;
                margin: 2rpx 0 7rpx 13rpx;
            }
            .image_4 {
                width: 53rpx;
                height: 23rpx;
                margin: 1rpx 0 5rpx 13rpx;
            }
        }
        .box_7 {
            width: 415rpx;
            margin: 51rpx 286rpx 0 0;
            .label_1 {
                width: 40rpx;
                height: 40rpx;
                margin: 2rpx 0 3rpx 0;
            }
            .text_15 {
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 32rpx;
                font-weight: normal;
                text-align: left;
                white-space: nowrap;
                line-height: 45rpx;
            }
        }
        .box_8 {
            height: 334rpx;
            background: linear-gradient(to bottom, #335ef8, #5478ff);
            border-radius: 15rpx;
            background-size: 100% 100%;
            width: 702rpx;
            position: absolute;
            left: 24rpx;
            top: 80rpx;
            padding: 37rpx 30rpx 30rpx 30rpx;
            box-shadow: 0 4rpx 15rpx rgba(51, 94, 248, 0.2);
            .text-wrapper_7 {
                .text_16 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                    margin-top: 3rpx;
                }
                .text_17 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                    margin: 3rpx 0 0 136rpx;
                }
                .text_18 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 32rpx;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: center;
                    white-space: nowrap;
                    line-height: 45rpx;
                    margin-left: 106rpx;
                }
            }
            .text-wrapper_8 {
                margin-top: 28rpx;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .text_19 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 44rpx;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 48rpx;
                }
                .text_20 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                    margin: 2rpx 0 0 0rpx;
                }
                .text_21 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 32rpx;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 45rpx;
                    margin: 2rpx 0 0 36rpx;
                }
            }
            .section_1 {
                width: 642rpx;
                margin-top: 50rpx;
                .text-group_2 {
                    .text_22 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 28rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 40rpx;
                    }
                    .text_23 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 40rpx;
                        font-family: PingFang-SC-Bold;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 48rpx;
                        margin: 8rpx 11rpx 0 0;
                    }
                }
                .text-group_3 {
                    .text_24 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 28rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 40rpx;
                        margin-right: 214rpx;
                    }
                    .text_25 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 40rpx;
                        font-family: PingFang-SC-Bold;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 48rpx;
                        margin-top: 8rpx;
                    }
                }
            }
        }
    }
}
</style>
