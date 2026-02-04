<template>
    <view class="my-container">
        <!-- 顶部用户信息卡片 -->
        <view class="user-card">
            <view class="user-info">
                <image class="avatar" src="@/static/img2/head.png" mode="aspectFill" />
                <view class="user-detail">
                    <view class="nickname">
                        <text>昵称：{{ nickname }}</text>
                        <text class="vip-tag" @click="toAuth">{{ userInfo.renzheng == '1' ? '已认证' : '未认证' }}</text>
                    </view>
                    <view class="phone">
                        手机号：{{ userInfo.phone }}
                        <text class="vip-tag">{{ userInfo.uselevel_name }}</text>
                    </view>
                </view>
            </view>

            <!-- 账户余额区域 -->
            <view class="balance-section">
                <view class="balance-content">
                    <view class="balance-title">账户余额</view>
                    <view class="balance">
                        <text class="amount">{{ userInfo.benjin }}</text>
                        <view class="action-buttons">
                            <view class="action-btn recharge" @click="handleRecharge">
                                <image class="action-icon" src="@/static/img2/chargeicon.png" mode="aspectFit" />
                                充 值
                            </view>
                            <view class="action-btn withdraw" @click="handleWithdraw">
                                <image class="action-icon" src="@/static/img2/widthdrawicon.png" mode="aspectFit" />
                                提 现
                            </view>
                        </view>
                    </view>
                    <view class="stats-row">
                        <view class="stat-item">
                            <text class="label">累计个人分润</text>
                            <text class="value">¥{{ userInfo.fenrun }}</text>
                        </view>
                        <view class="stat-item">
                            <text class="label">昨日团队分润</text>
                            <text class="value">¥{{ userInfo.teamfenrun }}</text>
                        </view>
                        <view class="stat-item">
                            <text class="label">昨日分润</text>
                            <text class="value">¥{{ userInfo.yesfenrun }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

    
        <!-- 列表菜单 -->
        <view class="menu-list">
            <view class="menu-item" @tap="detailsClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/zhmx.png" mode="aspectFit" />
                    <text>账户明细</text>
                </view>
            </view>
            <view class="menu-item" @tap="depositClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/crjl.png" mode="aspectFit" />
                    <text>存入记录</text>
                </view>
            </view>
            <view class="menu-item" @tap="takeoutClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/qxjl.png" mode="aspectFit" />
                    <text>取现记录</text>
                </view>
            </view>
            <view class="menu-item" @tap="teamreportClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/wdtd2.png" mode="aspectFit" />
                    <text>我的团队</text>
                </view>
            </view>
            <view class="menu-item" @tap="addressClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/dzgl.png" mode="aspectFit" />
                    <text>地址管理</text>
                </view>
            </view>
            <view class="menu-item" @tap="pwdClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/zfmm.png" mode="aspectFit" />
                    <text>支付密码</text>
                </view>
            </view>
            <view class="menu-item" @tap="modifyPwdClick">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img/zfmm.png" mode="aspectFit" />
                    <text>登录密码</text>
                </view>
            </view>
            <view class="menu-item" @tap="toAuth">
                <view class="menu-left">
                    <image class="menu-icon" src="@/static/img2/jyzd.png" mode="aspectFit" />
                    <text>实名认证</text>
                </view>
            </view>
        </view>
        <view class="bot-list">
            <view class="bot-item"  @tap="inviteClick">
                <view class="bot-left">
                    <image class="bot-icon" src="@/static/img2/yqicon.png" mode="widthFix" />
                    <text>邀请好友</text>
                </view>
                <uni-icons type="arrowright" size="20" color="#000"></uni-icons>
            </view>
            <view class="bot-item"  @tap="downloadClick">
                <view class="bot-left">
                    <image class="bot-icon" src="@/static/img2/appxz.png" mode="widthFix" />
                    <text>APP 下载</text>
                </view>
                <uni-icons type="arrowright" size="20" color="#000"></uni-icons>
            </view>
            <view class="bot-item"  @tap="aboutClick">
                <view class="bot-left">
                    <image class="bot-icon" src="@/static/img2/gywmicon.png" mode="widthFix" />
                    <text>关于我们</text>
                </view>
                <uni-icons type="arrowright" size="20" color="#000"></uni-icons>
            </view>
        </view>
        <!-- 退出按钮 -->
        <view class="logout-btn" @tap="handleLogout"> 退出登录 </view>
        <customer-service />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getAuthentication, getuserdetail, getapistrade } from '@/api/index';
import CustomerService from '@/components/CustomerService.vue';

const depositClick = () => {
    uni.navigateTo({
        url: '/pages/deposit/index'
    });
};

const takeoutClick = () => {
    uni.navigateTo({
        url: '/pages/takeout/index'
    });
};
const pwdClick = () => {
    uni.navigateTo({
        url: '/pages/topay/index'
    });
};
const addressClick = () => {
    uni.navigateTo({
        url: '/pages/address/index'
    });
};
const modifyPwdClick = () => {
    uni.navigateTo({
        url: '/pages/password/index'
    });
};
const handleLogout = () => {
    uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
            if (res.confirm) {
                // 执行退出登录逻辑
                uni.removeStorageSync('token');
                uni.reLaunch({
                    url: '/pages/login/index'
                });
            }
        }
    });
};
const detailsClick = () => {
    uni.navigateTo({
        url: '/pages/details/index'
    });
};
const downloadClick = () => {
    // App/H5 统一用内置 webview 打开下载页
    uni.navigateTo({
        url: '/pages/webview/index?url=' + encodeURIComponent('https://www.ydk789.com/html')
    });
};
const handleRecharge = () => {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
};

const handleWithdraw = () => {
    uni.navigateTo({
        url: '/pages/withdrawtype/index'
    });
};

const teamreportClick = () => {
    uni.navigateTo({
        url: '/pages/teamreport/index'
    });
};

const inviteClick = () => {
    uni.navigateTo({
        url: '/pages/invite/index'
    });
};

const aboutClick = () => {
    uni.navigateTo({
        url: '/pages/platform/index'
    });
};
const userInfo = ref<any>(''); //用户信息
const tousu = ref<any>('');
const authentication = ref<any>(false);
const pay_pwd = ref<any>(0);
const initData = async () => {
    const res: any = await getuserdetail();
    userInfo.value = res;
    // 使用 uni 存储，兼容 App
    uni.setStorageSync('pay_pwd', res.pay_pwd);
};

const toAuth = () => {
    if (!authentication.value) {
        uni.navigateTo({
            url: '/pages/auth/index'
        });
    } else {
        uni.showModal({
            title: '提示',
            content: authentication.value === '未审核' ? '您已提交实名认证信息，等待审核' : '您已实名认证过！'
        });
    }
};

const getUrl = (type: string) => {
    const url = `/api/kefu_url.php?type=${type}`;
    uni.navigateTo({
        url: '/pages/chatcon/index?url=' + url
    });
};

const pwd = () => {
    uni.navigateTo({
        url: '/pages/withdrawpwd?pay_pwd=' + userInfo.value.pay_pwd
    });
};

const withdraw = () => {
    if (!authentication.value) {
        uni.showModal({
            title: '提示',
            content: '请先实名认证',
            success: () => {
                uni.navigateTo({
                    url: '/pages/auth'
                });
            }
        });
    } else {
        uni.navigateTo({
            url: '/pages/withdrawtype'
        });
    }
};
const nickname = ref<any>('');
const getAuthenticationData = async () => {
    const res: any = await getAuthentication();
    nickname.value = res.bankuser ? hideName(res.bankuser) : '';
    authentication.value = res.msg || false;
};
//对姓名进行隐藏，如果 3 个字就隐藏中间的，2 个字就隐藏最后一个
const hideName = (name: string) => {
    if (name.length === 3) {
        return name.slice(0, 1) + '*' + name.slice(2);
    } else if (name.length === 2) {
        return name.slice(0, 1) + '*';
    }
};
const getTousu = async () => {
    const res: any = await getapistrade();
    tousu.value = res.tousu;
};

const clear = () => {
    // 跳到 webview 页展示同一地址
    uni.navigateTo({
        url: '/pages/webview/index?url=' + encodeURIComponent('https://www.ydk789.com/html')
    });
};

onShow(() => {
    initData();
    getAuthenticationData();
    getTousu();
});
</script>

<style lang="scss" scoped>
.my-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #ffe8d3 90%, #ffead0 89%);
    padding-bottom: 40rpx;
}

.user-card {
    // background: linear-gradient(to bottom, #2b7fff, #1e6df7);
    // padding: 40rpx 30rpx;
    color: #fff;

    .user-info {
        display: flex;
        align-items: center;
        // margin-bottom: 30rpx;
        padding: 30rpx;
        margin-left: 40rpx;
        .avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
            margin-right: 20rpx;
        }

        .user-detail {
            color: #000;
            .nickname {
                font-size: 32rpx;
                margin-bottom: 10rpx;
                font-weight: bold;
            }

            .phone {
                font-size: 28rpx;
                opacity: 0.9;
            }
            .vip-tag {
                background: #ffd700;
                color: #333;
                padding: 4rpx 12rpx;
                border-radius: 20rpx;
                font-size: 24rpx;
                margin-left: 10rpx;
            }
        }
    }

    .balance-section {
        position: relative;
        padding: 30rpx;
        width: 96%;
        margin: 0 auto;
        border-radius: 20rpx;
        background: linear-gradient(to bottom, #1b0f08 24%, #675940 99%);

        .balance-bg {
            width: 750rpx;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .balance-content {
            position: relative;
            z-index: 2;
            .balance-title {
                font-size: 28rpx;
                color: #FFF4E7;
            }
        }
        .balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30rpx;

            .amount {
                font-size: 48rpx;
                font-weight: bold;
            }

            .action-buttons {
                display: flex;
                gap: 20rpx;

                .action-btn {
                    min-width: 160rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    font-size: 28rpx;
                    padding: 0 40rpx;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    color: #FFF4E7;

                    &::after {
                        border: none;
                    }
                    .action-icon {
                        width: 40rpx;
                        height: 40rpx;
                        margin-right: 10rpx;
                    }
                }
            }
        }

        .stats-row {
            display: flex;
            justify-content: space-between;
            padding: 20rpx 30rpx 0;
            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .label {
                    font-size: 24rpx;
                    margin-bottom: 10rpx;
                    color:#FFF4E7;
                }

                .value {
                    font-size: 28rpx;
                    font-weight: bold;
                }
            }
        }
    }
}


.quick-actions {
    background: #fff;
    margin: 20rpx;
    border-radius: 20rpx;
    padding: 30rpx 20rpx;

    .action-row {
        display: flex;
        justify-content: space-around;

        .action-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .action-icon {
                width: 80rpx;
                height: 80rpx;
                margin-bottom: 10rpx;
            }

            text {
                font-size: 24rpx;
                color: #333;
            }
        }
    }
}

.menu-list {
    background: #fff;
    margin: 20rpx;
    border-radius: 20rpx;
    display: flex;
    flex-wrap: wrap;
    border: 1rpx solid #b48a4a;

    .menu-item {
        width: 25%;
        padding: 30rpx 20rpx;
        box-sizing: border-box;

        .menu-left {
            display: flex;
            align-items: center;
            flex-direction: column;

            .menu-icon {
                width: 70rpx;
                height: 70rpx;
                margin: 10rpx 0;
            }

            text {
                font-size: 28rpx;
                color: #333;
            }
        }
    }
}
.bot-list {
    margin: 20rpx;
    .bot-item {
        margin-bottom: 20rpx;
        border-radius: 20rpx;
        display: flex;
        background: #fff;
        border: 1rpx solid #b48a4a;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10rpx 20rpx;
        .bot-left {
            display: flex;
            align-items: center;
            .bot-icon {
                width: 30rpx;
                height: 30rpx;
                margin: 0 20rpx;
            }
        }
        .bot-right {
            display: flex;
        }
    }
}
.logout-btn {
    margin: 40rpx 20rpx;
    text-align: center;
    padding: 30rpx 0;
    border-radius: 45rpx;
    font-size: 32rpx;

    color: #855100;
                font-size: 36rpx;
                background: linear-gradient(45deg, #f9dfb7, #ffc676);
                border-radius: 50rpx;
}
</style>
