<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { gettxstream } from '../../api/getdata';

interface WalletItem {
    shuoming: string;
    addtime: string;
    moneys: number;
    res: string;
    days: string;
}

const wallet = ref<WalletItem[]>([]);
const wallet2 = ref<WalletItem[]>([]);

const page = ref({
    PageSize: 10,
    PageNumber: 1
});

onMounted(() => {
    GetData();
});

function GetData() {
    gettxstream().then((data: any) => {
        data.records.forEach((item: any) => {   
            item.days = item.days.replace(/[a-z]/g, (match: string) => match.toUpperCase());
        });
        wallet.value = data.records;
    });
}
</script>

<template>
    <div class="transfer_warp">
        <div class="transfer">
            <div v-if="wallet.length == 0" class="notdata">暂无数据</div>

            <div v-for="(item, index) in wallet" :key="index" class="transfer2">
                <div class="transfer3">
                    <view class="flex gap-20rpx">
                        <p>{{ item.shuoming }}</p>
                        <p>{{ item.days }}</p>
                    </view>
                    <span>{{ item.addtime }}</span>
                </div>
                <div class="transfe4">
                    <p>-{{ item.moneys }}</p>
                    <i>{{ item.res }}</i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.transfer_warp {
    min-height: 100vh;
    padding-top: 20rpx;
    position: relative;
    background-color: #eff9ff;
    border-radius: 30rpx;

    .notdata {
        line-height: 160rpx;
        color: #333;
        text-align: center;
        font-size: 28rpx;
    }

    .transfer {
        background-color: #fff;
        width: 95%;
        display: block;
        margin: 0 auto;
        border-radius: 30rpx;

        .transfer2 {
            display: flex;
            border-bottom: 0.01px solid #d8d8d8;
            padding: 30rpx 40rpx;
            margin-top: 20rpx;

            .transfer3 {
                flex: 1;

                p {
                    font-size: 28rpx;
                    color: #000;
                    font-weight: 600;
                }

                span {
                    color: #999;
                    font-size: 24rpx;
                }
            }

            .transfe4 {
                p {
                    color: #000;
                    font-size: 32rpx;
                }

                span {
                    font-size: 24rpx;
                    color: #999;
                }
            }
        }
    }
}
</style>
