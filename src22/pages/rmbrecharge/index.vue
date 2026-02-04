<template>
    <div class="rmbrecharge_wawrp">
        <div class="recharge_warp">
            <div class="cz_wrap">
                <div class="yue_wrap">
                    <div class="yue">
                        <span>{{ userInfo.benjin }}</span>
                        <p>账户余额(元)</p>
                    </div>
                </div>
            </div>

            <div class="qing">请选择充值金额</div>
            <div class="choose_money" style="margin-top: 40rpx">
                <div v-for="amount in amounts" :key="amount" :class="{ active: money.toString() == amount }" @click="selectAmount(Number(amount))">
                    {{ amount }}
                </div>
            </div>

            <div class="pz">
                <p>上传付款凭证信息</p>
                <div class="pz_img">
                    <uv-upload class="pz_img_upload" :fileList="fileList1" name="6" @afterRead="afterRead" :width="imgWidth" :height="imgHeight" @delete="deletePic" :maxCount="1">
                        <image class="dxc_img" mode="widthFix" src="@/static/img/dxc.png" alt="" />
                    </uv-upload>
                </div>
            </div>

            <image mode="widthFix" class="kf" src="@/static/img/kkkfff.png" alt="" @click="getUrl('chat')" />

            <div class="kfxq">
                <p>由于充值会员过多，为方便会员充值，会员在每一次充值之前请先联系在线客服索取专属收款银行卡号再进行转账充值，转账成功以后请联系在线客服核实。</p>
            </div>

            <div class="zf" @click="handleSubmit">
                <p>已完成支付</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { bankRecharge, getuserdetail } from '../../api/getdata';

interface UserInfo {
    benjin: string;
    pay_pwd: string;
}

const userInfo = ref<UserInfo>({} as UserInfo);
const money = ref<number>(0);
const src = ref('');
const amounts = ['200', '500', '1000', '2000', '5000', '10000', '50000', '100000', '200000'];

const pingzheng = ref<HTMLInputElement | null>(null);
const url = ref<string | null>(null);
const type = ref<string | null>(null);
const fileList1 = ref<any>([]);
const imgWidth = ref<string>('375rpx');
const imgHeight = ref<string>('500rpx');
// 删除图片
const deletePic = (event: any) => {
    fileList1.value.splice(event.index, 1);
};
// 新增图片
const afterRead = async (event: any) => {
    // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
    let lists = Array.isArray(event.file) ? event.file : [event.file];
    let fileListLen = fileList1.value.length;
    lists.forEach((item: any) => {
        fetch(item.url)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    fileList1.value.push({
                        ...item,
                        status: 'local',
                        message: '本地已读取',
                        base64: base64data // 存储 Base64 编码
                    });

                    // console.log('Base64:', base64data);
                    src.value = base64data;

                    // 创建 Image 对象获取图片尺寸
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        console.log('Image dimensions:', width, height);
                        imgWidth.value = '375rpx';
                        imgHeight.value = (height / width) * 375 + 'rpx';
                    };
                    img.src = base64data;
                };
            })
            .catch((error) => {
                console.error('Error converting to Base64:', error);
            });
    });
};
const selectAmount = (amount: number) => {
    money.value = amount;
};

const handleSubmit = () => {
    if (!money.value) {
        uni.showToast({
            title: '请输入转账金额',
            icon: 'none'
        });
        return;
    }

    if (!src.value) {
        uni.showToast({
            title: '请上传支付凭证',
            icon: 'none'
        });
        return;
    }

    bankRecharge(money.value.toString(), src.value, '1', '').then((data: any) => {
        uni.showToast({
            title: '提交成功',
            icon: 'success'
        });
        uni.navigateBack();
    });
};
const getUrl = (_type: string) => {
    uni.navigateTo({
        url: `/pages/chatcon/index`
    });
};
const initData = () => {
    getuserdetail().then((data: any) => {
        userInfo.value = data;
        uni.setStorageSync('pay_pwd', data.pay_pwd);
    });
};

onMounted(() => {
    initData();
});
</script>

<style lang="scss" scoped>
.rmbrecharge_wawrp {
    height: 100%;
    position: relative;
    background-color: #eff9ff;
    padding-bottom: 20rpx;
    .pz_image {
        width: 710rpx;
        margin: 0 auto;
        margin-top: 20rpx !important;
        // text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        :deep(img) {
            /* 固定宽度 */
            /* 宽度占父容器的百分比 */
            width: 50%;

            /* 保持宽高比 */
            object-fit: contain;
        }
        :deep(.uv-upload__wrap__preview__image) {
            margin-top: 4rpx;
            width: 100%;
            height: 100px;
        }
        :deep(.uv-upload__wrap) {
            justify-content: center;
            align-items: center;
        }
    }
    .customer_bg {
        position: absolute;
        top: -60rpx;
        width: 100%;
    }

    .recharge_warp {
        position: relative;
        z-index: 9;

        .cz_wrap {
            position: relative;
            top: 20rpx;
            text-align: center;

            .yue_wrap {
                left: 50rpx;
                width: 100%;

                .yue {
                    p {
                        font-size: 28rpx;
                    }

                    span {
                        font-size: 52rpx;
                        font-weight: bold;
                    }
                }
            }
        }

        .recharge {
            p {
                color: #000000;
                font-size: 28rpx;

                span {
                    float: right;
                    color: #999999;
                    font-size: 28rpx;
                }
            }

            input {
                width: 100%;
                height: 80rpx;
                margin-top: 20rpx;
                background-color: #f8f8f8;
                font-size: 28rpx;
            }
        }

        .pz {
            width: 95%;
            margin: 0 auto;
            border-radius: 10rpx;
            padding-bottom: 40rpx;

            input {
                width: 340rpx !important;
                border-radius: 20rpx;
                line-height: 70rpx !important;
                height: 70rpx !important;
            }

            p {
                padding-top: 40rpx;
                color: #000000;
                font-size: 40rpx;
                text-align: center;
                font-weight: 600;
            }

            div {
                background-color: #d4e2eb;
                width: 95%;
                display: block;
                margin: 0 auto;
            }
        }

        .kf {
            position: fixed;
            right: 20rpx;
            width: 30%;
            bottom: 380rpx;
        }

        .kfxq {
            margin: 100rpx 40rpx;

            p {
                color: #888888;
                font-size: 24rpx;
            }
        }

        .zf {
            width: 90%;
            margin: 0 auto;
            background-color: #16cee5;
            color: #ffffff;
            font-weight: bold;
            font-size: 32rpx;
            text-align: center;
            line-height: 96rpx;
            border-radius: 40rpx;
            margin-top: 40rpx;
        }
    }

    .ts {
        padding: 0 40rpx 60rpx 40rpx;
        margin-top: 20rpx;

        span {
            font-size: #333333;
            font-size: 28rpx;
        }

        p {
            font-size: 24rpx;
            color: #888888;
            margin-top: 10rpx;
        }
    }

    .choose_day {
        max-height: 900rpx;
        overflow: scroll;

        div {
            width: 22%;
            float: left;
            text-align: center;
            font-size: 28rpx;
            border-radius: 20rpx;
            border: 1px solid #e5e5ee;
            margin: 10rpx 1.5%;
            line-height: 76rpx;
        }

        .active {
            background-color: #005aff;
            color: #fff !important;
        }
    }
    .qing {
        line-height: 80rpx;
        font-size: 32rpx !important;
        color: #000 !important;
        padding-left: 20rpx !important;
    }

    .choose_money {
        width: 94%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;

        div {
            width: 30%;
            float: left;
            margin: 0 1.6%;
            background: white;
            font-size: 32rpx;
            height: 90rpx;
            line-height: 90rpx;
            text-align: center;
            border-radius: 6px;
            margin-bottom: 20rpx;
        }

        .active {
            background: #16cee5;
            color: #fff;
            font-weight: bold;
        }
    }
}
.pz_img_upload {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
    padding: 20rpx;
    .dxc_img {
        width: 200rpx;
        
        display: block;
    }
}
</style>
