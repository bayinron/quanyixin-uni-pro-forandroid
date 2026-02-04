<template>
    <div class="mall_warp1">
        <uni-nav-bar color="#fff" title="积分商城" backgroundColor="#16cee5" fixed @clickRight="record" :border="false">
            <template v-slot:right>
                <view class="font-size-26rpx">
                    积分记录
                </view>
            </template>
        </uni-nav-bar>

        <image mode="widthFix" class="customer_bg" src="@/static/img/sybgbg.png" alt="" />
        <div class="mall">
            <div class="integral-container">
                <!-- 积分卡片 -->
                <div class="integral-card bigdiv">
                    <div class="title">我的积分</div>
                    <div class="score">{{ shopInfo.jifen }}</div>
                </div>

                <!-- 签到打卡卡片 -->
                <div class="integral-card smalldiv" @click="signin">
                    <image mode="widthFix" src="@/static/img/qianda.png" class="icon"  alt="签到" />
                    <div class="text">签到打卡</div>
                </div>

                <!-- 积分规则卡片 -->
                <div class="integral-card smalldiv" @click="integral">
                    <image src="@/static/img/qianda.png" class="icon" mode="scaleToFill" alt="签到" />
                    <div class="text">积分规则</div>
                </div>
            </div>
            <div class="mall_telte">
                <image mode="widthFix" src="@/static/img/jxhl.png" alt="" />
            </div>
            <div class="haoli_warp">
                <div class="haoli">
                    <image mode="widthFix" src="@/static/img/sb.png" alt="" />
                    <div class="hao">
                        <div class="h">
                            <image mode="widthFix" src="@/static/img/dn.png" alt="" />
                        </div>
                        <div class="h">
                            <image mode="widthFix" src="@/static/img/sjsj.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="tai">
                <image mode="widthFix" src="@/static/img/tjs.png" alt="" />
            </div>
        </div>
        <div class="mall_content">
            <div v-for="(item, index) in shopInfo.shop" :key="index">
                <image mode="widthFix" class="mall5" :src="prefixUrl + item.shoppic" />
                <i>{{ item.shopname }}</i>
                <p>{{ item.danjia }}积分</p>
                <span @click="reqPostShop(item)">立即兑换</span>
            </div>
        </div>
        <div v-if="adv_" class="adv">
            <div class="adv_text" style="top: 20%">
                <image mode="widthFix" class="ggao" src="@/static/img/invest_tan.png" alt="" />
                <div class="buy_s" v-if="clickItem && clickItem.shopname.includes('红包')">
                    <p>兑换成功</p>
                    <!-- <span>- 请耐心等待 -</span> -->
                </div>
                <div class="buy_s" v-else>
                    <p>兑换成功,请等待发货</p>
                    <span>- 请耐心等待 -</span>
                </div>
                <image mode="widthFix" class="close" src="@/static/imgs/close.png" @click="close" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { getShop, postShop } from '../../api/getdata';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();

const { prefixUrl } = storeToRefs(userStore);
const title = ref('');
const news_con = ref('');
const type = ref(null);
const shopInfo = ref<any>({});
const tan = ref({});
const adv_ = ref(false);
const show = ref(false);
const slides = ref([]);
const msg = ref('');
const qiandaoLoading = ref(false);
const daihuanLoading = ref(false);
const yaoqingLoading = ref(false);
const fuliLoading = ref(false);
const isLoading = ref(false);
const tanchuang = ref({});

function record() {
    uni.navigateTo({
        url: '/pages/record/index'
    });
}
function signin() {
    uni.navigateTo({
        url: '/pages/sginin/index'
    });
}
function integral() {
    uni.navigateTo({
        url: '/pages/integral/index'
    });
}
onShow(() => {
    GetData();
});

function GetData() {
    getShop().then((data: any) => {
        shopInfo.value = data;
        tanchuang.value = data;
    });
}

function close() {
    adv_.value = false;
}
const clickItem = ref<any>(null);
function reqPostShop(item: any) {
    clickItem.value = item;
    postShop(item.id).then((data: any) => {
        console.log("data======",data);
        adv_.value = true;
        tan.value = data;
    })
}
</script>

<style scoped lang="scss">
.mall_warp1 {
    width: 100%;
    background-color: #eff9ff;
    position: relative;

    .customer_bg {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }

    .mall {
        position: relative;
        z-index: 2;
        top: 0rpx;
    }

    .mall_telte {
        position: relative;
        padding-left: 20rpx;
        bottom: 20rpx;

        image {
            width: 40%;
        }
    }

    .haoli_warp {
        display: block;
        margin: 0 auto;
        width: 95%;

        .haoli {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            image {
                width: 55%;
            }

            .hao {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;

                .h image {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    width: 100%;
                }
            }
        }
    }

    .tai image {
        width: 95%;
        display: block;
        margin: 0 auto;
    }

    .mall_content {
        width: 94%;
        padding-bottom: 10rpx;
        margin: 10rpx auto;
        display: flex;
        flex-wrap: wrap;

        div {
            height: 500rpx;
            border-radius: 8px;
            background: #ffffff;
            -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

            width: 47%;
            margin: 1.5%;
            padding: 40rpx;

            .mall5 {
                width: 200rpx;
                display: block;
                margin: auto;
            }

            i {
                display: block;
                font-style: normal;
                color: #000000;
                font-weight: 600;
                text-align: center;
            }

            p {
                font-size: 32rpx;
                color: #f92d3c;
                font-weight: bold;
                text-align: center;
                margin: 20rpx 0;
            }

            span {
                border-radius: 25px;
                background-color: #16cee5;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                padding: 10rpx;
                width: 220rpx;
                display: block;
                font-size: 28rpx;
                color: #ffffff;
                text-align: center;
                margin: auto;
            }
        }
    }
}

.integral-container {
    width: 750rpx;
    padding: 0rpx 20rpx;
    margin-bottom: 40rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    // background: #f5f7fa;
    .bigdiv {
        width: 340rpx;
        background: #ffffff;
        height: 200rpx;
    }
    .smalldiv {
        width: 170rpx;
        height: 210rpx;
    }
    .integral-card {
        border-radius: 16rpx;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        // 第一个卡片特殊样式

        .title {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 16rpx;
        }

        .score {
            font-size: 48rpx;
            font-weight: bold;
            color: #333;
        }

        // 第二个和第三个卡片的共同样式

        .icon {
            width: 180rpx;
            height: 210rpx;
            position: absolute;
            z-index: 0;
        }

        .text {
            font-size: 28rpx;
            color: #333;
            position: absolute;
            z-index: 1;
            bottom: 20rpx;
        }
    }
}


.adv {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 600;

  .adv_image {
    width: 90%;
    position: absolute;
    top: 16%;
    left: 5%;
    z-index: 888;
  }

  .adv_text {
    color: #333;
    position: absolute;
    top: 30%;
    width: 100%;
    border-radius: 6px;
    font-size: 32rpx;

    .ggao {
      width: 86%;
      position: absolute;
      top: 0;
      left: 7%;
    }

    .buy_s {
      position: relative;
      display: block;
      text-align: center;
      padding-top: 360rpx;

      p {
        font-size: 44rpx;
        color: #000000;
      }

      span {
        font-size: 32rpx;
        color: #727272;
        margin-top: 20rpx;
      }
    }

    .adv_content {
      height: 400rpx;
      width: 65%;
      margin: 320rpx auto 60rpx;
      overflow: scroll;
      position: relative;
      z-index: 999999;
      font-weight: bold;
      color: #000;
    }

    .close {
      display: block;
      width: 100rpx;
      position: relative;
      margin: 240rpx auto 0;
    }
  }
}
</style>
