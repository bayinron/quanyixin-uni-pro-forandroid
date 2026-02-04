<template>
    <view class="bgwraper">
        
        <view class="signin_warp">
            <MyNavBar title="签到" />
            <image class="signin_bg" src="@/static/img/signbg.png" mode="widthFix" />
            <view class="signin_text">
                <text v-for="item in list" :key="item.name" class="reward-item">{{ item.name }}-{{ item.price }} 元</text>
            </view>
            <view class="signbtn goldbtn" @click="signin">
                立即签到
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { setfollow, getSignSet } from '@/api/index';
import globalTool from '@/utils/globalTool';
import { ref } from 'vue';
import MyNavBar from '@/components/MyNavBar.vue';

const signin_text = ref('vip1级 3 元');

const list = ref<any[]>([]);

const signin = () => {
    setfollow().then((res) => {
        globalTool.showToast('签到成功');
    });
};
onShow(() => {
    getSignSet().then((res:any) => {
        console.log(res);
        list.value =Object.keys(res.config).map((item:any) => {
            return {
                name: item,
                price: res.config[item]
            }
        });
        console.log(list.value);
    });
});

</script>

<style lang="scss" scoped>
.bgwraper{
    background-color: #e7bc8c;
    min-height: 100vh;
}
.signin_warp {
    position: relative;
    background-color: $bg-color;
    display: flex;
    flex-direction: column;
    background-color: #e7bc8c;
    .signin_bg {
        position: relative;
        width: 100%;
        height: auto;
        left: 0;
    }
   

    .signin_title {
        text-align: center;
        margin-bottom: 60rpx;

        .title {
            font-size: 48rpx;
            font-weight: bold;
            color: #fff;
            display: block;
            margin-bottom: 20rpx;
        }

        .subtitle {
            font-size: 32rpx;
            color: rgba(255, 255, 255, 0.8);
            display: block;
        }
    }

    .signin_icon {
        width: 240rpx;
        height: 240rpx;
        margin: 40rpx 0;
    }
    .signbtn{
        width: 80%  ;
        margin: 0 auto;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        background-color: #fff;
        color: #cf423b;
        position: absolute;
        bottom: 2%;
        left: 50%;
        transform: translateX(-50%);
    }
    .signin_text {
        position: absolute;
        top: 73%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

        background: rgba(255, 255, 255, 0.1);
        border-radius: 20rpx;
        padding: 30rpx 50rpx;
        margin-top: 50rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 0rpx;

        .reward-item {
            color: #855100;
            background: rgba(255, 255, 255, 0.2);
            padding: 5rpx 15rpx;
            border-radius: 30rpx;
            font-size: 26rpx;
            font-weight: bold;
            width: 33%;
        }
    }
}
</style>
