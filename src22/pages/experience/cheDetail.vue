<template>
    <view class="page flex-col">
        <view class="box_1 flex-col">
            <view class="box_4 flex-col">
                <view class="group_4 flex-row">
                    <text class="text_3">车贷过桥信息</text>
                    <view class="image-text_5 flex-row justify-between">
                        <image mode="widthFix" class="label_2" src="@/static/img/gou1.png" />
                        <text class="text-group_1">征信证明</text>
                    </view>
                    <view class="image-text_6 flex-row justify-between">
                        <image mode="widthFix" class="label_3" src="@/static/img/gou1.png" />
                        <text class="text-group_2">工作证明</text>
                    </view>
                </view>
                <view class="group_5 flex-row">
                    <text class="text_4">{{ datas.pro.dname }}</text>
                    <view class="flex-row">
                        <view class="image-text_7 flex-row justify-between">
                            <image mode="widthFix" class="label_4" src="@/static/img/gou1.png" />
                            <text class="text-group_3">身份证明</text>
                        </view>
                        <view class="image-text_8 flex-row justify-between">
                            <image mode="widthFix" class="label_5" src="@/static/img/gou1.png" />
                            <text class="text-group_4">资产证明</text>
                        </view>
                    </view>
                </view>
                <view class="group_6 flex-row">
                    <view class="text-group_7 flex-col">
                        <text class="text_5">还款账户</text>
                        <text class="text_6">{{ datas.bank.bankcode }}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="group_7 flex-col">
            <view class="block_1 flex-col" v-if="datas?.pro?.days_moneys?.length > 0">
                <text class="text_7">垫资周期</text>
                <view class="group_8 flex-row justify-between">
                    <view class="text-wrapper_1 flex-col normalbg" :class="item.open == '0' ? 'no' : formdata.day == item.day ? 'cur' : ''" v-for="(item, index) in datas.pro.days_moneys" @click="sellv(item)">
                        <text class="text_8">{{ item.day }}天&nbsp;{{ item.rate }}%</text>
                    </view>
                </view>
            </view>
            <view class="block_2 flex-col">
                <text class="text_11">到期返本返利</text>
                <view class="text-group_8 flex-col">
                    <text class="text_12">垫资金额</text>
                    <text class="text_13">{{ dianzimoney }}元</text>
                    <view class="text-wrapper_4">
                        <text class="text_14">垫资收益:</text>
                        <text class="text_15">{{ dianzishouyi }}元</text>
                    </view>
                    <view class="text-wrapper_4">
                        <text class="text_14">余额:</text>
                        <text class="text_15">{{ datas.user.benjin }}元</text>
                    </view>
                </view>
                <view class="section_3 flex-row justify-between">
                    <view class="text-wrapper_5">
                        <text class="text_16">垫资日期:</text>
                        <text class="text_17">{{ datas.riqi }}</text>
                    </view>
                    <view class="text-wrapper_6">
                        <text class="text_18">到期时间:</text>
                        <text class="text_19">{{ endtime }}</text>
                    </view>
                </view>
            </view>
            <view class="block_4 flex-col">
                <view class="block_7 flex-row" v-if="datas.pro.qishu.length > 0">
                    <view class="text-wrapper_7 flex-col" :class="formdata.qishu == item ? 'cur' : 'normalbg'" v-for="(item, index) in datas.pro.qishu" @click="selqi(item)">
                        <text class="text_20">{{ item }}期</text>
                    </view>
                </view>
                <div class="" v-else>余额不足</div>
            </view>
            <view class="text-wrapper_17 flex-col" @click="gotobuy">
                <text class="text_30">立即参与</text>
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
    if(datas.value.my10 < parseInt(datas.value.pro.moneys_min)){
        return 0;
    }else{
        return parseInt(datas.value.pro.moneys_min) * formdata.value.qishu;
    }
});
//垫资收益
const dianzishouyi = computed(() => {
    //     my10=用户余额的整10数
    // moneys_min=本产品最低投资金额
    // monyes=本产品投资最大 金额
    // 收益=投资金额*天数*利率/100

    const dz = parseInt(datas.value.pro.moneys_min) * formdata.value.qishu;

    return dz * formdata.value.day * formdata.value.rate * 0.01;
});
function gotobuy() {
    let form = formdata.value;
    if(datas.value.my10 < parseInt(datas.value.pro.moneys_min)){
        uni.showToast({
            title: '余额不足',
            icon: 'none'
        });
        return;
    }
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
    background-color: #d9ecf0ac !important;
    color: #16cee5 !important;
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
    .box_1 {
        background-color: #16c7e1;
        //矩形底部做一个巨大的弧形
        border-bottom-left-radius: 50% 20%;
        border-bottom-right-radius: 50% 20%;
        background-size: 100% 100%;
        position: relative;
        padding: 30rpx 25rpx 365rpx 24rpx;
        .block_5 {
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
        .block_6 {
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
        .box_4 {
            height: 326rpx;
            background-color: #6ddeee;
            background-size: 100% 100%;
            border-radius: 10rpx;
            width: 702rpx;
            position: absolute;
            left: 24rpx;
            top: 80rpx;
            padding: 30rpx 30rpx 42rpx 30rpx;
            .group_4 {
                .text_3 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 28rpx;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
                .image-text_5 {
                    width: 128rpx;
                    margin: 0 0 7rpx 188rpx;
                    .label_2 {
                        width: 22rpx;
                        height: 22rpx;
                        margin: 6rpx 0 5rpx 0;
                    }
                    .text-group_1 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 24rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .image-text_6 {
                    width: 128rpx;
                    margin: 0 0 7rpx 30rpx;
                    .label_3 {
                        width: 22rpx;
                        height: 22rpx;
                        margin: 6rpx 0 5rpx 0;
                    }
                    .text-group_2 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 24rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
            }
            .group_5 {
                margin-top: 30rpx;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .text_4 {
                    overflow-wrap: break-word;
                    color: rgba(255, 255, 255, 1);
                    font-size: 44rpx;
                    font-family: PingFang-SC-Bold;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 48rpx;
                }
                .image-text_7 {
                    width: 128rpx;
                    margin: 4rpx 0 11rpx 0rpx;
                    .label_4 {
                        width: 22rpx;
                        height: 22rpx;
                        margin: 6rpx 0 5rpx 0;
                    }
                    .text-group_3 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 24rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .image-text_8 {
                    width: 128rpx;
                    margin: 4rpx 0 11rpx 30rpx;
                    .label_5 {
                        width: 22rpx;
                        height: 22rpx;
                        margin: 6rpx 0 5rpx 0;
                    }
                    .text-group_4 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 24rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
            }
            .group_6 {
                margin: 40rpx 316rpx 0 0;
                .text-group_7 {
                    .text_5 {
                        overflow-wrap: break-word;
                        color: rgba(255, 255, 255, 1);
                        font-size: 28rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 40rpx;
                        margin-right: 214rpx;
                    }
                    .text_6 {
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
    .group_7 {
        padding: 30rpx 24rpx 61rpx 24rpx;
        .block_1 {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 0rpx 0rpx 15rpx 15rpx;
            padding: 30rpx 31rpx 30rpx 30rpx;
            .text_7 {
                overflow-wrap: break-word;
                color: rgba(0, 0, 0, 1);
                font-size: 32rpx;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                text-align: left;
                white-space: nowrap;
                line-height: 45rpx;
                margin-right: 513rpx;
            }
            .group_8 {
                width: 641rpx;
                margin-top: 30rpx;
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
                .text-wrapper_2 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    padding: 17rpx 22rpx 16rpx 23rpx;
                    .text_9 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 0.66);
                        font-size: 32rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 45rpx;
                    }
                }
                .text-wrapper_3 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    padding: 17rpx 17rpx 16rpx 22rpx;
                    .text_10 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 0.66);
                        font-size: 32rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 45rpx;
                    }
                }
            }
        }
        .block_2 {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            margin-top: 24rpx;
            padding: 26rpx 26rpx 30rpx 24rpx;
            .text_11 {
                overflow-wrap: break-word;
                color: rgba(22, 206, 229, 1);
                font-size: 24rpx;
                font-family: HanziPenSC-W3;
                font-weight: normal;
                text-align: left;
                white-space: nowrap;
                line-height: 33rpx;
                margin: 0 250rpx 0 253rpx;
            }
            .text-group_8 {
                margin: 38rpx 207rpx 0 210rpx;
                .text_12 {
                    overflow-wrap: break-word;
                    color: rgba(153, 153, 153, 1);
                    font-size: 24rpx;
                    font-weight: normal;
                    white-space: nowrap;
                    line-height: 33rpx;
                    align-self: center;
                }
                .text_13 {
                    overflow-wrap: break-word;
                    color: rgba(0, 0, 0, 1);
                    font-size: 48rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    white-space: nowrap;
                    line-height: 67rpx;
                    text-align: center;
                }
                .text-wrapper_4 {
                    width: 209rpx;
                    height: 36rpx;
                    overflow-wrap: break-word;
                    font-size: 0;
                    font-weight: normal;
                    text-align: center;
                    white-space: nowrap;
                    line-height: 36rpx;
                    align-self: center;
                    margin-top: 16rpx;
                    .text_14 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 36rpx;
                    }
                    .text_15 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-family: PingFangSC-Medium;
                        font-weight: 500;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 36rpx;
                    }
                }
            }
            .section_3 {
                width: 652rpx;
                margin-top: 33rpx;
                .text-wrapper_5 {
                    width: 322rpx;
                    height: 33rpx;
                    overflow-wrap: break-word;
                    font-size: 0;
                    font-weight: normal;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 33rpx;
                    .text_16 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                    .text_17 {
                        overflow-wrap: break-word;
                        color: rgba(85, 85, 85, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_6 {
                    width: 291rpx;
                    height: 33rpx;
                    overflow-wrap: break-word;
                    font-size: 0;
                    font-weight: normal;
                    text-align: right;
                    white-space: nowrap;
                    line-height: 33rpx;
                    .text_18 {
                        overflow-wrap: break-word;
                        color: rgba(0, 0, 0, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: left;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                    .text_19 {
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
        .block_4 {
            background-color: rgba(255, 255, 255, 1);
            border-radius: 0rpx 0rpx 15rpx 15rpx;
            margin-top: 24rpx;
            padding: 24rpx 24rpx 25rpx 26rpx;
            .block_7 {
                display: flex;
                flex-wrap: wrap;
                gap: 13rpx;
                .text-wrapper_7 {
                    background-color: rgba(22, 206, 229, 1);
                    border-radius: 8rpx;
                    width: 120rpx;
                    height: 52rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .text_20 {
                        overflow-wrap: break-word;
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: center;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_8 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 11rpx 42rpx 12rpx 42rpx;
                    .text_21 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_9 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 11rpx 42rpx 12rpx 42rpx;
                    .text_22 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_10 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 11rpx 42rpx 12rpx 42rpx;
                    .text_23 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_11 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 10rpx;
                    padding: 11rpx 43rpx 12rpx 41rpx;
                    .text_24 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
            }
            .block_8 {
                margin-top: 10rpx;
                .text-wrapper_12 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    padding: 12rpx 42rpx 11rpx 42rpx;
                    .text_25 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_13 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 12rpx 43rpx 11rpx 42rpx;
                    .text_26 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_14 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 12rpx 42rpx 11rpx 42rpx;
                    .text_27 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_15 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 9rpx;
                    padding: 12rpx 42rpx 11rpx 42rpx;
                    .text_28 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
                .text-wrapper_16 {
                    background-color: rgba(22, 206, 229, 0.1);
                    border-radius: 8rpx;
                    margin-left: 10rpx;
                    padding: 12rpx 37rpx 11rpx 37rpx;
                    .text_29 {
                        overflow-wrap: break-word;
                        color: rgba(22, 206, 229, 1);
                        font-size: 24rpx;
                        font-weight: normal;
                        text-align: right;
                        white-space: nowrap;
                        line-height: 33rpx;
                    }
                }
            }
        }
        .text-wrapper_17 {
            background-color: rgba(22, 206, 229, 1);
            border-radius: 48rpx;
            align-self: center;
            margin-top: 79rpx;
            width: 590rpx;
            padding: 23rpx 231rpx 22rpx 231rpx;
            .text_30 {
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
