<template>
    <view class="topay_warp">
        
        <view class="inp">
            <input 
                v-model="name" 
                type="text" 
                placeholder="请输入姓名" 
            />
            <input 
                v-model="phone" 
                type="number" 
                placeholder="请输入手机号码" 
            />
            <input 
                v-model="diqu" 
                type="text" 
                placeholder="请输入地区" 
            />
            <input 
                v-model="dizhi" 
                type="text" 
                placeholder="请输入详细地址" 
            />
        </view>
        
        <view class="qr goldbtn" @click="save">
            <text>确定</text>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { addaddress, editaddress } from '@/api/index';

interface RouteQuery {
    id?: string;
    name?: string;
    phone?: string;
    diqu?: string;
    dizhi?: string;
}

const title = ref('添加收货地址');
const name = ref('');
const phone = ref('');
const diqu = ref('');
const dizhi = ref('');
const id = ref('');

const back = () => {
    uni.navigateBack();
};

const save = async () => {
    if (!name.value) {
        return;
    }
    if (!phone.value) {
        return;
    }
    if (!diqu.value) {
        return;
    }
    if (!dizhi.value) {
        return;
    }

    if (id.value) {
        const res = await editaddress(name.value, phone.value, diqu.value, dizhi.value, id.value);
    } else {
        const res = await addaddress(name.value, phone.value, diqu.value, dizhi.value);
    }
    
    uni.navigateBack();
};

onShow(() => {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const query = currentPage.$page?.options as RouteQuery;
    
    if (query.id) {
        title.value = '编辑收货地址';
        id.value = query.id;
        name.value = query.name || '';
        phone.value = query.phone || '';
        diqu.value = query.diqu || '';
        dizhi.value = query.dizhi || '';
    }
});
</script>

<style lang="scss" scoped>
.topay_warp {
    min-height: 100vh;
    background: #fff;
    padding: 30rpx;

    .inp {
        margin-bottom: 60rpx;
        padding-top: 40rpx;

        input {
            width: 100%;
            height: 90rpx;
            border-bottom: 1px solid #eee;
            margin-bottom: 30rpx;
            font-size: 28rpx;
        }
    }

    .qr {
        width: 100%;
        height: 90rpx;
        background: #0066ff;
        border-radius: 45rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 32rpx;
    }
}
</style>
