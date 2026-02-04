<template>
    <view 
        class="customer-service"
        :style="{ left: position.x + 'px', top: position.y + 'px' }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @tap="getUrl"
    >
        <image 
            class="chat_icon" 
            :src="'/static/img/kkkfff.png'" 
            mode="widthFix" 
            
        />
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const position = ref({
    x: 0,
    y: 0
});

let startX = 0;
let startY = 0;
let isDragging = false;
let startTime = 0;

// 将rpx转换为px
const rpxToPx = (rpx: number) => {
    const systemInfo = uni.getSystemInfoSync();
    return (rpx * systemInfo.windowWidth) / 750;
};

onMounted(() => {
    const systemInfo = uni.getSystemInfoSync();
    // 设置初始位置在右下角，距离右边和底部各100rpx
    position.value = {
        x: systemInfo.windowWidth - rpxToPx(180), // 120rpx(图标宽度) + 100rpx(右边距)
        y: systemInfo.windowHeight - rpxToPx(220) // 120rpx(图标高度) + 100rpx(底部边距)
    };
});

const touchStart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    startTime = Date.now();
    startX = e.touches[0].clientX - position.value.x;
    startY = e.touches[0].clientY - position.value.y;
    isDragging = false;
};

const touchMove = (e: any) => {
    const moveX = Math.abs(e.touches[0].clientX - (startX + position.value.x));
    const moveY = Math.abs(e.touches[0].clientY - (startY + position.value.y));
    
    // 如果移动距离超过5px，认为是拖动
    if (moveX > 5 || moveY > 5) {
        isDragging = true;
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (isDragging) {
        position.value.x = e.touches[0].clientX - startX;
        position.value.y = e.touches[0].clientY - startY;
    }
};

const touchEnd = (e: any) => {
    const endTime = Date.now();
    const touchDuration = endTime - startTime;
    
    // 如果移动距离很小且触摸时间小于200ms，认为是点击
    if (!isDragging && touchDuration < 200) {
        getUrl();
        return;
    }
    
    if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const windowWidth = uni.getSystemInfoSync().windowWidth;
        const windowHeight = uni.getSystemInfoSync().windowHeight;
        
        // 确保图标不会移出屏幕，使用px单位
        const iconWidth = rpxToPx(120);
        const iconHeight = rpxToPx(120);
        position.value.x = Math.max(0, Math.min(position.value.x, windowWidth - iconWidth));
        position.value.y = Math.max(0, Math.min(position.value.y, windowHeight - iconHeight));
    }
};

const getUrl = (type: string='chat') => {
    const token = uni.getStorageSync('token');
    const url = `/api/kefu_url.php?token=${token}&type=${type}`;
    uni.navigateTo({
        url: '/pages/chatcon/index?url=' + url
    });
};
</script>

<style lang="scss" scoped>
.customer-service {
    position: fixed;
    z-index: 999;
}
.chat_icon {
    width: 120rpx;
    height: auto;
    z-index: 898;
}
</style>