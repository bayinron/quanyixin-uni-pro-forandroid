<template>
    <MyNavBar title="" />
    <div class="invite_warp">
        <image mode="widthFix" class="yqbg" src="@/static/img/yqhy.png" alt="" />
        <div class="invite">
            <div class="invite2">
                <image mode="widthFix" src="@/static/img/bbbby.png" alt="" />
            </div>
            <div class="er_warp">
                <div class="er">
                    <image mode="widthFix" class="ewm" src="@/static/img/ewm.png" alt="" />
                </div>
            </div>
            <div class="href_add">
                <p>邀请好友越多，奖励越多</p>
                <!-- <div ref="qrCodeUrl"></div> -->
                <canvas id="qrcode" canvas-id="qrcode" style="width: 120px; height: 120px; margin: 0 auto"></canvas>

                <span style="text-align: center; display: inline-block; width: 710rpx; margin: 0 auto">{{ spreadurl }}</span>
            </div>
            <div class="invite_yao code-copy-btn" :data-clipboard-text="spreadurl" @click="copyCode">复制链接发送好友</div>
        </div>
        <Toast v-if="show" :message="msg" type="text" time="1500" width="200px" position="middle" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import sendMsg from '../../utils/globalTool';
import { getInvest } from '../../api/getdata';
import UQRCode from 'uqrcodejs'; // npm install uqrcodejs
import globalTool from '../../utils/globalTool';
import MyNavBar from '@/components/MyNavBar.vue';

const show = ref(false);
const msg = ref<string | null>(null);
const spreadurl = ref('');
const pic = ref('');
const copyCode = () => {
    globalTool.copyText(spreadurl.value, '已复制到剪贴板');
};
const creatQrCode = () => {
    // 获取uQRCode实例
    var qr = new UQRCode();
    // 设置二维码内容
    qr.data = spreadurl.value;
    // 设置二维码大小，必须与canvas设置的宽高一致
    qr.size = 120;
    // 调用制作二维码方法
    qr.make();
    // 获取canvas上下文
    var canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
    // 设置uQRCode实例的canvas上下文
    qr.canvasContext = canvasContext;
    // 调用绘制方法将二维码图案绘制到canvas上
    qr.drawCanvas();
};

onMounted(() => {
    getData();
});

function getData() {
    getInvest().then((data: any) => {
        spreadurl.value = `${globalTool.getRuntimeOrigin()}/#/pages/register/index?bianhao=${data.bianhao}`;
        creatQrCode();
    });
}
</script>

<style scoped lang="scss">
.invite_warp {
    position: relative;
    min-height: 100vh;
    padding-bottom: 100rpx;
    background-color: #08e0f4;
    .vux-header {
        background: none !important;
    }

    .yqbg {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .invite {
        position: relative;
        padding-top: 600rpx;

        .invite2 {
            width: 90%;
            margin: auto;

            image {
                width: 100%;
            }
        }

        .er_warp {
            position: relative;
            z-index: 55;

            .er {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;

                .ewm {
                    width: 90%;
                    display: block;
                    margin: auto;
                }
            }

            .qrcode {
                padding-top: 180rpx;

                image {
                    display: block;
                    margin: auto;
                }
            }
        }

        .href_add {
            position: relative;
            z-index: 200;
            padding-top: 140rpx;

            p {
                text-align: center;
                padding-bottom: 40rpx;
            }

            div {
                width: 120px;
                display: block;
                margin: 0 auto;
                z-index: 222;
            }
        }

        .invite_yao {
            position: relative;
            z-index: 333;
            background-color: #16cee5;
            width: 80%;
            margin: auto;
            line-height: 80rpx;
            border-radius: 100rpx;
            text-align: center;
            margin-top: 40rpx;
            color: #fff;
        }
    }
}
</style>
