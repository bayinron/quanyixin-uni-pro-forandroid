<template>
    <div class="login_warp">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />
        
        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>全意理财 信筑财富</h1>
                <p>全心守护每一份信任 筑实财富根基</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/globe.png" alt="" />
            </div>
            
            <!-- Input fields -->
            <div class="input_section">
                <div class="input_field">
                    <uni-icons type="contact-filled" size="30" color="#666"></uni-icons>
                    <input v-model="username" type="text" placeholder="请输入登录账号" />
                </div>
                <div class="input_field">
                    <uni-icons type="locked-filled" size="30" color="#666"></uni-icons>
                    <input v-model="password" :type="show ? 'text' : 'password'" placeholder="请输入登录密码" />
                    <uni-icons v-if="show" type="eye-slash" size="30" color="#666" @click="show = !show"></uni-icons>
                    <uni-icons v-else type="eye-slash-filled" size="30" color="#666" @click="show = !show"></uni-icons>
                </div>
                
                <!-- Remember password -->
                <div class="remember_row">
                    <label class="remember_label">
                        <checkbox-group :value="check ? ['remember'] : []" @change="onRememberChange">
                            <checkbox value="remember" :checked="check" />
                        </checkbox-group>
                        <span class="ml-10rpx">记住密码</span>
                    </label>
                </div>
                
                <!-- Action links -->
                <div class="action_links">
                    <span @click="forgetPassword">忘记密码?</span>
                    <span @click="goRegister">没有账户?去注册</span>
                </div>
                
                <!-- Login button -->
                <div class="login_btn" @click="login">
                    {{ isLoading ? '正在登录...' : '登录' }}
                </div>
                
                <!-- Bottom link -->
                <p class="other_login">使用其他方式进行登录</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { userlogin, userregister } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
import globalTool from '@/utils/globalTool';
const { sendMsg } = globalTool;
const { prefixUrl } = toRefs(useUserStore());
const username = ref<string>('');
const password = ref<string>('');
const show = ref<boolean>(false);
const msg = ref<string>('');
const imgurl = ref<string>('');
const logintype = ref<string>('');
const url2 = ref<string | null>(null);
const check = ref<boolean>(false);
const isLoading = ref<boolean>(false);

onShow(() => {
    const rememberPassword = uni.getStorageSync('rememberPassword');
    if (rememberPassword === 'true') {
        check.value = true;
        username.value = uni.getStorageSync('username') || '';
        password.value = uni.getStorageSync('password') || '';
    }
});

function onRememberChange(e: any) {
    check.value = Array.isArray(e.detail?.value) && e.detail.value.includes('remember');
}

function forgetPassword() {
    uni.navigateTo({
        url: '/pages/forget'
    });
}

function goRegister() {
    uni.navigateTo({
        url: '/pages/register/index'
    });
}

function getCode(filename: string) {
    imgurl.value = `${prefixUrl.value}/common/img/get?filename=${filename}`;
}

function getUrl(type: string) {
    logintype.value = type;
    url2.value = `/api/kefu_url1.php?type=${logintype.value}`;
    uni.navigateTo({
        url: `/pages/chatcon/index?url=${url2.value}`
    });
}

function login() {
    if (!username.value || username.value === '') {
        sendMsg('请输入手机号');
    } else if (username.value.length !== 11) {
        sendMsg('请填写正确的电话号码！');
    } else if (password.value === '') {
        sendMsg('请输入密码');
    } else {
        isLoading.value = true;
        relogin();
    }
}

function relogin() {
    const params = {
        usename: username.value,
        usepwd: password.value
    };
    userlogin(params).then((res: any) => {
        isLoading.value = false;
        if (check.value) {
            uni.setStorageSync('username', username.value);
            uni.setStorageSync('password', password.value);
            uni.setStorageSync('rememberPassword', 'true');
        } else {
            uni.removeStorageSync('username');
            uni.removeStorageSync('password');
            uni.removeStorageSync('rememberPassword');
        }
        globalTool.setStore('token', res.token);
        sendMsg('登录成功');
        uni.switchTab({
            url: '/pages/home/index'
        });
    }).catch((err) => {
        isLoading.value = false;
    });
}
</script>

<style lang="scss" scoped>
.login_warp {
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
            
            .remember_row {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin: 10rpx 0 20rpx;
                
                .remember_label {
                    display: inline-flex;
                    align-items: center;
                    gap: 12rpx;
                    font-size: 28rpx;
                    color: #FFDA96;
                    
                    checkbox {
                        width: 32rpx;
                        height: 32rpx;
                    }
                }
            }
            
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
            
            .action_links {
                display: flex;
                justify-content: space-between;
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
            
            .login_btn {
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
            
            .other_login {
                font-size: 26rpx;
                color: #FFDA96;
                margin: 30rpx 0 0;
                text-align: center;
                line-height: 1.4;
            }
        }
    }
}
</style>
