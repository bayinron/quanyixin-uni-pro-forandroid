<template>
    <div class="logon_warp">
        <image mode="widthFix" class="logon_bg" src="@/static/img/dldlbg.png" alt="" />
        <view class="bigwrap">
            <div class="logon">
                <div class="logon_telte">
                    <image mode="widthFix" src="@/static/img/tttxxx.png" alt="" />
                    <p>从此开始 改变生活</p>
                    <span>你好，欢迎加入万华智汇</span>
                </div>
            </div>
            <div class="shuru">
                <div class="shu">
                    <p>手机号</p>
                    <input type="number" placeholder="请输入手机号" v-model="username"  autocomplete="username"/>
                    <p>密码</p>
                    <input type="password" placeholder="请输入登录密码" v-model="password"  autocomplete="password"/>
                </div>
                <div class="data_warp1">
                    <div class="data_warp2">
                        <div class="data_waap3">
                            <image mode="widthFix" v-if="!check" src="@/static/img/xuanzhe.png" @click="check = true" />
                            <image mode="widthFix" v-else src="@/static/img/kbd.png" @click="check = false" />
                            <span>记住密码</span>
                        </div>
                        <div class="data_waap3">
                            <p @click="forgetPassword">忘记密码？</p>
                            <em class="color-yellow!" @click="getUrl('chat')">联系客服</em>
                        </div>
                    </div>
                </div>
                <div class="dl">
                    <p @click="login" class="">登录</p>
                </div>
                <div class="dl register-button">
                    <p @click="goRegister">注册</p>
                </div>
            </div>
        </view>
    </div>
</template>

<script setup lang="ts">
import { userlogin, userregister } from '@/api/getdata';
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

onMounted(() => {
    const storedCheck = uni.getStorageSync('check');
    check.value = storedCheck === '' ? true : storedCheck === 'true';

    if (check.value) {
        username.value = uni.getStorageSync('username') || '';
        password.value = uni.getStorageSync('password') || '';
    }
});

function forgetPassword() {
    uni.navigateTo({
        url: '/pages/password/index'
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
    if (!username.value || username.value === '') {
        sendMsg('请先输入手机号再联系客服');
        return;
    } 
    uni.navigateTo({
        url: `/pages/chatcon/index?phone=${username.value}`
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
        relogin();
    }
}

function relogin() {
    const params = {
        UserName: username.value,
        PassWord: password.value
    };

    userlogin(params).then((res: any) => {
        uni.setStorageSync('check', String(check.value));
        if (check.value) {
            uni.setStorageSync('username', username.value);
            uni.setStorageSync('password', password.value);
        } else {
            uni.removeStorageSync('username');
            uni.removeStorageSync('password');
        }
        globalTool.setStore('token', res.token);
        sendMsg('登录成功');
        uni.switchTab({
            url: '/pages/home/index'
        });
    });
}
</script>

<style scoped lang="scss">
page {
    height: 100vh;
    background-color: white;
}
.logon_warp {
    background-color: #f2f6fe;
    position: relative;

    .bigwrap {
        position: absolute;
        width: 100vw;
        // height: 1500rpx;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .logon_bg {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .logon {
        position: relative;

        width: 90%;
        margin: 0 auto;
        // height: calc(100vh - 940rpx);
        margin-bottom: 20rpx;
        .logon_help {
            font-size: 32rpx;
            margin: auto;
            color: #fff;
            text-align: right;
        }

        .logon_telte {
            padding: 40rpx 60rpx 0;
            image {
                width: 20%;
            }
            p {
                font-size: 48rpx;
                color: #fff;
                margin-top: 60rpx;
            }

            span {
                font-size: 32rpx;
                color: #fff;
                display: block;
                margin-top: 30rpx;
            }
        }

        .logon_wj {
            text-align: center;
            display: block;
            font-size: 28rpx;
            color: #fff;
            margin-top: 60rpx;
        }
    }

    .shuru {
        width: 100%;
        border-radius: 30rpx 30rpx 0 0;
        margin: 0 auto;
        background: #fff;

        padding-bottom: 20rpx;

        .shu {
            padding: 40rpx 20rpx;

            input {
                border-radius: 10px;
                background: #f7fafc;
                width: 100%;
                line-height: 110rpx;
                padding-left: 40rpx;
                height: 110rpx;
                font-size: 32rpx;
                color: #000;
                margin-top: 20rpx;
            }

            ::-webkit-input-placeholder {
                color: #ccc;
            }

            p {
                margin-top: 20rpx;
                font-size: 28rpx;
                color: #000;
            }
        }

        .data_warp1 {
            margin: 0 20rpx;

            .data_warp2 {
                display: flex;
                justify-content: space-between;
                .data_waap3 {
                    image {
                        width: 28rpx;
                        height: 28rpx;
                        margin-right: 10rpx;
                    }

                    span {
                        font-size: 24rpx;
                        vertical-align: middle;
                    }

                    p {
                        padding-left: 80rpx;
                        color: #ff5f08;
                        font-size: 24rpx;
                        display: inline-block;
                    }

                    em {
                        font-size: 24rpx;

                        color: rgb(130, 70, 250);
                    }
                }
            }
        }

        .dl {
            width: 95%;
            margin: 40rpx auto 0;
            text-align: center;
            background-color: #16cee5;
            border-radius: 159px;
            line-height: 110rpx;

            p {
                width: 100%;
                font-size: 32rpx;
                color: #fff;
            }
        }
    }
}
</style>
