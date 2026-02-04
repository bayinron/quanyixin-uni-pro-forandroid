<script setup lang="ts">
import { ref } from 'vue';
import { getpassword, forgetpwd } from '@/api/index';
import globalTool from '@/utils/globalTool';

declare const uni: any;

interface ForgetForm {
    username: string;
    password: string;
    password2: string;
    code: string;
}

const formData = ref<ForgetForm>({
    username: '',
    password: '',
    password2: '',
    code: ''
});

const getpassTime = ref(180);
const submitBtn = ref('获取验证码');
const isClicked = ref(false);
const isLoading = ref(false);

const timerun = () => {
    setTimeout(() => {
        getpassTime.value--;
        if (getpassTime.value === -1) {
            submitBtn.value = '重新发送';
            getpassTime.value = 60;
            isClicked.value = false;
            return;
        }
        submitBtn.value = getpassTime.value + ' s';
        timerun();
    }, 1000);
};

const getPassword = () => {
    if (formData.value.username === '') {
        uni.showToast({
            title: '请输入手机号',
            icon: 'none'
        });
        return;
    }

    if (formData.value.username.length !== 11) {
        uni.showToast({
            title: '请填写正确的电话号码！',
            icon: 'none'
        });
        return;
    }

    getpassword(formData.value.username).then((res: any) => {
        submitBtn.value = getpassTime.value + ' s';
        timerun();
    });
};

const forget = () => {
    if (formData.value.username === '') {
        uni.showToast({
            title: '请输入手机号',
            icon: 'none'
        });
        return;
    }

    if (formData.value.username.length !== 11) {
        uni.showToast({
            title: '请填写正确的电话号码！',
            icon: 'none'
        });
        return;
    }

    if (formData.value.password === '') {
        uni.showToast({
            title: '请输入密码',
            icon: 'none'
        });
        return;
    }

    if (formData.value.password !== formData.value.password2) {
        uni.showToast({
            title: '请确保两次密码输入一致',
            icon: 'none'
        });
        return;
    }

    if (formData.value.code === '') {
        uni.showToast({
            title: '请输入验证码',
            icon: 'none'
        });
        return;
    }

    if (formData.value.password.length < 6 || formData.value.password.length > 16) {
        uni.showToast({
            title: '密码长度为6-16位',
            icon: 'none'
        });
        return;
    }

    if (/^\d+$/.test(formData.value.password)) {
        uni.showToast({
            title: '密码必须为6-16位字母加数字',
            icon: 'none'
        });
        return;
    }

    if (/^[a-z]+$/i.test(formData.value.password)) {
        uni.showToast({
            title: '密码必须为6-16位字母加数字',
            icon: 'none'
        });
        return;
    }

    if (!/^[A-Za-z0-9]+$/.test(formData.value.password)) {
        uni.showToast({
            title: '密码必须为6-16位字母加数字',
            icon: 'none'
        });
        return;
    }

    isLoading.value = true;
    forgetpwd(formData.value.username, formData.value.code, formData.value.password).then((res: any) => {
        isLoading.value = false;
        uni.showToast({
            title: '密码修改成功',
            icon: 'success',
            duration: 1500,
            success: () => {
                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            }
        });
    });
};

const backClick = () => {
    globalTool.back();
};
</script>

<template>
    <div class="forget_warp">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />
        
        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>找回密码</h1>
                <p>选择全意信，资金无忧</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/cpwd.png" alt="" />
            </div>
            
            <!-- Input fields -->
            <div class="input_section">
                <div class="input_field">
                    <uni-icons type="contact-filled" size="30" color="#666"></uni-icons>
                    <input type="number" v-model="formData.username" placeholder="手机号" />
                </div>
                <div class="input_field">
                    <uni-icons type="chatboxes-filled" size="30" color="#666"></uni-icons>
                    <input type="number" v-model="formData.code" placeholder="验证码" />
                    <span class="code_btn" :disabled="isClicked" @click="getPassword">{{ submitBtn }}</span>
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                    <input type="password" v-model="formData.password" placeholder="密码（6-16位数字和字母组成）" />
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                    <input type="password" v-model="formData.password2" placeholder="再次输入密码" />
                </div>
                
                <!-- Password requirements hint -->
                <p class="password_hint">密码仅支持6-16字符 建议数字、字母、符号</p>
                
                <!-- Confirm button -->
                <div class="confirm_btn" @click="forget">
                    {{ isLoading ? '正在提交...' : '确认' }}
                </div>
                
                <!-- Back button -->
                <div class="back_btn" @click="backClick">
                    返回
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.forget_warp {
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
                
                .code_btn {
                    color: #4080ff;
                    font-size: 28rpx;
                    font-weight: 500;
                    padding: 20rpx;
                    cursor: pointer;
                    flex-shrink: 0;
                    
                    &[disabled] {
                        color: #999;
                        cursor: not-allowed;
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
                margin: 40rpx auto 20rpx;
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
            
            .back_btn {
                width: 90%;
                margin: 0 auto;
                text-align: center;
                color: #fff;
                font-size: 32rpx;
                // background: #f5f5f5;
                border-radius: 50rpx;
                line-height: 80rpx;
                height: 80rpx;
                font-weight: 500;
                transition: all 0.3s ease;
                
                &:active {
                    transform: translateY(2rpx);
                    background: #e5e5e5;
                }
            }
        }
    }
}
</style>
