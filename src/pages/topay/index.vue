<template>
    <div class="topay_warp">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />
        
        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>支付密码</h1>
                <p>密码在手 资金有保障</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/cpwd.png" alt="" />
            </div>
            
            <!-- Input fields -->
            <div class="input_section">
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                    <input v-model="newpwd" type="password" placeholder="请输入支付密码" />
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                    <input v-model="okpwd" type="password" placeholder="请确认支付密码" />
                </div>
                
                <!-- Password requirements hint -->
                <p class="password_hint">密码支持6-14字符，建议数字、字母</p>
                
                <!-- Confirm button -->
                <div class="confirm_btn" @click="modifyPwd">
                    {{ isLoading ? '正在提交...' : '确认' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { modicash, modipaypwd } from '@/api/index';

const newpwd = ref('');
const okpwd = ref('');
const isLoading = ref(false);
const payPwd = ref(uni.getStorageSync('pay_pwd'));

const back = () => {
    uni.navigateBack();
};

const modifyPwd = async () => {
    if(newpwd.value==""){
        uni.showToast({
            title: '请输入支付密码',
            icon: 'none'
        });
        return;
    }
    if(newpwd.value==""){
        uni.showToast({
            title: '请输入支付密码',
            icon: 'none'
        });
        return;
    }
    if(newpwd.value!=okpwd.value){
        uni.showToast({
            title: '请确保两次密码输入一致',
            icon: 'none'
        });
        return;
    }
    //数字和字母校验
    if(!/^[0-9a-zA-Z]+$/.test(newpwd.value)){
        uni.showToast({
            title: '密码支持数字和字母',
            icon: 'none'
        });
        return;
    }
    if(newpwd.value.length<6||newpwd.value.length>16){
        uni.showToast({
            title: '密码长度为6-16位',
            icon: 'none'
        });
        return;
    }

    isLoading.value = true;
    const res = await modicash(newpwd.value);
    isLoading.value = false;

        uni.navigateBack();
    
};
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.topay_warp {
    background-color: #000;
    min-height: 100vh;
    position: relative;
    overflow: hidden;

    .bg_top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        object-fit: cover;
        z-index: 0;
    }

    .bg_bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: auto;
        object-fit: cover;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
        padding: 60rpx 40rpx;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .title_section {
        text-align: center;
            margin-bottom: 60rpx;
            margin-top: 80rpx;
            
            h1 {
                font-size: 56rpx;
                color: #fff;
                font-weight: bold;
                margin-bottom: 20rpx;
                line-height: 1;
        }

            p {
                font-size: 32rpx;
                color: #fff;
                line-height: 1;
                opacity: 0.9;
        }
    }

        .illustration {
            text-align: center;
            margin-bottom: 50rpx;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                width: 70%;
                max-width: 500rpx;
                height: auto;
            }
        }
        
        .input_section {
            padding: 50rpx 40rpx;
            border-radius: 30rpx;
            box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.3);
            margin-bottom: 40rpx;
            
            .input_field {
                background-color: #fff;
                position: relative;
                margin-bottom: 40rpx;
                display: flex;
                align-items: center;
                padding: 0 20rpx;
                border-radius: 20rpx;
                border: 1rpx solid #e5e7eb;
                background: #f9fafb;
                
                .uni-icons {
                    margin-right: 20rpx;
                    flex-shrink: 0;
                }
                
                input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    height: 110rpx;
                    font-size: 32rpx;
                    color: #000;
                    
                    &::placeholder {
                        color: #9ca3af;
                    }
                }
        }

            .password_hint {
                font-size: 26rpx;
                color: #FFDA96;
                margin: 30rpx 0;
                text-align: center;
                line-height: 1.4;
    }

            .confirm_btn {
                width: 90%;
                margin: 40rpx auto 0;
                text-align: center;
                color: #855100;
                font-size: 36rpx;
                background: linear-gradient(45deg, #f9dfb7, #ffc676);
                border-radius: 50rpx;
                line-height: 100rpx;
                height: 100rpx;
                font-weight: 600;
                box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                
                &:active {
                    transform: translateY(2rpx);
                    box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
}
</style>
