<template>
    <div class="customer-page">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />
        
        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>Hi~，有什么可以帮您！</h1>
                <p>工作时间9:00-23:00</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/globe.png" alt="" />
            </div>
            
            <!-- Service options -->
            <div class="service_options">
                <div class="option_card" @click="navigateTo('/pages/recharge/rmb')">
                    <div class="option_icon">
                        <img src="@/static/img/zzjj.png" alt="" />
                    </div>
                    <div class="option_content">
                        <h3>人民币充值</h3>
                        <p>快速充值，安全便捷</p>
                    </div>
                    <div class="option_arrow">
                        <uni-icons type="right" size="20" color="#666"></uni-icons>
                    </div>
                </div>
                
                <div class="option_card" @click="navigateTo('/pages/recharge/usdt')">
                    <div class="option_icon">
                        <img src="@/static/img/cckk.png" alt="" />
                    </div>
                    <div class="option_content">
                        <h3>USDT充值</h3>
                        <p>数字货币充值服务</p>
                    </div>
                    <div class="option_arrow">
                        <uni-icons type="right" size="20" color="#666"></uni-icons>
                    </div>
                </div>
                
                <div class="consult_btn" @click="getUrl">
                    <span>立即咨询客服</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navigateTo = (url: string) => {
    uni.navigateTo({ url });
};


const getUrl = () => {
    const token = uni.getStorageSync('token');
    const url = `/api/kefu_url.php?token=${token}&type=chat`;
    uni.navigateTo({
        url: '/pages/chatcon/index?url=' + url
    });
};
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.customer-page {
    background-color: #000;
    min-height: 100vh;
    position: relative;
    overflow: hidden;

    .bg_top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        object-fit: cover;
        z-index: 0;
    }

    .bg_bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: auto;
        object-fit: cover;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
        padding: 60rpx 40rpx;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .title_section {
            text-align: center;
            margin-bottom: 60rpx;
            margin-top: 80rpx;

            h1 {
                font-size: 56rpx;
                color: #fff;
                font-weight: bold;
                margin-bottom: 20rpx;
                line-height: 1;
            }

            p {
                font-size: 32rpx;
                color: #fff;
                line-height: 1;
                opacity: 0.9;
            }
        }

        .illustration {
            text-align: center;
            margin-bottom: 50rpx;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                width: 70%;
                max-width: 500rpx;
                height: auto;
            }
        }
        
        .service_options {
            padding: 50rpx 40rpx;
            border-radius: 30rpx;
            box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.3);
            margin-bottom: 40rpx;
            background-color: #fff;
            
            .option_card {
                background-color: #fff;
                border-radius: 20rpx;
                padding: 30rpx 20rpx;
                margin-bottom: 20rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1rpx solid #e5e7eb;
                transition: all 0.3s ease;
                
                &:last-child {
                    margin-bottom: 20rpx;
                }
                
                &:active {
                    transform: translateY(2rpx);
                    box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.1);
                }
                
                .option_icon {
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 50%;
                    background-color: #f9fafb;
                    display: flex;
                align-items: center;
                justify-content: center;
                    flex-shrink: 0;

                    img {
                        width: 50rpx;
                        height: 50rpx;
                    }
                }

                .option_content {
                    flex: 1;
                    margin-left: 20rpx;
                    
                    h3 {
                    font-size: 32rpx;
                    color: #333;
                        margin-bottom: 8rpx;
                        font-weight: 600;
                    }
                    
                    p {
                        font-size: 26rpx;
                        color: #666;
                        line-height: 1.4;
                    }
                }
                
                .option_arrow {
                    margin-left: 20rpx;
                    flex-shrink: 0;
                }
            }
            
            .consult_btn {
                width: 100%;
                text-align: center;
                color: #855100;
                font-size: 36rpx;
                background: linear-gradient(45deg, #f9dfb7, #ffc676);
                border-radius: 50rpx;
                line-height: 100rpx;
                height: 100rpx;
                font-weight: 600;
                box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                
                &:active {
                    transform: translateY(2rpx);
                    box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
}
</style>