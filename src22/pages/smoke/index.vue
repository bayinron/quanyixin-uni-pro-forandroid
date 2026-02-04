<template>
    <div class="smoke_warp">
        <div class="smoke1">
            <div class="smoke2">
                <div class="smoke3">
                    <p>抽奖结果</p>
                </div>
                <div class="smoke3">
                    <p>状态</p>
                </div>
                <div class="smoke3">
                    <p>时间</p>
                </div>
            </div>

            <div v-for="(item, index) in listt" :key="index" class="smoke4">
                <div class="smoke5">
                    <p>{{ item.jlevel }}{{ item.jname }}</p>
                </div>
                <div class="smoke5">
                    <p>{{ item.isok }}</p>
                </div>
                <div class="smoke5">
                    <p>{{ item.addtime }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getLotte } from '@/api/getdata';
import globalTool from '@/utils/globalTool';

const { sendMsg } = globalTool;

const listt = ref<any[]>([]);

function getData() {
    getLotte().then((data: any) => {
        listt.value = data.chou;
    });
}

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped>
.smoke_warp {
    width: 100%;
    background-color: #eff9ff;
    min-height: 100vh;

    .vux-header-title {
        background: none !important;
        color: #000 !important;
    }

    .vux-header .vux-header-left .left-arrow:before {
        border-color: #000 !important;
        font-weight: 700;
    }

    .smoke1 {
        padding-top: 10rpx;
        width: 95%;
        display: block;
        margin: auto;
        padding-bottom: 160rpx;

        .smoke2 {
            background-color: #16cee5;
            display: -ms-flexbox;
            display: flex;
            padding: 40rpx 0;
            border-top-left-radius: 10rpx;
            border-top-right-radius: 10rpx;

            .smoke3 {
                -ms-flex: 1;
                flex: 1;

                p {
                    color: #fff;
                    text-align: center;
                }
            }
        }

        .smoke4 {
            background-color: #fff;
            display: -ms-flexbox;
            display: flex;
            line-height: 100rpx;

            .smoke5 {
                border-bottom: 0.01px solid #f0f4f9;
                -ms-flex: 1;
                flex: 1;

                p {
                    color: #000;
                    text-align: center;
                }
            }
        }
    }
}
</style>
