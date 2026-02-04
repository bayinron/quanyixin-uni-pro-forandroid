<template>
    <view class="withdraw_warp">
        <view class="withdraw">
            <image src="@/static/img/ld.png" mode="aspectFit" />
            <text>请您绑定您的真实信息，如有信息错误请联系</text>
        </view>

        <view class="neir">
            <view class="input-item">
                <text>姓名：</text>
                <input type="text" v-model="realname" placeholder="请输入您的姓名" />
            </view>
            <view class="input-item">
                <text>身份证号：</text>
                <input type="text" v-model="usecode" placeholder="请输入身份证号" />
            </view>
            <view class="input-item">
                <text>银行名称：</text>
                <input type="text" v-model="bankname" placeholder="请输入银行名称" />
            </view>
            <view class="input-item">
                <text>银行卡号：</text>
                <input type="text" v-model="bankcode" placeholder="请输入银行卡号" />
            </view>
            <view class="input-item">
                <text>开户支行：</text>
                <input type="text" v-model="bankadd" placeholder="请输入开户支行" />
            </view>
        </view>

        <view class="submit-btn goldbtn" @click="handleSubmit">确定绑定</view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authentication } from '@/api/index';

const realname = ref('');
const usecode = ref('');
const bankname = ref('');
const bankcode = ref('');
const bankadd = ref('');

const back = () => {
    uni.navigateBack();
};

const handleSubmit = async () => {
    if (realname.value === '') {
        uni.showToast({ title: '请输入您的真实姓名', icon: 'none' });
        return;
    }
    if (usecode.value === '') {
        uni.showToast({ title: '请输入您的身份证号', icon: 'none' });
        return;
    }
    if (usecode.value.length !== 18) {
        uni.showToast({ title: '请输入正确的身份证号', icon: 'none' });
        return;
    }
    if (bankcode.value === '') {
        uni.showToast({ title: '请输入您的银行卡号', icon: 'none' });
        return;
    }
    if (bankname.value === '') {
        uni.showToast({ title: '请输入开户行', icon: 'none' });
        return;
    }
    if (bankadd.value === '') {
        uni.showToast({ title: '请输入开户支行', icon: 'none' });
        return;
    }

    const params = {
        realname: realname.value,
        usecode: usecode.value,

        bankcode: bankcode.value,
        bankuser: realname.value,
        bankname: bankname.value,
        bankadd: bankadd.value
    };

    authentication(params).then((res: any) => {
        uni.showToast({ title: '实名认证成功', icon: 'success' });
        uni.switchTab({ url: '/pages/home/my' });
    });
};
</script>

<style lang="scss" scoped>
.withdraw_warp {
    min-height: 100vh;
    background: #fff;
    padding: 20rpx;

    .withdraw {
        display: flex;
        align-items: center;
        padding: 30rpx;
        background-color: #eff3ff;
        image {
            width: 80rpx;
            height: 80rpx;
            margin-right: 20rpx;
        }

        text {
            font-size: 28rpx;
            color: #666;
        }
    }

    .neir {
        padding: 30rpx;

        .input-item {
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
            border-bottom: 1px solid #eee;
            padding-bottom: 20rpx;

            text {
                width: 160rpx;
                font-size: 28rpx;
                color: #333;
            }

            input {
                flex: 1;
                height: 80rpx;
                font-size: 28rpx;
                padding: 0 20rpx;
            }
        }
    }

    .submit-btn {
        width: 90%;
        height: 90rpx;
        background: #0066ff;
        color: #fff;
        border-radius: 45rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        margin: 60rpx auto;
    }
}
</style>
