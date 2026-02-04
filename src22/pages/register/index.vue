<template>
    <div class="register_warp">
        <image mode="widthFix" class="logon_bg" src="@/static/img/dldlbg.png" alt="" />

        <div class="logon">
            <div class="logon_help"></div>
            <div class="logon_telte">
                <p>注册送惊喜</p>
                <span>惊喜好礼送不停</span>
            </div>
        </div>

        <div class="shuru">
            <div class="shu">
                <input v-model="username" type="number" placeholder="手机号" />
                <input v-model="password" type="password" placeholder="请设置登录密码" />
                <input v-model="password2" type="password" placeholder="请再次输入登录密码" />
                <div class="yzm" style="position: relative">
                    <input v-model="code" type="text" placeholder="请输入验证码" />
                    <div class="gpss" style="background: none; margin-right: 20rpx; position: absolute; right: 20rpx; bottom: 10rpx" @click="updateImageCode">
                        <!-- <VerificationCode v-model="identifyCode" @getCode="getIdentifyCode" /> -->
                        <canvas style="width: 180rpx; height: 66rpx" canvas-id="canvas"></canvas>
                    </div>
                </div>
                <input v-model="tjm" type="text" placeholder="请输入邀请码" />
            </div>

            <div class="shu2">
                <p>已有账号 <span @click="toLogin">去登录</span></p>
            </div>

            <div class="dl" @click="register">
                <p>注册</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { userregister2, getpassword } from '../../api/getdata';
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

    userregister2(params).then((data: any) => {
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
onMounted(() => {
    mcaptcha.value = new Mcaptcha({
        el: 'canvas',
        width: 80,
        height: 35,
        createCodeImg: ''
    });
});
</script>

<style lang="scss">
.register_warp {
    background-color: #f2f6fe;
    height: 100%;
    position: relative;

    .logon_bg {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .logon {
        position: relative;
        top: 0rpx;

        .logon_help {
            font-size: 32rpx;
            width: 80%;
            margin: auto;
            color: #fff;
            text-align: right;
        }

        .logon_telte {
            padding: 20rpx 60rpx 0;
            text-align: center;

            p {
                font-size: 60rpx;
                color: #fff;
                margin-top: 60rpx;
            }

            span {
                font-size: 32rpx;
                color: #fff;
                display: block;
                margin-top: 28rpx;
            }
        }
    }

    .shuru {
        background-color: #fff;
        padding: 20rpx 40rpx;
        top: 10rpx;
        width: 100%;
        position: relative;
        border-top-left-radius: 30rpx;
        border-top-right-radius: 30rpx;
        padding-bottom: 220rpx;

        .shu {
            padding: 40rpx 60rpx;

            input {
                border-radius: 20rpx;
                background: #f7fafc;
                width: 100%;
                line-height: 110rpx;
                padding-left: 40rpx;
                height: 110rpx;
                font-size: 32rpx;
                color: #000;
                margin-top: 20rpx;
            }
        }

        .shu2 {
            text-align: center;

            p {
                color: #29456e;
                font-size: 24rpx;

                span {
                    color: #e00f00;
                }
            }
        }

        .dl {
            padding-bottom: 40rpx;
            width: 95%;
            margin: 60rpx auto 0;
            text-align: center;
            background-color: #16cee5;
            border-radius: 318rpx;
            line-height: 110rpx;
            height: 110rpx;

            p {
                width: 100%;
                font-size: 32rpx;
                color: #fff;
            }
        }
    }
}
</style>
