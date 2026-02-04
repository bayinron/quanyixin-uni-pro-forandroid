<template>
    <div class="business_warp1">
        <uni-nav-bar color="#fff" title="业务中心" backgroundColor="#16cee5" fixed @clickRight="repaying" :border="false">
            <template v-slot:right>
                <view class="font-size-26rpx"> 我的订单 </view>
            </template>
        </uni-nav-bar>
        <image mode="widthFix" class="customer_bg" src="@/static/img/sybgbg.png" alt="" />
        <div class="business_warp2">
            <p>
                垫资过桥：<br />
                <span> 它如同连接两岸的桥梁，为企业或个人在资金紧张时提供短暂的过渡，用于满足借款人在等待长期资金到位之前的临时资金需求。为那些急需资金短期过渡的企业和个人提供了及时的支持 </span>
            </p>
        </div>
        <image mode="widthFix" class="dzzq" src="@/static/img/dzzq.png" alt="" />
        <div class="financial_warp6 clearfix">
            <div v-for="(item, index) in datas" :key="index" class="financial_warp7" @click="go(item)">
                <image  :src="item.pic ? prefixUrl + item.pic : '@/static/img/dkdzicon.png'" alt="" />

                <div class="flex flex-col pl-40rpx">
                    <div class="jiangjjjj">
                        <span>{{ item.lname }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span>
                            条件：L{{ item.diji }} - L{{ item.gaoji }}
                        </span>
                        <span class="text-red-500">
                            {{ item.suo == 1 ? '等级不符' : item.isok == 1 ? '未开放' : '' }}
                        </span>
                    </div>

                </div>
            </div>

        </div>

        <Toast v-if="show" :message="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getXindaiTab, getＡllZq } from '../../api/getdata';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();

const { prefixUrl } = storeToRefs(userStore);
const datas = ref<any[]>([]);
const msg = ref('');
const show = ref(false);

onShow(() => {
    getData();
});

function repaying() {
    uni.navigateTo({
        url: '/pages/repaying/index'
    });
}

function go(item: any) {
    if (item.suo == 1) {
        uni.showToast({
            title: '等级不符，无法进入',
            duration: 2000,
            icon: 'none'
        });
        return;
    }
    if (item.isok == 1) {
        return uni.showToast({
            title: '未开放，无法进入',
            duration: 2000,
            icon: 'none'
        });
    }
    /**
     * 贷款垫资 id 1
     * 房贷 id 2 
     * 爱心 id 3
     * 车贷 id 4
     * 企业 id 5
     * 新 贷款垫资 id 6
     * 新贷款、企业、房贷一个页面
     * 爱心单独一个页面、
     * 车贷 单独一个页面
     */
    if (item.id == 1 ) {
        uni.navigateTo({
            url: `/pages/experience/index?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    } else if(item.id == 2 || item.id == 5 || item.id == 6){
        uni.navigateTo({
            url: `/pages/experience/fangList?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    }else{
        uni.navigateTo({
            url: `/pages/experience/cheList?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    }
}

function getData() {
    getＡllZq().then((data: any) => {
        datas.value = data.data;
    });
}
</script>
<style scoped lang="scss">
.business_warp1 {
    background-color: #eff9ff;
    min-height: 100vh;
    position: relative;

    .vux-header {
        background: none !important;
    }

    .customer_bg {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .business_warp2 {
        position: relative;
        z-index: 5;
        background-color: #ffffff;
        top: 50rpx;
        margin: 0 40rpx;
        font-size: 32rpx;
        padding: 20rpx 30rpx;
        border-radius: 10rpx;

        p {
            color: #000000;
            font-weight: 600;

            span {
                color: #666666;
                font-size: 28rpx;
            }
        }
    }

    .dzzq {
        width: 40%;
        margin-bottom: 20rpx;
        margin-top: 100rpx;
        margin-left: 40rpx;
    }

    .financial_warp6 {
        width: 95%;
        margin: 0 auto;

        .financial_warp7 {
            background-color: #ffffff;
            padding: 40rpx 60rpx;
            border-radius: 10rpx;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin: 20rpx 0;

            image {
                width: 120rpx;
                height: 120rpx;
                display: block;
            }

            .jiangjjjj {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
               
                display: flex;
                flex-direction: column;
                // justify-content: center;
                span {
                    color: #000000;
                    font-size: 36rpx;
                    font-weight: 700;
                }

                p {
                    color: #555555;
                    font-size: 24rpx;
                    padding-top: 16rpx;
                }
                .dectxt {
                    font-size: 28rpx;
                    color: #666666;
                    margin-top: 10rpx;
                    font-weight: 400;
                }
            }
        }
    }
}
</style>
