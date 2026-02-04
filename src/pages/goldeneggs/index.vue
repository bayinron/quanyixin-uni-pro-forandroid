<template>
    <view class="goldeneggs_container">
        <MyNavBar title="福利活动" />
        <view class="goldeneggs_warp">
            <!-- <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回"
                            rightText="设置" title="自定义颜色" /> -->
            <!-- <uni-nav-bar title="金蛋" left-icon="back" :statusBar="false" :fixed="true" :shadow="false" @clickLeft="back" color="#fff" :order="false" background-color="transparent" style="background-color: transparent;" /> -->
            <image class="goldeneggs_bg" src="@/static/img/zjdbg.png" mode="widthFix" />
            <image class="goldeneggs_btn" src="@/static/img/zjdbtn.png" mode="widthFix" @click="ok"/>
    
            <!-- 获奖弹窗 -->
            <div v-if="result" class="cj_result">
                <div class="cj_resutl_rt">
                    <img src="@/static/img/jiangli.png" alt="" />
                    <div>
                        <p class="title">恭喜您获得</p>
                        <view class="name">{{ result_con.jiangpin }}</view>
                        <view class="btn" @click="result = false">立即领取</view>
                    </div>
                </div>
            </div>
        </view>
    </view>
</template>

<script setup lang="ts">
import globalTool from '@/utils/globalTool';
import MyNavBar from '@/components/MyNavBar.vue';
const back = () => {
    globalTool.back();
};
import { ref, reactive, onActivated } from 'vue';
import { getCj, postCj } from '@/api/index';

const title = ref('');
const con = ref('');
const type = ref(null);
const check = ref(4);
const result = ref(false);
const isLoading = ref(false);

const result_con = ref<any>({
    jiangpin: '',
    level: ''
});

const show = ref(false);
const msg = ref('18现金红包');
const msgType = ref('error');

const getData = () => {
    getCj().then((res: any) => {
        const data = res.data;
        console.log(data);
        con.value = data;
    });
};

const ok = () => {
    if (!!isLoading.value) {
        return;
    }
    isLoading.value = true;

    postCj().then((res: any) => {
        isLoading.value = false;
        result.value = true;
        result_con.value = res;
        getData();
    }).finally(() => {
        uni.hideLoading();

        isLoading.value = false;
    });
};

onShow(() => {
    getData();
});
</script>

<style lang="scss" scoped>
.goldeneggs_container{

    min-height: 100vh;
    background-color: #0e1a4c;
}
.goldeneggs_warp {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: relative;
    .goldeneggs_bg {
        width: 100%;
        height: 100%;

        // position: absolute;
        // top: 0;
        // left: 0;
    }
    .goldeneggs_btn {
        width: 612rpx;
        height: 100%;
        position: absolute;
        top: 56.5%;
        left: 50%;
        transform: translate(-50%, -50%);
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

            img {
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
                    margin-top: 20rpx;
                }
                .name {
                    color: red;
                    text-align: center;
                    font-size: 36rpx;
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
                .btn {
                    margin: 50rpx auto 0 auto;
                    width: 300rpx;
                    height: 80rpx;
                    background-color: #432c0e;
                    border-radius: 1000rpx;
                    line-height: 80rpx;
                    color: #ffffff;
                    text-align: center;
                }
            }
        }
    }
}
</style>
