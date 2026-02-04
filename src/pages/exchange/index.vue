<template>
    <view class="details_warp">
        

        <view v-if="List.length === 0" class="notdata">暂无数据</view>

        <template v-else>
            <!-- 兑换记录 -->
            <view class="pedo_wrap">
                <view v-for="(item, index) in List" :key="index" class="pedo">
                    <view class="content_warp">
                        <image src="@/static/img/hb.png" mode="aspectFit" />
                        <view class="content">
                            <view class="title-row">
                                <text class="name">{{ item.name }}</text>
                                <text :class="['status', item.status === '1' ? 'success' : 'failed']">{{ item.status === '1' ? '成功' : '失败' }}</text>
                            </view>
                            <text class="date">{{ item.date }}</text>
                        </view>
                        <text class="score">积分：{{ item.score }}</text>
                    </view>
                </view>
            </view>

          
        </template>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Log {
    name: string;
    date: string;
    score: string;
    status: string;//1:成功 2:失败
}

const List = ref<Log[]>([
    {
        name: '电视',
        date: '2025-01-01',
        score: '100',
        status: '1'
    },
    {
        name: '冰箱',
        date: '2025-01-01',
        score: '1100',
        status: '2'
    }
]);
</script>

<style lang="scss" scoped>
.details_warp {
    min-height: 100vh;
    background: #f5f7fa;
    padding-bottom: 20rpx;
}

.notdata {
    text-align: center;
    padding: 60rpx 40rpx;
    color: #999;
    font-size: 28rpx;
}

.pedo_wrap {
    padding: 20rpx;

    .pedo {
        background: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.04);

        .content_warp {
            padding: 24rpx 30rpx;
            display: flex;
            align-items: center;

            image {
                width: 80rpx;
                height: 80rpx;
                margin-right: 20rpx;
                border-radius: 12rpx;
                background: #fff6eb;
            }

            .content {
                flex: 1;
                min-width: 0;

                .title-row {
                    display: flex;
                    align-items: center;
                    gap: 12rpx;
                    margin-bottom: 8rpx;
                    font-size: 28rpx;
                    color: #333;

                    .name {
                        font-weight: 600;
                        font-size: 30rpx;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        max-width: 420rpx;
                    }

                    .status {
                        margin-left: 0;
                        padding: 2rpx 10rpx;
                        border-radius: 8rpx;
                        font-size: 22rpx;
                        line-height: 1.6;

                        &.success {
                            background: #e8f7e8;
                            color: #2a9a2a;
                        }

                        &.failed {
                            background: #fdeaea;
                            color: #d93d3d;
                        }
                    }
                }

                .date {
                    font-size: 24rpx;
                    color: #999;
                    display: block;
                }
            }

            .score {
                font-size: 28rpx;
                color: #333;
                font-weight: 600;
                margin-left: 20rpx;
                white-space: nowrap;
            }
        }
    }
}
</style>
