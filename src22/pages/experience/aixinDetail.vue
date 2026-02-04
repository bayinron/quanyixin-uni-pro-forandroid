<template>
    <view class="page flex-col">
        <view class="group_1 flex-col">
            <view class="group_4 flex-row">
                <view class="group_5 flex-col">
                    <image mode="widthFix" :src="datas.pro.pic ? prefixUrl + datas.pro.pic : ''" class="pic" style="display: block; width: 72px; height: 72px; border-radius: 5px" />

                </view>
                <view class="text-wrapper_9 flex-col">
                    <text class="text_3">{{ datas.pro.dname }}</text>
                    <rich-text class="paragraph_1" :nodes="datas.pro.jianjie"></rich-text>
                </view>
            </view>
        </view>
        <view class="box_1 flex-col">
            <view class="block_1 flex-col" v-if="datas.pro.days_moneys.length > 0">
                <text class="text_7">垫资周期</text>
                <view class="group_8 flex-row justify-between">
                    <view class="text-wrapper_1 flex-col normalbg" :class="item.open == '0' ? 'no' : formdata.day == item.day ? 'cur' : ''" v-for="(item, index) in datas.pro.days_moneys" @click="sellv(item)">
                        <text class="text_8">{{ item.day }}天&nbsp;{{ item.rate }}%</text>
                    </view>
                </view>
            </view>
            <view class="group_8 flex-col">
                <view class="text-wrapper_10 flex-row justify-between">
                    <text class="text_6">捐助还款</text>
                    <text class="text_7">{{ datas.pro.con }}</text>
                </view>
                <view class="text-wrapper_11 flex-row content-center align-center">
                    <text class="text_8">垫资金额:</text>
                    <text class="text_9">{{ dianzimoney }}元</text>
                </view>
                <view class="text-wrapper_5">
                    <text class="text_10">垫资收益:&nbsp;&nbsp;</text>
                    <text class="text_11">{{ dianzishouyi }}元</text>
                </view>
                <view class="box_2 flex-row justify-between">
                    <view class="text-wrapper_6">
                        <text class="text_12">垫资日期:</text>
                        <text class="text_13">{{ datas.riqi }}</text>
                    </view>
                    <view class="text-wrapper_7">
                        <text class="text_14">到期时间:</text>
                        <text class="text_15">{{ endtime }}</text>
                    </view>
                </view>
            </view>
            <view class="text-wrapper_8 flex-col" @click="gotobuy">
                <text class="text_16">立即参与</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { _buypro, getOneDh } from '../../api/getdata';
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
const datas: any = ref<any>({});
const formdata: any = ref<FormData>({} as FormData);
const msg = ref('');
const show = ref(false);
const zq_name = ref('');
onShow(() => {
    //getData();
});
function selqi(qishu: number) {
    formdata.value.qishu = qishu;
}
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
    return datas.value.my10 > parseInt(datas.value.pro.moneys) ? parseInt(datas.value.pro.moneys) : parseInt(datas.value.my10);
});
//垫资收益
const dianzishouyi = computed(() => {
//     my10=用户余额的整10数
    // moneys_min=本产品最低投资金额
    // monyes=本产品投资最大 金额
    // 收益=投资金额*天数*利率/100

    const dz = datas.value.my10 > parseInt(datas.value.pro.moneys) ? parseInt(datas.value.pro.moneys) : parseInt(datas.value.my10);

    return dz * formdata.value.day * formdata.value.rate * 0.01;
});
function gotobuy() {
    if (datas.value.my10 < datas.value.pro.moneys_min) {
        uni.showToast({
            title: '余额不足，无法垫资',
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
        selqi(res.data.pro.qishu[0]);
        formdata.value.qishu = res.data.pro.qishu[0]; //默认选择1

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
.normalbg {
    background-color: #d9ecf0ac;
    color: #16cee5;
}
.cur {
    background-color: rgba(22, 206, 229, 1) !important;
    color: #fff !important;
}
.page {
    background-color: rgba(239, 249, 255, 1);
    position: relative;
    width: 750rpx;
    height: auto;
    .group_1 {
        background: #16c7e1;

        //矩形底部做一个巨大的弧形
        border-bottom-left-radius: 50% 10%;
        border-bottom-right-radius: 50% 10%;
        position: relative;
        padding: 30rpx 25rpx 286rpx 24rpx;
        .section_1 {
            margin-left: 14rpx;
            .text_1 {
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 24rpx;
                font-family: Helvetica;
                font-weight: normal;
                text-align: right;
                white-space: nowrap;
                line-height: 29rpx;
            }
            .image_1 {
                width: 33rpx;
                height: 20rpx;
                margin: 2rpx 0 7rpx 456rpx;
            }
            .image_2 {
                width: 29rpx;
                height: 20rpx;
                margin: 2rpx 0 7rpx 13rpx;
            }
            .image_3 {
                width: 53rpx;
                height: 23rpx;
                margin: 1rpx 0 5rpx 13rpx;
            }
        }
        .section_2 {
            width: 415rpx;
            margin: 51rpx 286rpx 0 0;
            .label_1 {
                width: 40rpx;
                height: 40rpx;
                margin: 2rpx 0 3rpx 0;
            }
            .text_2 {
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 32rpx;
                font-weight: normal;
                text-align: left;
                white-space: nowrap;
                line-height: 45rpx;
            }
        }
        .group_4 {
            position: absolute;
            left: 24rpx;
            top: 40px;
            width: 702rpx;
            height: 240rpx;
              //渐变色，从上到下#3cd1e7-#92e6f2
              background: linear-gradient(to bottom, #3cd1e7, #92e6f2);
            border-radius: 10rpx;

            background-size: 100% 100%;
            padding: 30rpx 20rpx 30rpx 30rpx;
            display: flex;
            flex-direction: row;
            gap: 20rpx;
            .group_5 {
                border-radius: 10rpx;
                width: 180rpx;
                height: 180rpx;
            }
            .text-wrapper_9 {
                flex: 1;
                margin: 0rpx 0 20rpx 0;
                overflow: hidden;
                
                .text_3 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 32rpx;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 45rpx;
                }
                
                .paragraph_1 {
                    width: 100%;
                    height: auto;
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 24rpx;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    text-align: left;
                    line-height: 40rpx;
                    margin: 25rpx 0 0 6rpx;
                }
            }
        }
    }
    .box_1 {
        padding: 35rpx 24rpx 55rpx 24rpx;
        .group_7 {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 0rpx 0rpx 15rpx 15rpx;
            padding: 30rpx 473rpx 30rpx 30rpx;
            .text_4 {
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
            .text-wrapper_2 {
                background-color: rgba(22, 206, 229, 1);
                border-radius: 8rpx;
                margin-top: 30rpx;
                padding: 17rpx 28rpx 16rpx 30rpx;
                .text_5 {
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
        }
        .group_8 {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            margin-top: 30rpx;
            padding: 30rpx 26rpx 30rpx 24rpx;
            .text-wrapper_1 {
                border-radius: 8rpx;
                padding: 17rpx 28rpx 16rpx 30rpx;
                .text_8 {
                    overflow-wrap: break-word;
                    font-size: 32rpx;
                    font-family: PingFang-SC-Heavy;
                    font-weight: normal;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 45rpx;
                }
            }
            .text-wrapper_10 {
                width: 642rpx;
                margin: 0 4rpx 0 6rpx;
                .text_6 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 32rpx;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 45rpx;
                }
                .text_7 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 28rpx;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
            }
            .text-wrapper_11 {
                width: 380rpx;
                margin: 30rpx 266rpx 0 6rpx;
                .text_8 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 40rpx;
                    margin-top: 11rpx;
                }
                .text_9 {
                    overflow-wrap: break-word;
                    color: rgba(22, 206, 229, 1);
                    font-size: 48rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 67rpx;
                    margin-left: 10rpx;
                }
            }
            .text-wrapper_5 {
                width: 262rpx;
                height: 40rpx;
                overflow-wrap: break-word;
                font-size: 0;
                font-weight: normal;
                text-align: left;
                white-space: nowrap;
                line-height: 40rpx;
                margin: 13rpx 384rpx 0 6rpx;
                .text_10 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
                .text_11 {
                    overflow-wrap: break-word;
                    color: rgba(22, 206, 229, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
            }
            .box_2 {
                width: 652rpx;
                margin-top: 40rpx;
                .text-wrapper_6 {
                    width: 322rpx;
                    height: 33rpx;
                    overflow-wrap: break-word;
                    font-size: 0;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 33rpx;
                    .text_12 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                    .text_13 {
                        overflow-wrap: break-word;
                        color: rgba(85, 85, 85, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_7 {
                    width: 291rpx;
                    height: 33rpx;
                    overflow-wrap: break-word;
                    font-size: 0;
                    font-weight: normal;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 33rpx;
                    .text_14 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                    .text_15 {
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
        .text-wrapper_8 {
            background-color: rgba(22, 206, 229, 1);
            border-radius: 48rpx;
            align-self: center;
            margin-top: 65rpx;
            width: 590rpx;
            padding: 23rpx 231rpx 22rpx 231rpx;
            .text_16 {
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 32rpx;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                text-align: left;
                white-space: nowrap;
                line-height: 45rpx;
            }
        }
    }
    .image_4 {
        width: 750rpx;
        height: 68rpx;
        margin-top: -1rpx;
    }
}
</style>
