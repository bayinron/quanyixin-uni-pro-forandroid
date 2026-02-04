<template>
    <div class="customer_warp">
        <image mode="widthFix" class="customer_bg" src="@/static/img/kkff.png" alt="" />

        <div class="customer_con">
            <div class="customer">
                <div class="cust_warp">
                    <span>Hi~，有什么可以帮您！</span>
                    <p>工作时间9:00-23:00</p>
                    <i @click="handleChat">立即咨询</i>
                </div>

                <div class="cust_warp1">
                    <div @click="goToRmbCharge">
                        <image mode="widthFix" src="@/static/img/rmbcz.png" alt="" />
                        <p>人民币充值</p>
                    </div>
                    <div @click="goToTopup">
                        <image mode="widthFix" src="@/static/img/usdtcz.png" alt="" />
                        <p>USDT充值</p>
                    </div>
                </div>

                <div class="cust_warp2">
                    <div class="question_head">
                        <span :class="{ active: type === 'xw' }" @click="type = 'xw'">猜你想问</span>
                        <span :class="{ active: type === 'jy' }" @click="type = 'jy'">交易相关</span>
                        <span :class="{ active: type === 'zc' }" @click="type = 'zc'">注册相关</span>
                        <span :class="{ active: type === 'dl' }" @click="type = 'dl'">代理政策</span>
                    </div>

                    <div>
                        <template v-if="type === 'xw'">
                            <div v-for="(item, index) in zixun.cai" :key="index" class="cust_warp3" @click="goToDetail(item.con)">
                                <span>{{ index + 1 }}. {{ item.title }}</span>
                                <image mode="widthFix" src="@/static/imgs/jty.png" alt="" />
                            </div>
                        </template>

                        <template v-if="type === 'jy'">
                            <div v-for="(item, index) in zixun.jiaoyi" :key="index" class="cust_warp3" @click="goToDetail(item.con)">
                                <span>{{ index + 1 }}. {{ item.title }}</span>
                                <image mode="widthFix" src="@/static/imgs/jty.png" alt="" />
                            </div>
                        </template>

                        <template v-if="type === 'zc'">
                            <div v-for="(item, index) in zixun.zhuce" :key="index" class="cust_warp3" @click="goToDetail(item.con)">
                                <span>{{ index + 1 }}. {{ item.title }}</span>
                                <image mode="widthFix" src="@/static/imgs/jty.png" alt="" />
                            </div>
                        </template>

                        <template v-if="type === 'dl'">
                            <div v-for="(item, index) in zixun.daili" :key="index" class="cust_warp3" @click="goToDetail(item.con)">
                                <span>{{ index + 1 }}. {{ item.title }}</span>
                                <image mode="widthFix" src="@/static/imgs/jty.png" alt="" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getapistrade } from '../../api/getdata';

interface ZixunItem {
    title: string;
    con: string;
}

interface ZixunData {
    cai: ZixunItem[];
    jiaoyi: ZixunItem[];
    zhuce: ZixunItem[];
    daili: ZixunItem[];
}

const type = ref('xw');
const zixun = ref<ZixunData>({} as ZixunData);

const handleChat = () => {
    // const url = `/api/kefu_url.php?type=chat`;
    // uni.navigateTo({
    //     url: `/pages/chatcon/index?url=${url}`
    // });

    const token = uni.getStorageSync('token');
    const url = `/api/kefu_url.php?token=${token}&type=chat`;
    const encodeUrl = encodeURIComponent(url);
    uni.navigateTo({
        url: '/pages/chatcon/index?url=' + encodeUrl
    });
};

const goToRmbCharge = () => {
    uni.navigateTo({
        url: '/pages/rmbrecharge/index'
    });
};

const goToTopup = () => {
    uni.navigateTo({
        url: '/pages/topup/index'
    });
};

const goToDetail = (con: string) => {
    uni.setStorageSync('zixunContent', con);
    uni.navigateTo({
        url: `/pages/zixun/index?con=${con}`
    });
};

const getData = async () => {
    const res: any = await getapistrade();
    zixun.value = res;
};

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped>

.customer_warp {
  background-color: #f8f8f8;
  height: 100%;
  position: relative;

  .vux-header {
    background: none !important;
  }

  .customer_bg {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .customer_con {
    position: relative;
    top: 200rpx;

    .customer {
      .cust_warp {
        width: 80%;
        margin: auto;

        span {
          font-size: 40rpx;
          color: #eff9ff;
          font-weight: 600;
        }

        i {
          color: #ffffff;
          font-size: 24rpx;
          font-style: normal;
          padding: 20rpx 40rpx;
          text-align: center;
          border-radius: 40rpx;
          margin-top: 80rpx;
          background-color: #16cee5;
          display: block;
          width: 30%;
        }

        p {
          font-size: 28rpx;
          color: #ffffff;
          margin-top: 10rpx;
        }
      }

      .cust_warp1 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-radius: 10px;
        width: 95%;
        margin: 60rpx auto 0;
        padding: 30rpx 0;

        div {
          background: #ffffff;
          margin: 0 20rpx;
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          text-align: center;
          padding: 40rpx 0;
          border-radius: 10rpx;

          image {
            width: 90rpx;
            display: block;
            margin: auto;
            margin-bottom: 20rpx;
          }

          p {
            font-size: 28rpx;
            color: #000000;
            font-weight: 600;
          }
        }
      }

      .cust_warp2 {
        border-radius: 10px;
        background: #ffffff;
        -webkit-box-shadow: 0px 40rpx 80rpx rgba(0, 0, 0, 0.16);
                box-shadow: 0px 40rpx 80rpx rgba(0, 0, 0, 0.16);
        width: 92%;
        margin: 20rpx auto 0;
        padding: 40rpx;

        .question_head {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          border-bottom: 1rpx solid #e5e5e5;
          padding-bottom: 20rpx;
        }

        p {
          font-size: 32rpx;
          color: #000000;
        }

        span {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          text-align: center;
          font-size: 28rpx;
          color: #999999;
        }

        i {
          display: block;
          text-align: center;
          vertical-align: middle;
          font-style: normal;
          margin-top: 20rpx;

          image {
            width: 2%;
            vertical-align: middle;
            margin-left: 10rpx;
          }
        }

        .cust_warp3 {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          border-bottom: 1rpx solid #e5e5e5;
          padding-bottom: 20rpx;
          margin-top: 30rpx;

          span {
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.75);
            -webkit-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            text-align: left;
          }

          image {
            width: 30rpx;
            height: 24rpx;
          }
        }

        .active {
          color: #16cee5 !important;
        }
      }
    }

    .doubt_warp {
      background-color: #ffffff;
      width: 95%;
      margin: 40rpx auto;

      .chat_content_nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        .active {
          font-weight: bold;
          position: relative;
          font-size: 32rpx;

          i {
            display: block;
            width: 60rpx;
            height: 8rpx;
            position: absolute;
            border-radius: 20rpx;
            left: 40rpx;
            background: #4D89F7;
          }
        }

        p {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          text-align: center;
          line-height: 100rpx;
          margin: 0 10rpx;
        }
      }

      .doubt {
        padding: 30rpx 10rpx;
        border-radius: 20rpx;

        .dou_warp {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          text-align: center;
          border-bottom: solid #f2f2f2 2rpx;
          padding-bottom: 20rpx;

          .dou {
            -webkit-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;

            p {
              font-size: 32rpx;
              border-bottom: solid #3A79F7 6rpx;
              padding-bottom: 20rpx;
              font-weight: 700;
            }
          }

          span {
            font-size: 28rpx;
            color: #999999;
            display: inline-block;
            margin-top: 6rpx;
          }
        }

        .consult_warp {
          .consult {
            font-size: 28rpx;
            color: #000000;
            padding-left: 20rpx;
            font-weight: 700;
            padding-bottom: 20rpx;

            p {
              border-bottom: 2rpx solid #F2F2F2;
              line-height: 100rpx;
            }
          }
        }
      }
    }
  }
}
</style>
