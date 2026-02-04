<template>
    <div class="Repaying_warp">
        <div class="repaying">
            <div class="intergrali_title">
                <div :class="{ active: isok === '1' }" @click="changeStatus('1')">
                    <i style="font-style: normal">正在垫资</i>
                    <span></span>
                </div>
                <div :class="{ active: isok === '2' }" @click="changeStatus('2')">
                    <i style="font-style: normal">垫资结束</i>
                    <span></span>
                </div>
            </div>

            <div v-for="(item, index) in records" :key="index" class="dianzi_warp">
                <div class="dianzi1">
                    <p>
                        {{ item.dd_name }} <span>{{ item.isok }}</span>
                    </p>
                </div>
                <div class="dianzi2">
                    <div class="dianzi3">
                        <p style="font-size: 40rpx">￥{{ item.moneys }}</p>
                    </div>
                    <div class="dianzi3" style="text-align: center">
                        <p style="margin-top: 10rpx">周期: {{ item.days }}天</p>
                    </div>
                    <div class="dianzi3" style="text-align: right">
                        <p style="margin-top: 10rpx">收益: {{ item.fen }}</p>
                    </div>
                </div>
                <div class="dianzi2">
                    <div class="dianzi3">
                        <p style="font-size: 24rpx">{{ item.endtime }}</p>
                    </div>
                    <div class="dianzi4">
                        <p @click="goToReven(item.sid)">查看详情</p>
                        <span @click="goToContract(item.sid)">查看合同</span>
                    </div>
                </div>
            </div>

            <p v-if="records.length === 0" class="notdata">暂无数据</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getStrade } from '../../api/getdata';

interface Record {
    isok: string;
    moneys: string | number;
    days: string | number;
    fen: string | number;
    endtime: string;
    sid: string | number;
    dd_name: string;
}

const records = ref<Record[]>([]);
const isok = ref('1');
const lx = ref('1');

function getData() {
    getStrade(lx.value, isok.value).then((data: any) => {
        records.value = data.ding;
    });
}

function changeStatus(status: string) {
    isok.value = status;
    getData();
}

function goToReven(sid: string | number) {
    uni.navigateTo({
        url: '/pages/reven/index?sid=' + sid
    });
}

function goToContract(sid: string | number) {
    uni.navigateTo({
        url: '/pages/contract/index?sid=' + sid
    });
}

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped>
.Repaying_warp {
    position: relative;
    background-color: #eff9ff;

    .repaying {
        .intergrali_title {
            display: flex;
            justify-content: space-around;
            background: #fff;
            padding: 20rpx 0;

            div {
                flex: 1;
                text-align: center;
                position: relative;
                color: #999;

                i {
                    font-size: 28rpx;
                }

                &.active {
                    color: #16cee5;

                    span {
                        position: absolute;
                        bottom: -20rpx;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 40rpx;
                        height: 4rpx;
                        background: #16cee5;
                    }
                }
            }
        }

        .dianzi_warp {
            background: #fff;
            margin: 20rpx;
            border-radius: 20rpx;
            padding: 20rpx;

            .dianzi1 {
                border-bottom: 2rpx solid #eee;
                padding-bottom: 20rpx;

                p {
                    font-size: 28rpx;
                    color: #333;

                    span {
                        float: right;
                        color: #16cee5;
                    }
                }
            }

            .dianzi2 {
                display: flex;
                padding: 20rpx 0;

                .dianzi3 {
                    flex: 1;
                }

                .dianzi4 {
                    display: flex;
                    align-items: center;

                    p {
                        padding: 10rpx 20rpx;
                        background: #16cee5;
                        color: #fff;
                        border-radius: 30rpx;
                        margin-right: 20rpx;
                        font-size: 24rpx;
                    }

                    span {
                        padding: 10rpx 20rpx;
                        border: 2rpx solid #16cee5;
                        color: #16cee5;
                        border-radius: 30rpx;
                        font-size: 24rpx;
                    }
                }
            }
        }

        .notdata {
            text-align: center;
            padding: 40rpx;
            color: #999;
            font-size: 28rpx;
        }
    }
}
</style>
