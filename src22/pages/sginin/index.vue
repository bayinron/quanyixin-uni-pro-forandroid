<template>
    <MyNavBar title="" />
    <div class="sginin_warp">
        <image mode="widthFix" class="sginin_bg" src="@/static/img/qddk.png" alt="" />
        <div class="sginin_content">
            <div class="sginin">
                <image mode="widthFix" src="@/static/img/qdjx.png" alt="" />
                <div class="sginin_content2" @click="SingIn">签到</div>
            </div>
        </div>
        <div class="qd">
            <div class="hlsj_warp">
                <image mode="widthFix" src="@/static/img/hlsj.png" alt="" class="hlsj"/>
                <text>好礼升级</text>
            </div>
            <view class="section_2 flex-col">
                <view class="grid_4 flex-row">
                    <view class="text-group_1 flex-col" v-for="(item, index) in loopData0" :key="index">
                        <text class="text_13" v-html="item.lanhutext0"></text>
                        <text class="text_14" v-html="item.lanhutext1"></text>
                    </view>
                </view>
            </view>
        </div>
        <div v-if="adv_" class="cj_result">
            <div class="cj_resutl_rt">
                <image mode="widthFix" src="@/static/img/qiandao1.png" alt="" />
                <div>
                    <p class="title">恭喜签到成功</p>
                    <span @click="close">知道啦</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MyNavBar from '@/components/MyNavBar.vue';
import { setfollow, getsign } from '../../api/getdata';

const loopData0 = ref<any[]>([]);

const show = ref(false);
const msg = ref('');
const redpacketdata = ref<any[]>([]);
const notdata = ref(false);
const tan = ref({});
const adv_ = ref(false);
const datacount = ref('');
const page = ref({ PageSize: 10, PageNumber: 1 });
const show_load = ref(false);
const redpacket = ref(0);
const isLoading = ref(false);
const userLeve = ref(1);

onLoad((options: any) => {
    userLeve.value = options.level || 1;
});
onMounted(() => {
    getsign().then((data: any) => {
        console.log(data);
        loopData0.value = Object.keys(data.msg).map((key: any) => ({
            lanhutext0: key,
            lanhutext1: data.msg[key]+'元'
        }));
    });
});

function SingIn() {
    setfollow().then((data: any) => {
        adv_.value = true;
    });
}

function close() {
    adv_.value = false;
}

function withdraw() {
    uni.navigateTo({
        url: '/pages/withdraw'
    });
}
</script>

<style scoped lang="scss">
.sginin_warp {
    min-height: 130vh;
    position: relative;
    padding-top: 20rpx;
    background-color: #eff9ff;

    .sginin_bg {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .sginin_content {
        position: relative;
        margin-top: 600rpx;

        .sginin {
            position: absolute;
            left: 40rpx;

            image {
                width: 90%;
            }
        }
    }

    .sginin_content2 {
        position: absolute;
        z-index: 3;
        text-align: center;
        font-weight: bold;
        background-color: #16cee5;
        width: 200rpx;
        left: 50%;
        margin-left: -120rpx;
        bottom: 24rpx;
        padding: 10rpx;
        border-radius: 50rpx;
        color: #ffffff;
        font-size: 32rpx;
    }

    .qd {
        position: relative;
        top: 500rpx;
        padding-left: 30rpx;
        padding-bottom: 20rpx;
        .hlsj_warp{
            display: flex;
            align-items: center;
            justify-content: center;
            .hlsj {
                width: 330rpx;
                height: 71rpx;
                display: block;
                margin: 0 auto;
                text-align: center;
            }
            text{
                font-size: 28rpx;
                color: white;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .cj_result {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 22;

        .cj_result_bg {
            width: 100%;
            height: 100%;
        }

        .cj_resutl_rt {
            width: 70%;
            position: absolute;
            top: 20%;
            left: 15%;
            z-index: 444;

            image {
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }

            div {
                position: relative;
                top: 340rpx;
                z-index: 222;
                color: #000000;

                .title {
                    text-align: center;
                    font-size: 36rpx;
                    margin-top: 0rpx;
                }

                i {
                    display: block;
                    color: #000000;
                    text-align: center;
                    font-style: normal;
                    font-size: 36rpx;
                    margin-top: 40rpx;
                }

                span {
                    color: #ffffff;
                    display: block;
                    width: 300rpx;
                    text-align: center;
                    font-style: normal;
                    font-size: 36rpx;
                    height: 80rpx;
                    background-color: #16cee5;
                    border-radius: 1000rpx;
                    line-height: 80rpx;
                    margin: 50rpx auto 0 auto;
                }
            }
        }
    }
}


.section_2 {
    box-shadow: 0px 9upx 35upx 0upx rgba(22, 206, 229, 0.22);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 30upx;
    align-self: center;
    margin-top: -21upx;
    width: 690upx;
    padding: 82upx 40upx 61upx 40upx;
    .grid_4 {
      width: 610upx;
      flex-wrap: wrap;
      gap: 20rpx;
      .text-group_1 {
        align-items: center;
        background-color: rgba(239, 249, 255, 1);
        border-radius: 16upx;
        width: 182upx;
        height: 123upx;
        padding: 11upx 60upx 11upx 58upx;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-last-child(-n + 3) {
          margin-bottom: 0;
        }
        .text_13 {
          width: 29upx;
          overflow-wrap: break-word;
          color: rgba(22, 206, 229, 1);
          font-size: 24upx;
          font-weight: normal;
          text-align: right;
          white-space: nowrap;
          line-height: 33upx;
          margin: 0 19upx 0 21upx;
        }
        .text_14 {
          width: 105upx;
          overflow-wrap: break-word;
          color: rgba(0, 0, 0, 1);
          font-size: 40upx;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
          line-height: 56upx;
          margin-top: 12upx;
        }
      }
    }
  }
</style>
