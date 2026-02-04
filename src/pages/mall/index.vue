<template>
    <view class="mall-container">
        <view class="header-banner">
            <image class="topimg" src="@/static/img2/jifen.png" mode="widthFix" />
            <view class="points-card">
                <view class="card-content">
                    <view class="points-info">
                        <text class="points-label">我的积分</text>
                        <text class="points-value">{{ shopInfo.jifen }}</text>
                    </view>
                    <view>
                        <view class="available-badge">
                            <text class="coin-icon">💰</text>
                            <text class="badge-text">可用积分</text>
                        </view>
                        <!-- <view class="record-btn" @click="handleRecord">积分记录</view> -->
                    </view>
                </view>
            </view>
        </view>
        <!-- 任务区域 -->
        <view class="tasks-section">
            <view class="task-row">
                <view class="task-item">
                    <view class="task-tab">每日签到打卡</view>
                    <view class="task-content">
                        <image class="task-icon" src="@/static/img2/car.png" mode="aspectFit" />
                        <view class="task-info">
                            <text class="task-points">+ 10 积分</text>
                        </view>
                    </view>
                </view>
                <view class="task-item">
                    <view class="task-tab">每日代还打卡</view>
                    <view class="task-content">
                        <image class="task-icon" src="@/static/img2/car.png" mode="aspectFit" />
                        <view class="task-info">
                            <text class="task-points">+ 10 积分</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="task-row">
                <view class="task-item">
                    <view class="task-tab">邀请好友成为会员</view>
                    <view class="task-content">
                        <image class="task-icon" src="@/static/img2/car.png" mode="aspectFit" />
                        <view class="task-info">
                            <text class="task-points">+ 100 积分</text>
                        </view>
                    </view>
                </view>
                <view class="task-item">
                    <view class="task-tab">参与福利活动</view>
                    <view class="task-content">
                        <image class="task-icon" src="@/static/img2/car.png" mode="aspectFit" />
                        <view class="task-info">
                            <text class="task-points">+ 200 积分</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 商城好礼标题 -->
        <view class="section-title">
            <text>商城好礼</text>
        </view>

        <!-- 商品列表 -->
        <view class="products-grid">
            <view class="product-row">
                <view class="product-item" v-for="(item, index) in shopInfo.shop" :key="index">
                    <image class="product-image" :src=" userStore.prefixUrl + item.shoppic" mode="aspectFit" />
                    <view class="product-info">
                        <text class="product-name">{{ item.shopname }}</text>
                        <view class="bottom-info">
                            <text class="product-points">{{ item.danjia }}积分</text>
                            <view class="exchange-btn" @click="handleShop(item.id)">兑</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <customer-service />

    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getShop, postQiandao, postFuli, postDaihuan, postYaoqing, postShop, getposition } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
const userStore = useUserStore();
// 状态变量
const title = ref('');
const news_con = ref('');
const type = ref(null);
const shopInfo = ref<any>({});
const show = ref(false);
const msg = ref('');
const qiandaoLoading = ref(false);
const daihuanLoading = ref(false);
const yaoqingLoading = ref(false);
const fuliLoading = ref(false);
const isLoading = ref(false);

// 获取商城数据
const GetData = () => {
    isLoading.value = true;
    getShop()
        .then((res: any) => {
            isLoading.value = false;
            console.log(res);
            shopInfo.value = res;
        })
        .catch(() => {
            isLoading.value = false;
            console.log('error');
        });
};

// 签到领取积分
const handleQiandao = () => {
    qiandaoLoading.value = true;
    postQiandao()
        .then((res: any) => {
            qiandaoLoading.value = false;
            uni.showToast({
                title: '领取成功',
                icon: 'success'
            });
            GetData();
        })
        .catch(() => {
            qiandaoLoading.value = false;
            console.log('error');
        });
};

// 兑换商品
const handleShop = (id: string) => {
    isLoading.value = true;
    postShop(id)
        .then((res: any) => {
            isLoading.value = false;
            uni.showToast({
                title: '兑换成功',
                icon: 'success'
            });
        })
        .catch(() => {
            isLoading.value = false;
            console.log('error');
        });
};

// 代还积分领取
const handleDaihuan = () => {
    daihuanLoading.value = true;
    postDaihuan()
        .then((res: any) => {
            daihuanLoading.value = false;
            uni.showToast({
                title: '领取成功',
                icon: 'success'
            });
            GetData();
        })
        .catch(() => {
            daihuanLoading.value = false;
            console.log('error');
        });
};

// 邀请积分领取
const handleYaoqing = () => {
    if (yaoqingLoading.value) {
        return;
    }

    yaoqingLoading.value = true;
    postYaoqing()
        .then((res: any) => {
            yaoqingLoading.value = false;
            uni.showToast({
                title: '领取成功',
                icon: 'success'
            });
            GetData();
        })
        .catch(() => {
            yaoqingLoading.value = false;
            console.log('error');
        });
};

// 福利积分领取
const handleFuli = () => {
    fuliLoading.value = true;
    postFuli()
        .then((res: any) => {
            fuliLoading.value = false;
            uni.showToast({
                title: '领取成功',
                icon: 'success'
            });
            GetData();
        })
        .catch(() => {
            fuliLoading.value = false;
            console.log('error');
        });
};
const handleRecord = () => {
    uni.navigateTo({
        url: '/pages/exchange/index'
    });
};
const yuebao = ref<any>({});
onShow(() => {
    GetData();
    getposition().then((res: any) => {
        yuebao.value = res;
    });
});


// 在这里可以添加页面交互逻辑
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.mall-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #000000, #F4BE43);
    padding-bottom: 40rpx;
}
.header-banner{
    width: 100%;
    // height: 400rpx;
    padding: 40rpx;
    position: relative;
    .topimg{
        width: 100%;
        height: 100%;
    }
}

@keyframes glow {
    from {
        text-shadow: 0 0 20rpx rgba(255, 215, 0, 0.8);
    }
    to {
        text-shadow: 0 0 30rpx rgba(255, 215, 0, 1), 0 0 40rpx rgba(255, 215, 0, 0.6);
    }
}

@keyframes sparkle {
    0%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes ray-glow {
    0%, 100% {
        opacity: 0.3;
    }
    50% {
        opacity: 0.7;
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20rpx);
    }
}

.tasks-section {
    background: #f5f5f5;
    margin: 0 20rpx;
    border-radius: 30rpx;
    padding: 40rpx;
    margin-top: 0rpx;
    position: relative;
    z-index: 10;
    box-shadow: 0 15rpx 35rpx rgba(0, 0, 0, 0.1);

    .task-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25rpx;

        &:last-child {
            margin-bottom: 0;
        }

        .task-item {
            width: 48%;
            background: #fff;
            border-radius: 20rpx;
            padding: 0;
            display: flex;
            flex-direction: column;
            box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.05);
            border: 1rpx solid #e9ecef;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            
            &:active {
                transform: translateY(2rpx);
                box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
            }

            .task-tab {
                position: absolute;
                top: 0;
                left: 0;
                padding: 10rpx 20rpx;
                background: linear-gradient(to right, #231601, #583A0D);
                
                border-radius: 0  0 20rpx  0;
                text-align: center;
                font-size: 24rpx;
                color: #fff;
                font-weight: 700;
                z-index: 1;
            }

            .task-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 60rpx 20rpx 20rpx;

                .task-icon {
                    width: 120rpx;
                    height: 120rpx;
                    margin-bottom: 20rpx;
                    border-radius: 15rpx;
                    object-fit: cover;
                }

                .task-info {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;

                    .task-points {
                        font-size: 26rpx;
                        color: #ff8c00;
                        font-weight: 700;
                    }

                    .exchange-btn {
                        background: #ff8c00;
                        width: 50rpx;
                        height: 50rpx;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 50rpx;
                        color: #fff;
                        font-size: 24rpx;
                        font-weight: 700;
                        box-shadow: 0 4rpx 12rpx rgba(255, 140, 0, 0.3);
                        transition: all 0.3s ease;
                        
                        &:active {
                            transform: scale(0.95);
                            box-shadow: 0 2rpx 8rpx rgba(255, 140, 0, 0.3);
                        }
                    }
                }
            }
        }
    }
}

.section-title {
    font-size: 36rpx;
    color: #fff;
    font-weight: 800;
    margin: 50rpx 30rpx 30rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.products-grid {
    padding: 0 20rpx;

    .product-row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10rpx;

        .product-item {
            width: calc(50% - 20rpx);
            margin: 10rpx;
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-radius: 25rpx;
            padding: 25rpx;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10rpx 25rpx rgba(0, 0, 0, 0.08);
            border: 1rpx solid #e9ecef;
            transition: all 0.3s ease;
            
            &:active {
                transform: translateY(2rpx);
                box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
            }

            .product-image {
                width: 100%;
                height: 300rpx;
                margin-bottom: 25rpx;
                border-radius: 15rpx;
                object-fit: cover;
            }

            .product-info {
                .product-name {
                    font-size: 30rpx;
                    color: #333;
                    margin-bottom: 20rpx;
                    display: block;
                    font-weight: 600;
                    line-height: 1.4;
                }

                .bottom-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .product-points {
                        font-size: 30rpx;
                        color: #ff6b21;
                        font-weight: 700;
                    }

                    .exchange-btn {
                        background: #f2c27d;
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 60rpx;
                        color: #fff;
                        font-size: 26rpx;
                        font-weight: 700;
                        box-shadow: 0 5rpx 15rpx rgba(0, 117, 255, 0.3);
                        transition: all 0.3s ease;
                        
                        &:active {
                            transform: scale(0.95);
                            box-shadow: 0 2rpx 8rpx rgba(0, 117, 255, 0.3);
                        }
                    }
                }
            }
        }
    }
}

.points-card {
    background: #fff;
    border-radius: 20rpx 20rpx 0 0;
    padding: 30rpx;
    margin: 0;
    box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
    border: none;
    position: relative;
    z-index: 10;

    .card-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .points-info {
            display: flex;
            flex-direction: column;

            .points-label {
                font-size: 32rpx;
                color: #333;
                font-weight: 600;
                margin-bottom: 15rpx;
            }

            .points-value {
                font-size: 72rpx;
                color: #ff8c00;
                font-weight: 800;
                line-height: 1;
            }
        }
        .record-btn{
            font-size: 24rpx;
            color: #fff;
            font-weight: 600;
            background: #2c1810;
            border-radius: 50rpx;
            padding: 12rpx 20rpx;
            text-align: center;
            margin-top: 20rpx;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
        }
        .available-badge {
            display: flex;
            align-items: center;
            background: #2c1810;
            border-radius: 50rpx;
            padding: 12rpx 20rpx;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);

            .coin-icon {
                font-size: 24rpx;
                margin-right: 8rpx;
                color: #ffd700;
            }

            .badge-text {
                font-size: 24rpx;
                color: #fff;
                font-weight: 600;
            }
        }
    }
}
</style>
