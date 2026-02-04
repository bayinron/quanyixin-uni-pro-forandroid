<template>
    <div class="edit_info_wrap">
        <div class="recharge_input_con">
            <p class="recharge_title" style="margin-top: 20rpx">头像</p>

            <uv-upload :fileList="fileList1" name="6" @afterRead="afterRead" @delete="deletePic" :maxCount="1" width="250" height="150">
                <image mode="widthFix" src="@/static/imgs/add.png" alt="" />
            </uv-upload>

            <div class="common_btn" style="margin-top: 40rpx; background-color: #16cee5 !important" @click="handleSubmit">确定</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userPic } from '../../api/getdata';
const pingzheng = ref<HTMLInputElement | null>(null);

const src = ref('');
const isLoading = ref(false);
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
                };
            })
            .catch((error) => {
                console.error('Error converting to Base64:', error);
            });
    });
};


const handleSubmit = async () => {
    if (!src.value) {
        uni.showToast({
            title: '请上传头像',
            icon: 'none'
        });
        return;
    }

    isLoading.value = true;

    try {
        const res: any = await userPic(src.value);
        if (res.result) {
            uni.showToast({
                title: '修改成功',
                icon: 'success'
            });
            uni.switchTab({
                url: '/pages/home/my'
            });
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.edit_info_wrap {
    background-color: #16cee5;
    height: 100%;
    padding-bottom: 40rpx;
    padding-top: 0rpx;
    overflow: scroll;

    .common_btn {
        background-color: #16cee5;
        width: 100%;
        margin: 40rpx auto 0;
        display: block;
        line-height: 80rpx;
        border-radius: 10rpx;
        color: #fff;
        border: 0;
        text-align: center;
        font-size: 28rpx;
        border: 1px solid #009bff;
    }

    .edit_info_bg {
        height: 50%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .recharge_money_con {
        width: 90%;
        margin: 40rpx auto 0;
        position: relative;
        padding: 40rpx 0 80rpx;

        .recharge_con_money_bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
        }

        div {
            position: relative;
            z-index: 4;
            text-align: center;

            p {
                font-size: 28rpx;
                line-height: 60rpx;
            }

            span {
                display: block;
                font-size: 40rpx;
            }
        }
    }

    .recharge_input_con {
        position: relative;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 20rpx;
        z-index: 8;
        width: 90%;
        padding: 30rpx;
        margin: 40rpx auto 0;

        .recharge_title {
            color: #000000;
            line-height: 70rpx;
            font-size: 28rpx;
        }

        .rechrge_money {
            display: block;
            width: 100%;
            border-color: rgba(74, 101, 218, 0.4);
            line-height: 80rpx;
            background: none;
            height: 80rpx;
        }

        image {
            width: 200rpx;
            margin-top: 8rpx;
            height: 200rpx;
        }
    }

    .tips {
        width: 90%;
        margin: 20rpx auto;
        color: #fff;
        position: relative;
        z-index: 2;
        font-size: 28rpx;
    }
}
</style>
