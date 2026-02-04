<template>
    <div class="register_warp">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />

        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>5000元体验红包</h1>
                <p>注册成功领取，好物多多赶紧来领！</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/cpwd.png" alt="" />
        </div>

            <!-- Input fields -->
            <div class="input_section">
                <div class="input_field">
                    <uni-icons type="contact-filled" size="30" color="#666"></uni-icons>
                <input v-model="username" type="number" placeholder="手机号" />
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                <input v-model="password" type="password" placeholder="请设置登录密码" />
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                <input v-model="password2" type="password" placeholder="请再次输入登录密码" />
                </div>
                <div class="input_field">
                    <uni-icons type="chatboxes-filled" size="30" color="#666"></uni-icons>
                    <input v-model="code" type="text" placeholder="请输入验证码" />
                    <div class="captcha_btn" @click="updateImageCode">
                        <canvas style="width: 180rpx; height: 66rpx" canvas-id="canvas"></canvas>
                    </div>
                </div>
                <div class="input_field">
                    <uni-icons type="gift-filled" size="30" color="#666"></uni-icons>
                <input v-model="tjm" type="text" placeholder="请输入邀请码" />
            </div>

                <!-- Password requirements hint -->
                <p class="password_hint">密码仅支持6-16字符 建议数字、字母、符号</p>
                
                <!-- Action link -->
                <div class="action_link">
                    <span @click="toLogin">已有账号 去登录</span>
            </div>

                <!-- Register button -->
                <div class="register_btn" @click="register">
                    {{ isLoading ? '正在注册...' : '注册' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { userregister, getpassword } from '@/api/index';
import { onLoad } from '@dcloudio/uni-app';
import { Mcaptcha } from '@/utils/mcaptcha';

var mcaptcha = ref<any>(null);

const username = ref('');
const password = ref('');
const password2 = ref('');
const code = ref('');
const tjm = ref('');
const isLoading = ref(false);
// 刷新验证码
const updateImageCode = () => {
    mcaptcha.value?.refresh();
};


function toLogin() {
    uni.reLaunch({
        url: '/pages/login/index'
    });
}

function register() {
    if (username.value === '') {
        uni.showToast({ title: '请输入手机号', icon: 'none' });
        return;
    }
    if (username.value.length !== 11) {
        uni.showToast({ title: '请填写正确的电话号码！', icon: 'none' });
        return;
    }
    if (password.value === '') {
        uni.showToast({ title: '请输入密码', icon: 'none' });
        return;
    }
    if (password.value !== password2.value) {
        uni.showToast({ title: '请确保两次密码输入一致', icon: 'none' });
        return;
    }
    if (code.value === '') {
        uni.showToast({ title: '请输入验证码', icon: 'none' });
        return;
    }
    if (tjm.value === '') {
        uni.showToast({ title: '请输入推荐码', icon: 'none' });
        return;
    }
    if (!code.value || !mcaptcha.value?.validate(code.value)) {
        uni.showToast({ title: '请输入正确的验证码', icon: 'none' });
        return;
    }
    if (password.value.length < 6 || password.value.length > 16) {
        uni.showToast({ title: '密码长度为6-16位', icon: 'none' });
        return;
    }

    if (isLoading.value) return;
    isLoading.value = true;

    const params = {
        Mobile: username.value,
        Password: password.value,
        SMSValidateCode: code.value,
        bianhao: tjm.value
    };

    userregister(params).then((data: any) => {
        isLoading.value = false;
        if (data.result === 'true') {
            uni.showToast({ title: '注册成功' });
            setTimeout(() => {
                uni.reLaunch({ url: '/pages/login/index' });
            }, 1500);
        }
    }).finally(() => {
        isLoading.value = false;
    });
}

onLoad((options: any) => {
    if (options.bianhao) {
        tjm.value = options.bianhao;
    }
});
onShow(() => {
    mcaptcha.value = new Mcaptcha({
        el: 'canvas',
        width: 80,
        height: 35,
        createCodeImg: ''
    });
});
</script>

<style lang="scss" scoped>
.register_warp {
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
                
                .captcha_btn {
                    position: absolute;
                    right: 20rpx;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 180rpx;
                    height: 66rpx;
                    cursor: pointer;
                    flex-shrink: 0;
                    
                    canvas {
                        width: 100%;
                        height: 100%;
                        border-radius: 10rpx;
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
            
            .action_link {
                text-align: center;
                margin: 30rpx 0;

                span {
                    font-size: 28rpx;
                    color: #FFDA96;
                    cursor: pointer;
                    
                    &:hover {
                        color: #f59e0b;
                }
            }
        }

            .register_btn {
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
