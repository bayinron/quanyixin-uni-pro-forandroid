<script setup lang="ts">
import { ref } from 'vue';
import { getZhanche, getXindaiTitle, postOrder2 } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
interface LoanItem {
    zid: string;
    pic: string;
    title: string;
    yumoneys: string;
    jianjie: string;
    qishu: string;
    sqishu: string;
    danqi: string;
    lixi: string;
}
const userStore = useUserStore();
const prefixUrl = userStore.prefixUrl;

const xindai = ref<LoanItem[]>([]);
const touzi_con = ref(false);
const days = ref('');
const num = ref('');
const info = ref<LoanItem>({} as LoanItem);
const px = ref('');
onLoad((options: any) => {
    px.value = options.px;

    getData();
});

const getData = async () => {
    const res: any = await getZhanche(px.value);
    xindai.value = res.loan;
};

const order = (item: LoanItem) => {
    info.value = item;
    touzi_con.value = true;
};

const close = () => {
    touzi_con.value = false;
    days.value = '';
    num.value = '';
};

const chooseItem = (item: number, sqishu: string) => {
    if (item < Number(sqishu) + 1) {
        days.value = item.toString();
        num.value = (Number(item) * Number(info.value.danqi)).toFixed(2);
    }
};

const ok = async () => {
    if (days.value === '') {
        uni.showToast({
            title: '请选择投资期数',
            icon: 'none'
        });
        return;
    }

    if (!num.value) {
        uni.showToast({
            title: '请输入投资金额',
            icon: 'none'
        });
        return;
    }

    const zidNumber = parseInt(info.value.zid);
    // this.info.zid, Number(this.info.danqi)*this.days, this.days,this.info.lixi
     postOrder2(zidNumber.toString(), Number(info.value.danqi) * Number(days.value), Number(days.value), Number(info.value.lixi)).then((data: any) => {
        uni.showToast({
            title: '提交成功',
            icon: 'success'
        });
        touzi_con.value = false;
        days.value = '';
        getData();
    }).catch((err: any) => {
        
    });
};
</script>

<template>
    <view class="mortgage_warp">
        <view v-for="(item, index) in xindai" :key="index">
            <view class="carloan">
                <image :src="prefixUrl + item.pic" mode="aspectFit"></image>
                <view class="ce">
                    <view>{{ item.title }}</view>
                    <view>
                        <text>剩余房贷:</text>
                        <view>
                            {{ Number(item.yumoneys) != 0 ? Number(item.yumoneys).toFixed(2) : '0' }}
                            <view class="invest-btn" @tap="order(item)">立即投资</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="xx">
                <view>{{ item.jianjie }}</view>
            </view>
        </view>

        <view v-if="touzi_con" class="modal_wrap" @tap.stop="close">
            <view class="modal_con" @tap.stop>
                <view class="title">输入投资信息</view>
                <view class="withdraw_list">
                    <input disabled type="number" v-model="num" placeholder="请选择投资期数" />
                </view>
                <view class="choose_day clearfix">
                    <view v-for="(item, index) in Number(info.qishu)" :key="index" :class="{ active: days == item.toString() }" :style="{ color: item < Number(info.sqishu) + 1 ? '#333' : '#ccc' }" @tap="chooseItem(item, info.sqishu)"> {{ item }}期 </view>
                </view>
                <view class="common_btn" @tap.stop="ok">立即投资</view>
            </view>
        </view>
    </view>
</template>

<style lang="scss">
.mortgage_warp {
    width: 100%;
    background-color: #f8f8f8;
}

.header {
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    font-size: 36rpx;
    background-color: #fff;
    position: relative;
    border-bottom: 2rpx solid #f1f1f1;
}

.carloan {
    padding: 20rpx;
    display: flex;
    background-color: #fff;
    margin-top: 20rpx;

    image {
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;
    }

    .ce {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        view:first-child {
            font-size: 32rpx;
            font-weight: bold;
            margin-bottom: 20rpx;
        }

        view:last-child {
            font-size: 28rpx;
            color: #666;

            view {
                font-size: 36rpx;
                color: #335ef8;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10rpx;

                .invest-btn {
                    background-color: #335ef8;
                    color: #fff;
                    padding: 10rpx 30rpx;
                    border-radius: 30rpx;
                    font-size: 28rpx;
                }
            }
        }
    }
}

.xx {
    padding: 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
}

.modal_wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal_con {
    width: 80%;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 40rpx;

    .title {
        font-size: 36rpx;
        text-align: center;
        margin-bottom: 40rpx;
    }

    .withdraw_list {
        margin-bottom: 40rpx;

        input {
            width: 100%;
            height: 80rpx;
            border: 2rpx solid #eee;
            border-radius: 8rpx;
            padding: 0 20rpx;
            font-size: 28rpx;
        }
    }

    .choose_day {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40rpx;

        view {
            width: 25%;
            height: 80rpx;
            line-height: 80rpx;
            text-align: center;
            font-size: 28rpx;
            margin-bottom: 20rpx;

            &.active {
                color: #335ef8;
                font-weight: bold;
            }
        }
    }

    .common_btn {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: #335ef8;
        color: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
        width: 40%;
        margin: 0 auto;
    }
}

.clearfix:after {
    content: '';
    display: block;
    clear: both;
}
</style>
