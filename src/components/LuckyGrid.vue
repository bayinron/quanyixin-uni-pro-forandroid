<template>
    <view class="lucky-grid">
        <view class="grid-container">
            <view 
                v-for="(item, index) in prizes" 
                :key="index"
                :class="['grid-item', { active: currentIndex === index }]"
                :style="{ order: getOrder(index) }"
            >
                <image :src="item.image" mode="aspectFit" class="prize-image" />
                <text class="prize-name">{{ item.name }}</text>
                <text v-if="item.price" class="prize-price">{{ item.price }}</text>
            </view>
        </view>
        <view 
            class="start-btn"
            :class="{ 'disabled': isRunning }"
            @tap="startLottery"
        >
            立即抽奖
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    prizes: Array<{
        image: string;
        name: string;
        price?: string;
    }>;
    defaultSpeed?: number;
    defaultTimes?: number;
}>();

const emit = defineEmits(['finish']);

const isRunning = ref(false);
const currentIndex = ref(-1);
const timer = ref<any>(null);

// 定义抽奖顺序
const ORDER_MAP = [0, 1, 2, 5, 8, 7, 6, 3];

// 获取显示顺序
const getOrder = (index: number) => {
    if (index === 4) return 9; // 中间的格子放最后
    return index;
};

// 开始抽奖
const startLottery = () => {
    if (isRunning.value) return;
    
    isRunning.value = true;
    let times = 0;
    let speed = props.defaultSpeed || 200;
    const totalTimes = props.defaultTimes || 50;
    let currentOrder = 0;

    const run = () => {
        currentIndex.value = ORDER_MAP[currentOrder];
        currentOrder = (currentOrder + 1) % ORDER_MAP.length;
        times++;

        // 根据次数调整速度
        if (times > totalTimes - 10) {
            speed += 50;
        }

        if (times >= totalTimes) {
            clearTimeout(timer.value);
            isRunning.value = false;
            emit('finish', currentIndex.value);
            return;
        }

        timer.value = setTimeout(run, speed);
    };

    run();
};
</script>

<style lang="scss" scoped>
.lucky-grid {
    width: 100%;
    padding: 20rpx;
    background: #fff;
    border-radius: 20rpx;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10rpx;
    background: #f0f3f8;
    padding: 10rpx;
    border-radius: 12rpx;
}

.grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 8rpx;
    padding: 20rpx;
    transition: all 0.2s;

    &.active {
        transform: scale(0.95);
        box-shadow: 0 0 20rpx rgba(30, 109, 247, 0.3);
        background: #e6f0ff;
    }
}

.prize-image {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 10rpx;
}

.prize-name {
    font-size: 24rpx;
    color: #333;
    margin-bottom: 4rpx;
}

.prize-price {
    font-size: 22rpx;
    color: #ff6b6b;
}

.start-btn {
    margin-top: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: linear-gradient(to right, #1e6df7, #2b7fff);
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
    font-weight: bold;

    &.disabled {
        opacity: 0.7;
        pointer-events: none;
    }
}
</style> 