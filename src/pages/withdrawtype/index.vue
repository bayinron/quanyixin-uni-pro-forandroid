<template>
    <div class="withdraw_type_wrap">
        <!-- Background images -->
        <img class="bg_top" src="@/static/img2/bg_top.png" alt="" />
        <img class="bg_bottom" src="@/static/img2/bg_bottom.png" alt="" />
        
        <!-- Main content -->
        <div class="content">
            <!-- Title section -->
            <div class="title_section">
                <h1>选择提现方式</h1>
                <p>安全便捷的提现服务</p>
            </div>
            
            <!-- Central illustration -->
            <div class="illustration">
                <img src="@/static/img2/globe.png" alt="" />
            </div>
            
            <!-- Withdraw options -->
            <div class="withdraw_options">
                <div class="option_card" @click="goWithdraw">
                    <div class="option_icon">
                        <img src="@/static/img/bank.png" alt="" />
                    </div>
                    <div class="option_content">
                        <h3>银行卡提现</h3>
                        <p>快速到账，安全可靠</p>
                    </div>
                    <div class="option_arrow">
                        <uni-icons type="right" size="20" color="#666"></uni-icons>
                    </div>
                </div>
                
                <div class="option_card" @click="goUsdtWithdraw">
                    <div class="option_icon">
                        <img src="@/static/img/usdt.png" alt="" />
                    </div>
                    <div class="option_content">
                        <h3>USDT提现</h3>
                        <p>数字货币，全球通用</p>
                    </div>
                    <div class="option_arrow">
                        <uni-icons type="right" size="20" color="#666"></uni-icons>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import globalTool from '@/utils/globalTool';
import { gettrc20address } from '../../api/index';
function goWithdraw() {
    uni.navigateTo({
        url: '/pages/withdraw/index'
    });
}

function goUsdtWithdraw() {
    gettrc20address().then((data: any) => {
        if (data.usdt_trc20_address != '') {
            uni.navigateTo({
                url: '/pages/usdtwithdraw/index'
            });
        } else {
            globalTool.showModal('请先绑定USDT地址', () => {
                uni.navigateTo({
                    url: '/pages/usdt/address?type=usdt'
                });
            });
        }
    });
}
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.withdraw_type_wrap {
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
        
        .withdraw_options {
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
                    margin-bottom: 0;
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
        }
    }
}
</style>
