<template>
    <MyNavBar title="" />
    <div class="goldeneggs">
        <image mode="widthFix" class="circle" src="@/static/img/hhhh.png" alt="" />
        <div class="goldeneggs1">
            <div class="choujiang">今日剩余抽奖 {{ chou }} 次数</div>
            <image mode="widthFix" class="click_zh" src="@/static/img/click_.png" alt="" @click="ok" />
            <div @click="smoke">
                <span class="jiluchou">查看抽奖记录</span>
            </div>
            <div style="text-align: center;font-size: 32rpx;font-weight: bolder;margin-top: 20rpx;">奖品说明</div>
            <div class="goldeneggs3">
                <p v-for="(item, index) in con" :key="index">{{ item.jlevel }}:{{ item.jiangname }}</p>
            </div>
        </div>
        <div v-if="result" class="cj_result">
            <div class="cj_resutl_rt">
                <image mode="widthFix" src="@/static/img/jiangli.png" alt="" />
                <div>
                    <p class="title">恭喜您获得</p>
                    <i>{{ result_con.level }}{{ result_con.jiangpin }}</i>
                    <span @click="result = false">立即领取</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { getCj, postCj } from '../../api/getdata';
import MyNavBar from '@/components/MyNavBar.vue';

const title = ref('');
const con = ref<any[]>([]);
const type = ref<number | null>(null);
const check = ref(4);
const result = ref(false);
const isLoading = ref(false);
const result_con = ref<any>({});
const show = ref(false);
const msg = ref('');
const chou = ref(0);
const click = ref(false);
const loading = ref(false);
const lang = ref('zh');

onMounted(() => {
    GetData();
});
function smoke() {
    uni.navigateTo({
        url: '/pages/smoke/index'
    });
}

function GetData() {
    getCj().then((data: any) => {
        con.value = data.jiangpin;
        chou.value = data.chous;
    });
}

function ok() {
    postCj().then((data: any) => {
        result.value = true;
        result_con.value = data;
        GetData();
    });
}

watch(
    check,
    () => {
        ok();
    },
    { deep: true }
);
</script>

<style scoped lang="scss">
.goldeneggs {
    width: 100%;
    position: relative;
    min-height: 100vh;
    padding-bottom: 100rpx;
    background-color: #08e0f4;

    .vux-header {
        background: none !important;
    }

    .circle {
        width: 100%;
        left: 0;
        position: absolute;
        top: 0;
    }

    .goldeneggs1 {
        position: relative;
        padding-top: 520rpx;

        .choujiang {
            color: #fbedac;
            font-size: 32rpx;
            text-align: center;
        }

        .click_zh {
            width: 86%;
            display: block;
            margin: 50rpx auto 0;
            left: 7%;
        }

        .jiluchou {
            display: block;
            width: 240rpx;
            margin: 70rpx auto 0;
            text-align: center;
            line-height: 80rpx;
            font-size: 28rpx;
            color: #fff;
            border: 2rpx solid #fff;
            border-radius: 10rpx;
        }

        .goldeneggs3 {
            border-radius: 5px;
            width: 90%;
            margin: 10rpx auto 0;
            display: flex;
            flex-wrap: wrap;
            div {
                color: #000;
                font-size: 32rpx;
                font-weight: bolder;
                text-align: center;
                margin: 20rpx auto;
            }

            p {
                
                width: 47%;
                padding-left: 20rpx;
                font-size: 30rpx;
                color: #000000;
                font-weight: bold;
                margin-top: 20rpx;
                text-align: left;
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
                    margin-top: 20rpx;
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
</style>
