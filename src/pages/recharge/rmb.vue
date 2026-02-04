<template>
    <div class="recharge-page">
        <div class="recharge_warp1">
            <div class="recharge_header">
                <div class="title_section">
                    <h1>人民币充值</h1>
                    <div class="recharge_banner">
                        <span>联系客服获取充值信息</span>
                    </div>
                </div>
                <div class="illustration_section">
                    <img src="@/static/img2/txicon.png" alt="" />
                </div>
            </div>
            
            <view class="content">
                <div class="shu">
                    <!-- <div class="choose_money">
                        <div v-for="amount in amounts" :key="amount" :class="{ active: money === amount }" @click="selectAmount(amount)">
                            {{ amount }}
                        </div>
                    </div> -->
                    <view class="input_warp">
                        <input type="number" v-model="money" placeholder="请输入充值金额" />
                    </view>
                </div>

                <div class="recharge_warp3">
                    <span class="recharge-info-title">充值信息</span>

                    <div class="upload_section">
                        <div class="upload_title">上传付款凭证信息</div>
                        <div class="pz_img">
                            <uv-upload :fileList="fileList1" name="6" @afterRead="afterRead" :width="imgWidth" :height="imgHeight" @delete="deletePic" :maxCount="1">
                                <img src="@/static/img/dxc.png" alt="" />
                            </uv-upload>
                        </div>
                    </div>

                    <div class="tips_section">
                        <div class="tips_title">温馨提示</div>
                        <div class="tips_content">由于充值会员过多，为方便会员充值，需要银行卡转账请在线客服索要专属收款银行卡号，为了实现到账成功，转账成功后请联系客服在线客服提供截图。</div>
                    </div>

                    <div class="zf">
                        <p class="goldbtn" @click="handleSubmit">已完成支付</p>
                    </div>
                </div>
            </view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { bankRecharge, getuserdetail } from '@/api/index';
import type { UserInfo } from '@/api/types';
const money  = ref<number>();


const selectAmount = (amount: number) => {
    money.value = amount;
};

const userInfo = ref<UserInfo>({} as UserInfo);
const src = ref('');
const amounts = [200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
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

    bankRecharge(  money.value.toString(),  src.value,'','' ).then((data: any) => {
        uni.showToast({
            title: data.msg,
            icon: 'success'
        });
        uni.navigateBack();
    }).catch((err: any) => {
        uni.showToast({
            title: err.msg,
            icon: 'none'
        });
    });
};
const getUrl = (_type: string) => {
    type.value = _type;
    const token = uni.getStorageSync('token');
    url.value = `/api/kefu_url.php?token=${token}&type=${_type}`;
    uni.navigateTo({
        url: `/pages/chatcon/index?url=${url.value}`
    });
    console.log(url.value);
};
const initData = () => {
    getuserdetail().then((data: any) => {
        userInfo.value = data;
        uni.setStorageSync('pay_pwd', data.pay_pwd);
    });
};

onShow(() => {
    initData();
});
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.recharge-page {
    background-color: #000;
    min-height: 100vh;
    width: 100%;
    position: relative;
    padding-bottom: 40rpx;
    padding-top: 0;
    margin-top: 0;
    
    /* 确保子元素也不会产生白色空隙 */
    * {
        box-sizing: border-box;
    }

    .recharge_warp1 {
        position: relative;
        
        .content {
            border-radius: 20rpx;
            padding: 20rpx 0;
            border: 1rpx solid #ffffff;
            width: 95%;
            margin: 0 auto;
        }
        
        .recharge_header {
            width: 90%;
            margin: 30rpx auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 20rpx;
            box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

            .title_section {
                flex: 1;
                margin-right: 30rpx;

                h1 {
                    font-size: 40rpx;
                    color: #ffffff;
                    font-weight: 700;
                    margin-bottom: 20rpx;
                    line-height: 1.2;
                }

                .recharge_banner {
                    background: linear-gradient(to right, #f9dfb7, #ffc676);
                    color: #855100;
                    font-size: 28rpx;
                    padding: 15rpx 25rpx;
                    border-radius: 15rpx;
                    display: inline-block;
                    font-weight: 600;
                    border: 2rpx dashed #855100;
                    position: relative;
                    
                    &::before {
                        content: '';
                        position: absolute;
                        top: -2rpx;
                        left: -2rpx;
                        right: -2rpx;
                        bottom: -2rpx;
                        background: linear-gradient(to right, #f9dfb7, #ffc676);
                        border-radius: 15rpx;
                        z-index: -1;
                    }
                }
            }

            .illustration_section {
                width: 180rpx;
                height: 180rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }

        .shu {
            margin-top: 20rpx;

            .choose_money {
                width: 95%;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                gap: 10rpx;
                justify-content: space-between;
                
                div {
                    width: 200rpx;
                    background: #fff;
                    font-size: 28rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    text-align: center;
                    border-radius: 12rpx;
                    margin-bottom: 20rpx;
                    box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);
                    transition: all 0.3s ease;

                    &.active {
                        background: #ae8c54;
                        color: #fff;
                        font-weight: 700;
                        box-shadow: 0 4rpx 15rpx rgba(51, 94, 248, 0.3);
                    }
                }
            }
        }
        .input_warp {
            width: 90%;
            height: 80rpx;
            margin: 20rpx auto 0;
            input {
                width: 100%;
                height: 100%;
                border: 1rpx solid #ffffff;
                border-radius: 10rpx;
                padding-left: 20rpx;
                color: #ffffff;
            }
        }
        .recharge_warp3 {
            width: 90%;
            margin: 20rpx auto 0;

            .recharge-info-title {
                display: block;
                margin: 30rpx 0;
                font-size: 32rpx;
                color: #fff;
                font-weight: 600;
            }

            .upload_section {
                background-color: #f9f1e5;
                padding: 20rpx;
                border-radius: 16rpx;
                margin-bottom: 20rpx;
                box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                .upload_title {
                    font-size: 32rpx;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 20rpx;
                }

                .pz_img {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    :deep(img) {
                        width: 50%;
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
            }

            .tips_section {
                background-color: #f9f1e5;
                padding: 20rpx;
                margin-top: 40rpx;
                border-radius: 16rpx;
                box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                .tips_title {
                    font-size: 32rpx;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 20rpx;
                }

                .tips_content {
                    font-size: 28rpx;
                    color: #ff4444;
                    line-height: 1.6;
                }
            }

            .zf {
                width: 100%;
                margin: 60rpx auto;

                p {
                    width: 100%;
                    height: 96rpx;
                    line-height: 96rpx;
                    text-align: center;
                    font-weight: 700;
                    font-size: 32rpx;
                    border-radius: 48rpx;
                    box-shadow: 0 6rpx 20rpx rgba(51, 94, 248, 0.3);
                }
            }
        }
    }
}
</style>
