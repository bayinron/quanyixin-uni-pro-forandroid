<template>
    <div class="transfer_wrap">
        <div class="transfer_header">
            <view class="transfer_header_left">
                <p>转账</p>
                <view class="transfer_record" @click="toTransferRecord">转账记录</view>
            </view>
            <span>请填写收款账号与金额</span>
        </div>

        <div class="transfer_form">
            <div class="form_row">
                <div class="label">收款账号</div>
                <div class="field">
                    <input v-model="touser" type="text" placeholder="请输入收款人账号" autocomplete="touser" placeholder-class="placeholder-class"/>
                </div>
            </div>
            <div class="form_row">
                <div class="label">转账金额</div>
                <div class="field">
                    <input v-model.number="money" type="number" placeholder="请输入金额" inputmode="decimal" autocomplete="money" placeholder-class="placeholder-class"/>
                </div>
            </div>
            <div class="pwd_row">
                <image mode="widthFix" src="@/static/img/suo.png" alt="" />
                <input v-model="password" type="password" placeholder="请输入提现密码" autocomplete="off" placeholder-class="placeholder-class"/>
                <!-- <a @click="goToPayPwd">忘记密码?</a> -->
            </div>

            <div class="submit_btn">
                <p @click="submit">确认转账</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { transfer } from '@/api/getdata';
import globalTool from '@/utils/globalTool';

const money = ref<number | null>(null);
const touser = ref('');
const password = ref('');

function goToPayPwd() {
    uni.navigateTo({
        url: '/pages/topay/index'
    });
}

function submit() {
    if (!validateForm()) return;
    transfer(Number(money.value), touser.value, password.value).then((data: any) => {
        if (data.result === 'true') {
            globalTool.showToast('提交成功');
            setTimeout(() => {
                uni.navigateBack();
            }, 800);
        } else if (data.msg) {
            globalTool.showToast(data.msg);
        }
    });
}

function toTransferRecord() {
    uni.navigateTo({
        url: '/pages/transfer/record'
    });
}

function validateForm() {
    if (!touser.value) {
        globalTool.showToast('请输入收款人账号');
        return false;
    }
    if (money.value === null || isNaN(Number(money.value)) || Number(money.value) <= 0) {
        globalTool.showToast('请输入正确的金额');
        return false;
    }
    if (!password.value) {
        globalTool.showToast('请输入提现密码');
        return false;
    }
    return true;
}
</script>

<style lang="scss" scoped>
.transfer_wrap {
    background: #eff9ff;
    min-height: 100vh;
    padding-bottom: 40rpx;

    .transfer_header {
        width: 90%;
        margin: 30rpx auto 20rpx;

        .transfer_header_left {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;
            
            .transfer_record {
                background-color: #fff;
                border: 1rpx solid #16cee5;
                border-radius: 30rpx;
                padding: 12rpx 24rpx;
                font-size: 26rpx;
                color: #16cee5;
                font-weight: 500;
                transition: all 0.3s ease;
                
                &:active {
                    background-color: #16cee5;
                    color: #fff;
                }
            }
        }
        
        p {
            font-size: 36rpx;
            color: #000;
            font-weight: 600;
            margin: 0;
        }
        
        span {
            font-size: 28rpx;
            color: #666;
            line-height: 1.4;
        }
    }

    .transfer_form {
        width: 90%;
        margin: 0 auto;
        
        .placeholder-class {
            font-size: 28rpx;
            color: #999;
        }
        
        .form_row {
            background: #fff;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
            overflow: hidden;
            box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

            .label {
                width: 160rpx;
                font-size: 30rpx;
                color: #333;
                font-weight: 500;
                padding: 30rpx 20rpx;
                display: flex;
                align-items: center;
            }
            
            .field {
                flex: 1;
                border-bottom: 1px solid #f0f0f0;

                input {
                    width: 100%;
                    height: 100rpx;
                    line-height: 100rpx;
                    padding: 0 20rpx;
                    border: none;
                    background: none;
                    font-size: 30rpx;
                    color: #333;
                }
            }
        }

        .pwd_row {
            background-color: #fff;
            border-radius: 12rpx;
            padding: 30rpx 20rpx;
            margin-bottom: 40rpx;
            display: flex;
            align-items: center;
            box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);

            image {
                width: 40rpx;
                height: 40rpx;
                margin-right: 20rpx;
            }
            
            input {
                flex: 1;
                border: none;
                background: none;
                font-size: 30rpx;
                color: #333;
                height: 60rpx;
                line-height: 60rpx;
            }
            
            a {
                color: #d43030;
                font-size: 26rpx;
                margin-left: 20rpx;
            }
        }

        .submit_btn {
            width: 100%;
            margin: 40rpx auto 0;

            p {
                width: 100%;
                height: 88rpx;
                line-height: 88rpx;
                text-align: center;
                background: linear-gradient(135deg, #16cee5 0%, #0fb8d4 100%);
                color: #fff;
                font-weight: 600;
                font-size: 32rpx;
                border-radius: 44rpx;
                box-shadow: 0 4rpx 12rpx rgba(22, 206, 229, 0.3);
                transition: all 0.3s ease;
                
                &:active {
                    transform: translateY(2rpx);
                    box-shadow: 0 2rpx 8rpx rgba(22, 206, 229, 0.3);
                }
            }
        }
    }
}
</style>


