<template>
    <div class="experience_warp">
        <image mode="widthFix" class="record_bg" src="@/static/img/tt.png" alt="" />

        <div class="experience">
            <div class="expe_warp">
                <image mode="widthFix" src="@/static/img/zz.png" alt="" />
            </div>

            <div class="expe">
                <div class="ex">
                    <p>账户余额 (¥)</p>
                    <span>{{ userInfo.benjin }}</span>
                </div>

                <div class="px">
                    <i
                        >账户信息 <span> L{{ xindai.uselevel }}</span></i
                    >
                    <i style="margin: 40rpx auto 0"
                        >垫资方 <span>{{ globalTool.privacyName(xindai.uname) }}</span></i
                    >
                </div>
            </div>
        </div>

        <div class="dianzi_warp">
            <div class="dianzi">
                <p>
                    垫资对象： <span>{{ xindai.bankuser }}</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    垫资类型： <span>{{ lname }}</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    还款账户： <span>{{ xindai.bankcode }}</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    垫资日期： <span>{{ xindai.riqi }}</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    垫资金额：<i style="font-style: normal">{{ xindai.benjin }}</i> <span>利率{{ xindai.lixi }}%</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    本次垫资收益： <span>{{ calculateIncome }}</span>
                </p>
            </div>
            <div class="dianzi">
                <p>
                    垫资天数： <span>{{ xindai.day }}</span>
                </p>
            </div>
        </div>

        <div class="tianjia" @click="handleOrder">
            <p>确认</p>
        </div>

        <div v-if="adv_" class="adv">
            <div class="adv_text" style="top: 20%">
                <image mode="widthFix" class="ggao" src="@/static/img/ddh.png" alt="" />
                <div class="buy_s">
                    <span>- - 用爱心架起桥梁 - -</span>
                    <p>{{ tanchuang.msg }}</p>
                </div>
                <image mode="widthFix" class="close" src="@/static/imgs/close.png" @click="handleClose" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getZhanche, postOrder, getuserdetail,getOrderInfo2 } from '../../api/getdata';
import globalTool from '@/utils/globalTool';

interface UserInfo {
    benjin: string;
    uselevel: number;
    pay_pwd: string;
}

interface XindaiInfo {
    uselevel: number;
    uname: string;
    bankuser: string;
    bankcode: string;
    riqi: string;
    benjin: string;
    lixi: string;
    day: string;
}

interface TanchuangInfo {
    msg: string;
}
const pageid = ref('');
const xindai: any = ref<XindaiInfo>({} as XindaiInfo);
const userInfo = ref<UserInfo>({} as UserInfo);
const tanchuang = ref<TanchuangInfo>({} as TanchuangInfo);
const adv_ = ref(false);
const lname = ref('');

const calculateIncome = computed(() => {
    const { benjin, lixi, day } = xindai.value;
    return (Number(benjin) * (Number(lixi) / 100) * Number(day)).toFixed(2);
});

const formatPhone = (phone: string) => {
    return phone?.substr(0, 3) + '****' + phone?.substr(7);
};

const initData = async () => {
    const res: any = await getuserdetail();
    userInfo.value = res;
    userInfo.value.uselevel = Number(res.uselevel);
    localStorage.setItem('pay_pwd', res.pay_pwd);
};

const getData = async (sx: string) => {
    if(pageid.value == '1'){
        const res: any = await getZhanche(sx);
        xindai.value = res;
    }else{
        const res: any = await getOrderInfo2(pageid.value);
        xindai.value = res;
    }
};

const handleOrder = async () => {
    const res: any = await postOrder(xindai.value.zid, xindai.value.benjin, xindai.value.day);
    tanchuang.value = res;
    adv_.value = true;
};

const handleClose = () => {
    uni.navigateBack();
};

onLoad(async (options: any) => {
    const pages = getCurrentPages();
    const currentPage: any = pages[pages.length - 1];
    if (currentPage?.options) {
        pageid.value = currentPage.options.id;
        const { sx, lname: name } = currentPage.options;
        lname.value = name;
        await initData();
        await getData(sx);
    }
});
</script>

<style lang="scss" scoped>
.experience_warp {
    min-height: 100vh;
    padding-bottom: 50rpx;

    .record_bg {
        position: absolute;
        top: -40rpx;
        width: 100%;
    }

    .experience {
        position: relative;
        margin-top: -150rpx;
        .expe_warp {
            image {
                position: absolute;
                top: 200rpx;
                z-index: 33;
                width: 100%;
                height: 492rpx;
            }
        }

        .expe {
            top: 240rpx;
            position: relative;
            z-index: 55;

            .ex {
                padding-left: 60rpx;

                p {
                    color: #555555;
                    font-size: 26rpx;
                    margin-top: 40rpx;
                }

                span {
                    color: #333333;
                    font-size: 48rpx;
                    font-weight: 600;
                }
            }

            .px {
                i {
                    display: block;
                    font-style: normal;
                    color: #000000;
                    font-size: 28rpx;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    width: 90%;
                    padding: 20rpx;
                    margin: 70rpx auto 0;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;

                    span {
                        display: block;
                    }

                    image {
                        width: 40rpx;
                    }
                }
            }
        }
    }

    .dianzi_warp {
        display: block;
        background-color: #ffffff;
        width: 95%;
        margin: 0 auto;
        position: relative;
        z-index: 77;
        top: 320rpx;
        padding: 20rpx 40rpx;
        border-radius: 30rpx;

        .dianzi {
            margin-top: 40rpx;
            border-bottom: 0.01px solid #f2f2f2;
            padding-bottom: 30rpx;

            p {
                color: #000000;
                font-size: 28rpx;
                font-weight: 700;

                span {
                    float: right;
                }
            }
        }
    }

    .tianjia {
        text-align: center;
        background-color: #16cee5;
        width: 90%;
        display: block;
        margin: 360rpx auto 0;
        color: #ffffff;
        font-size: 32rpx;
        line-height: 90rpx;
        height: 90rpx;
        border-radius: 50rpx;
    }
}
</style>
