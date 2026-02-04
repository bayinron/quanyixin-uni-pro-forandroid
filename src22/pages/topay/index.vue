<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { setpaypwd, modipaypwd } from '@/api/getdata';
import globalTool from '@/utils/globalTool';
import MyNavBar from '@/components/MyNavBar.vue';
const { sendMsg } = globalTool;

interface PaywdProps {
    pay_pwd?: string;
}

const pay_pwd = ref(uni.getStorageSync('pay_pwd') || '1');
const newpwd = ref('');
const okpwd = ref('');
const usepwd = ref('');
const isLoading = ref(false);

const modifyPwd = async () => {
    if (newpwd.value === '') {
        sendMsg('请输入支付密码');
        return;
    }

    if (okpwd.value === '') {
        sendMsg('请输入支付密码');
        return;
    }

    if (newpwd.value !== okpwd.value) {
        sendMsg('请确保两次密码输入一致');
        return;
    }

    if (newpwd.value.length < 6 || newpwd.value.length > 16) {
        sendMsg('密码长度为6-16位');
        return;
    }

    if (isLoading.value) return;
    isLoading.value = true;

    try {
        if (pay_pwd.value != '1') {
            const data = await setpaypwd(newpwd.value,okpwd.value);
            if (data.result === 'true') {
                sendMsg('设置成功');
                setTimeout(() => {
                    globalTool.back();
                }, 2500);
            }
        } else {
            if (usepwd.value === '') {
                sendMsg('请输入原支付密码');
                return;
            }
         
            const data = await modipaypwd(newpwd.value, usepwd.value);
            if (data.result === 'true') {
                sendMsg('修改成功');
                setTimeout(() => {
                    globalTool.back();
                }, 1800);
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <MyNavBar title="" />
    <div class="topay_warp">
        <image mode="widthFix" class="logon_bg" src="@/static/img/dldlbg.png" alt="" />

        <div class="logon">
            <div class="logon_help"></div>
            <div class="logon_telte">
                <p>支付密码</p>
                <span>密码保障, 资金有保障</span>
            </div>
        </div>

        <div class="shuru">
            <p class="tip">密码支持字母、数字、符号</p>

            <div class="shu">
                <input v-model="newpwd" type="password" placeholder="请输入支付密码" />
                <input v-model="okpwd" type="password" placeholder="请确认支付密码" />
                <input v-if="pay_pwd == '1'" v-model="usepwd" type="password" placeholder="请输入原支付密码" />
            </div>

            <div class="dl" @click="modifyPwd">
                {{ isLoading ? '正在提交...' : '确定' }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.topay_warp {
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
        top: 120rpx;

        .logon_help {
            font-size: 32rpx;
            width: 80%;
            margin: auto;
            color: #fff;
            text-align: right;
        }

        .logon_telte {
            padding: 40rpx 60rpx 0;
            text-align: center;

            image {
                width: 20%;
            }

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

        .logon_wj {
            text-align: center;
            display: block;
            font-size: 28rpx;
            color: #fff;
            margin-top: 60rpx;
        }
    }

    .shuru {
        background-color: #fff;
        padding: 40rpx;
        top: 240rpx;
        width: 100%;
        height: 73%;
        position: relative;
        border-top-left-radius: 30rpx;
        border-top-right-radius: 30rpx;

        .shu {
            padding: 40rpx 60rpx;

            input {
                border-radius: 10rpx;
                background: #f7fafc;
                width: 100%;
                line-height: 110rpx;
                padding-left: 40rpx;
                height: 110rpx;
                font-size: 32rpx;
                color: #000;
                margin-top: 20rpx;
            }

            p {
                margin-top: 20rpx;
                font-size: 28rpx;
                color: #000;
            }
        }

        .dl {
            padding-bottom: 40rpx;
            width: 85%;
            margin: 40rpx auto 0;
            text-align: center;
            color: #fff;
            font-size: 32rpx;
            background-color: #16cee5;
            border-radius: 159rpx;
            line-height: 90rpx;
            height: 90rpx;
        }
    }
}
</style>
