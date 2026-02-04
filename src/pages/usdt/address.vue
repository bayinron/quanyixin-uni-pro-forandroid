<template>
    <div class="bind_warp">
        <!-- <img class="bind_bg" src="@/static/img/yhkbg.png" alt="" /> -->
        <div class="bind_warp1">
            <div class="bind_warp2">
                <div class="bind_warp3">
                    <p>提现网络</p>
                    <input value="USDT(trc20)" type="text" disabled />
                </div>
                <div class="bind_warp3">
                    <p>提现地址</p>
                    <input v-model="address" type="text" placeholder="请输入提现地址" />
                </div>

                <div class="bind_warp4" @click="submit" v-if="!isAdd">确定</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {  gettrc20address,addtrc20address } from '../../api/index';
import globalTool from '@/utils/globalTool';

const address = ref('');
const usdt = ref('');
function submit() {
    if (!validateForm()) return;

    addtrc20address(address.value).then((data: any) => {
        globalTool.showToast(data.msg,true);
    });
}

function validateForm() {
    if (!address.value) return false;
    return true;
}
const isAdd = ref(false);
onLoad((options: any) => {
   
});
onShow(() => {
    gettrc20address().then((data: any) => {
        address.value = data.usdt_trc20_address;
        isAdd.value = data.usdt_trc20_address.length > 0;
    });
});
</script>

<style lang="scss" scoped>
.bind_warp {
    height: 100%;
    position: relative;
    padding-top: 0rpx;

    .vux-header {
        background: none !important;
    }

    .bind_bg {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .bind_warp1 {
        position: relative;
        top: 0rpx;
        background: #fbfbfb;
        border-radius: 50rpx;
        padding-bottom: 220rpx;

        .bind_warp2 {
            width: 80%;
            margin: auto;
            padding-top: 80rpx;

            .bind_warp3 {
                p {
                    font-size: 32rpx;
                    color: #000;
                    font-weight: 600;
                    margin-top: 30rpx;
                }

                input {
                    display: block;
                    margin-top: 30rpx;
                    font-size: 32rpx;
                    color: #000;
                    border-radius: 10px;
                    background: #f7f7f7;
                    height: 96rpx;
                    line-height: 96rpx;
                    width: 100%;
                    padding-left: 20rpx;
                }

                ::-webkit-input-placeholder {
                    color: #a6a6a6;
                }
            }

            .bind_warp4 {
                border-radius: 25px;
                background-color: #16cee5;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
                font-size: 32rpx;
                color: #fff;
                line-height: 90rpx;
                height: 90rpx;
                margin-top: 60rpx;
            }
        }
    }
}
</style>
