<template>
    <div class="financial_warp1">
        <uni-nav-bar shadow title="理财" backgroundColor="#eff9ff" fixed @clickRight="licaiClick" :border="false">
          <template v-slot:right>
                <view class="font-size-26rpx">
                  理财记录
                </view>
            </template>
        </uni-nav-bar>

 
        <image mode="widthFix" class="customer_bg" src="@/static/img/hbhb.png" alt="" />
        <div class="financial_warp2">
            <div class="financial_warp3">
                <image mode="widthFix" src="@/static/img/jjtg.png" alt="" />
            </div>
            <div class="financial_warp4">
                <div class="financial_warp5">
                    <image mode="widthFix" src="@/static/img/zzc.png" alt="" />
                    <span>总资产(元)</span>
                </div>
                <div class="financial_warp5">
                    <p>{{ info.zongzichan }}</p>
                </div>
            </div>
        </div>
        <div class="financial_warp6">
            <div class="financial_warp7">
                <span>{{ info.yue }}</span>
                <p>账户余额(元)</p>
            </div>
            <div class="financial_warp7">
                <span style="color: rgba(22, 206, 229, 1)">{{ info.zuoshouyi }}</span>
                <p>昨日收益</p>
            </div>
        </div>
        <div class="licai_warp">
            <div class="licai">
                <p>e理财总收益:</p>
                <span>{{ info.zongshouyi }}</span>
            </div>
            <div class="licai">
                <p>e理财金额:</p>
                <span>{{ info.licaiz }}</span>
            </div>
        </div>
        <image mode="widthFix" class="dqlc" src="@/static/img/dqlc.png" alt="" />
        <div class="shouyi_warp">
            <div v-for="(item, index) in datalists" :key="index" class="shouyi" :class="{ active: bianhao === item.bianhao }" @click="buy(item.bianhao, item.shouyi, item.days, item.moneys, item.lname)">
                <p>近七日预计收益</p>
                <span>{{ item.shouyi }}%</span>
                <i>{{ item.lname }}</i>
                <em>
                    理财
                    <span>{{ item.days }}天</span> ｜ <span>{{ item.moneys }}</span> 元起投
                </em>
            </div>
        </div>
        <Toast v-if="show" :message="msg" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import globalTool from '../../utils/globalTool';
const { sendMsg } = globalTool;

import { getGreat, postGreat, getposition, intobalance, outbalance } from '../../api/getdata';


const money = ref('');
const show = ref(false);
const msg = ref('');
const touzi_con = ref(false);
const info = ref<any>({});
const bianhao = ref<string | null>(null);
const moneys = ref<string | null>(null);
const num = ref('');
const timeout_ = ref<number | null>(null);
const datalists = ref<any[]>([]);
const enterMoney = ref('');
const isLoading = ref(false);
const isLoading2 = ref(false);
function licaiClick() {
    uni.navigateTo({
        url: '/pages/licaijilu/index'
    });
}
const getBalance = computed(() => {
    return globalTool.addString([info.value.yue, info.value.yue0, info.value.yue1]);
});
onShow(() => {
    Getdatas();
    Getyuebao();
});

onBeforeUnmount(() => {
    if (timeout_.value) {
        clearInterval(timeout_.value);
        timeout_.value = null;
    }
});

function Getyuebao() {
    getposition().then((data: any) => {
        info.value = data;
    });
}

function Getdatas() {
    getGreat().then((data: any) => {
        datalists.value = data.licai;
    });
}

function buy(bianhao: string, shouyi: string, days: string, moneys: string, lname: string) {
    uni.navigateTo({
        url: `/pages/invest/index?id=${bianhao}&shouyi=${shouyi}&days=${days}&moneys=${moneys}&lname=${lname}`
    });
}

function out() {
    if (!enterMoney.value) {
        sendMsg('请输入转出金额');
    } else {
        outbalance(enterMoney.value).then((res) => {
            sendMsg('转出成功');
            enterMoney.value = '';
            Getyuebao();
        });
    }
}

function into() {
    if (!enterMoney.value) {
        sendMsg('请输入转入金额');
    } else if (!isLoading.value) {
        isLoading.value = true;
        intobalance(enterMoney.value).then((res) => {
            sendMsg('转入成功');
            enterMoney.value = '';
            Getyuebao();
        });
    }
}
</script>

<style scoped lang="scss">

.financial_warp1 {
  min-height: 100vh;
  padding-bottom: 30rpx;
  position: relative;
  background-color: #eff9ff;

  .vux-header {
    background: none !important;
  }

  .vux-header-title {
    color: #000 !important;
  }

  .llcc_warp {
    position: relative;
    z-index: 5555;

    p {
      float: right;
      padding-top: 20rpx;
      padding-right: 40rpx;
    }
  }

  .customer_bg {
    position: absolute;
    top: 40rpx;
    width: 30%;
    left: 560rpx;
  }

  .financial_warp2 {
    margin: 80rpx 40rpx 0;
    position: relative;

    .financial_warp3 {
      image {
        width: 40%;
      }
    }

    .financial_warp4 {
      background-color: #ffffff;
      width: 100%;
      display: block;
      margin: 20rpx auto;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 20rpx;
      border-radius: 10rpx;

      .financial_warp5 {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;

        image {
          width: 15%;
          vertical-align: middle;
          margin-top: 20rpx;
        }

        span {
          color: #000000;
          font-size: 28rpx;
          vertical-align: middle;
        }

        p {
          font-size: 44rpx;
          color: #333333;
          margin-top: 10rpx;
          margin-left: 100rpx;
          font-weight: 600;
        }
      }
    }
  }

  .financial_warp6 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 95%;
    margin: 0 auto;

    .financial_warp7 {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      margin: 0 20rpx;
      background-color: #ffffff;
      padding: 40rpx 60rpx;
      border-radius: 10rpx;

      span {
        color: #333333;
        font-size: 44rpx;
        text-align: center;
        display: block;
      }

      p {
        margin-top: 20rpx;
        color: #000000;
        font-size: 24rpx;
        text-align: center;
      }
    }
  }

  .licai_warp {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #ffffff;
    width: 90%;
    margin: 20rpx auto;
    padding: 20rpx 20rpx;

    .licai {
      margin-left: 30rpx;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;

      p {
        color: #000000;
        font-size: 24rpx;
      }

      span {
        font-size: 44rpx;
      }
    }
  }

  .dqlc {
    width: 30%;
    margin-top: 20rpx;
    margin-left: 40rpx;
  }

  .shouyi_warp {
    width: 95%;
    margin: 40rpx auto;

    .shouyi {
      width: 46%;
      display: inline-block;
      margin: 0 0.4em;
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
  }
}
</style>
