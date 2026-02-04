<template>
    <view class="deposit_warp">        
        <view 
            v-if="!address.id" 
            class="add-btn goldbtn"
            @click="goToAdd"
        >
            添加收货地址
        </view>
        
        <view v-else class="depo">
            <view class="address-info">
                <view class="name-phone">
                    <text class="name">{{ address.name || '-' }}</text>
                    <text class="phone">{{ address.phone }}</text>
                </view>
                <view class="address-detail">
                    {{ address.diqu }}{{ address.xiangxi }}
                </view>
                <image 
                    src="@/static/img/edit.png" 
                    mode="widthFix" 
                    @click="goToEdit" 
                />
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getaddress } from '@/api/index';

interface AddressInfo {
    id?: string;
    name: string;
    phone: string;
    diqu: string;
    xiangxi: string;
}

const address = ref<AddressInfo>({
    name: '',
    phone: '',
    diqu: '',
    xiangxi: ''
});

const back = () => {
    uni.navigateBack();
};

const goToAdd = () => {
    uni.navigateTo({
        url: '/pages/addaddress/index'
    });
};

const goToEdit = () => {
    const { id, name, phone, diqu, xiangxi } = address.value;
    uni.navigateTo({
        url: `/pages/addaddress/index?id=${id}&name=${name}&phone=${phone}&diqu=${diqu}&dizhi=${xiangxi}`
    });
};

const getData = async () => {
    const res: any = await getaddress();
    if (res.address?.data?.length) {
        address.value = res.address.data[0];
    }
};

getData();
</script>

<style lang="scss" scoped>
.deposit_warp {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 30rpx;

    .add-btn {
        width: 80%;
        height: 90rpx;
        background: #0066ff;
        border-radius: 45rpx;
        color: #fff;
        font-size: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40rpx auto;
    }

    .depo {
        .address-info {
            background: #fff;
            border-radius: 12rpx;
            padding: 30rpx;
            position: relative;

            .name-phone {
                margin-bottom: 20rpx;
                
                .name {
                    font-size: 32rpx;
                    color: #333;
                    margin-right: 20rpx;
                }

                .phone {
                    font-size: 32rpx;
                    color: #666;
                }
            }

            .address-detail {
                font-size: 28rpx;
                color: #333;
                line-height: 1.5;
            }

            image {
                position: absolute;
                right: 30rpx;
                top: 50%;
                transform: translateY(-50%);
                width: 40rpx;
                height: 40rpx;
            }
        }
    }
}
</style>
