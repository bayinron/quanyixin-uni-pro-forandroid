<template>
    <div class="Topup_warp">
        <div class="Topup_warp1">
            <div class="Topup_warp3">
                <p>收款地址<span></span></p>
            </div>
            <div class="Topup_warp4">
                <input v-model="usdt" type="text" placeholder="TRC20 地址" />
            </div>

            <div class="Topup_warp3">
                <p>数量<span>USDT</span></p>
            </div>
            <div class="Topup_warp4">
                <input v-model="money" type="text" placeholder="请输入充值数量" />
            </div>
            <p>上传付款凭证信息</p>
            <div class="pz">
                <uv-upload :fileList="fileList1" name="6" :width="imgWidth" :height="imgHeight" @afterRead="afterRead" @delete="deletePic" :maxCount="1" width="125" height="125">
                    <image mode="widthFix" src="@/static/img/dxc.png" alt="" />
                </uv-upload>
            </div>
            <div class="zf">
                <p style="color: aliceblue" @click="submit">确认支付</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { bankRecharge, getuserdetail } from '../../api/getdata';
const imgWidth = ref<string>('375rpx');
const imgHeight = ref<string>('500rpx');
const usdt = ref('');
const money = ref('');
const src = ref('');
const con = ref('');
const fileList1 = ref<any>([]);

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

                    console.log('Base64:', base64data);
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

function submit() {
    if (!usdt.value || !money.value || !src.value) return;

    bankRecharge(money.value, src.value, usdt.value, con.value, '2').then((data: any) => {
        if (data.result === 'true') {
            uni.navigateBack();
        }
    });
}
</script>

<style lang="scss" scoped>
.Topup_warp {
    background-color: #eff9ff;
    height: 100%;
    padding-top: 40rpx;

    .Topup_warp1 {
        width: 90%;
        margin: 0rpx auto 0;

        .Topup_warp2 {
            position: relative;

            p {
                color: #000000;
                font-size: 28rpx;
                font-weight: 500;
            }

            input {
                margin-top: 30rpx;
                width: 100%;
                line-height: 90rpx;
                height: 110rpx;
                font-size: 28rpx;
                border: 0;
                padding-left: 40rpx;
            }

            image {
                position: absolute;
                width: 6%;
                display: block;
                z-index: 33;
                top: 104rpx;
                right: 20rpx;
            }
        }

        .Topup_warp3 {
            margin-top: 40rpx;

            p {
                font-size: 28rpx;
                color: #000;
            }
        }

        .Topup_warp4 {
            margin-top: 40rpx;
            background-color: #ffffff;
            border-radius: 30rpx;

            input {
                width: 100%;
                line-height: 90rpx;
                height: 90rpx;
                font-size: 28rpx;
                border: 0;
                padding-left: 40rpx;
            }
        }

        p {
            color: #000000;
            font-size: 28rpx;
            font-weight: 700;
            margin-top: 40rpx;
        }

        .pz {
            width: 100%;
            margin: 40rpx auto;
            background-color: #d4e2eb;
            border-radius: 10rpx;
            padding-bottom: 20rpx;
            padding-top: 6rpx;
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
            :deep(uni-view) {
                justify-content: center;
                flex-direction: row !important;
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
            input {
                width: 340rpx !important;
                border-radius: 20rpx;
                line-height: 70rpx !important;
                height: 70rpx !important;
            }

            div {
                background-color: #d4e2eb;
                width: 95%;
                display: block;
                margin: 20rpx auto;
                padding: 80rpx 0;

                image {
                    width: 20%;
                    display: block;
                    padding: 20rpx;
                    margin: 30rpx auto 0;
                    background-color: #d4e2eb;
                }
            }
        }

        .zf {
            width: 100%;
            margin: 0 auto;
            background-color: #16cee5;
            color: #ffffff;
            font-weight: bold;
            font-size: 32rpx;
            text-align: center;
            line-height: 96rpx;
            border-radius: 50rpx;
            margin-top: 40rpx;
            color: #fff;
        }
    }
}
</style>
