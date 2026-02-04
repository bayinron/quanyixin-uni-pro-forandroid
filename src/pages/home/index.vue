<template>
    <view class="home-container">
        <!-- 顶部轮播图 -->
        <swiper class="swiper" circular autoplay interval="3000" duration="500">
            <swiper-item v-for="(item, index) in slides" :key="index">
                <image class="swiper-image" :src="useUserStore().prefixUrl + item.pic" mode="aspectFill" />
            </swiper-item>
        </swiper>

        <!-- 消息通知栏 -->
        <uv-notice-bar class="notice-bar" :text="noticeText" mode="horizontal" :speed="80" bgColor="#fff" color="#606060" />
        <view class="content">
            <!-- 功能导航区 -->
            <view class="nav-grid">
                <view class="nav-item" @tap="activityClick">
                    <image class="nav-icon" src="@/static/img/hdzx.png" mode="aspectFit" />
                    <text class="nav-text">活动中心</text>
                </view>
                <view class="nav-item" @tap="financialClick">
                    <image class="nav-icon" src="@/static/img/lc.png" mode="aspectFit" />
                    <text class="nav-text">理财</text>
                </view>
                <view class="nav-item" @tap="finishClick">
                    <image class="nav-icon" src="@/static/img/jyzd.png" mode="aspectFit" />
                    <text class="nav-text">交易账单</text>
                </view>
                <!-- <view class="nav-item" @tap="signinClick">
                    <image class="nav-icon" src="@/static/img/qd.png" mode="aspectFit" />
                    <text class="nav-text">签到</text>
                </view> -->
                <view class="nav-item" @tap="goldeneggsClick">
                    <image class="nav-icon" src="@/static/img/zjd.png" mode="aspectFit" />
                    <text class="nav-text">福利活动</text>
                </view>
                <view class="nav-item" @tap="inviteClick">
                    <image class="nav-icon" src="@/static/img/lhb.png" mode="aspectFit" />
                    <text class="nav-text">领红包</text>
                </view>
            </view>
            <view class="qdbar" @tap="signinClick">
                <image class="qdbarimg" src="@/static/img2/qdbar.png" mode="widthFix" />
            </view>
            <!-- 视频区域 -->
            <view class="video-section">
                <!-- <video id="homeVideo" :src="getVedio2" :controls="true" :show-play-btn="true" :autoplay="true" :loop="false" object-fit="cover" class="video-player" :show-fullscreen-btn="false" :enable-progress-gesture="false" /> -->
                <video id="homeVideo" :src="getVedio2" mode="widthFix" object-fit="cover" class="video-player"></video>
            </view>

            <!-- 业务介绍区 -->
            <view class="business-grid">
                <!-- 左侧大块企业简介 -->
                <view class="business-item large" @tap="platformClick">
                    <image class="business-icon" src="@/static/img/qyjj.png" mode="aspectFit" />
                    <text class="business-text">企业简介</text>
                </view>
                <!-- 右侧小块区域 -->
                <view class="business-right">
                    <view class="business-item small" @tap="aboutClick">
                        <image class="business-icon" src="@/static/img/yyzz.png" mode="aspectFit" />
                        <text class="business-text">营业执照</text>
                    </view>
                    <view class="business-item small" @tap="teamruleClick">
                        <image class="business-icon" src="@/static/img/qygz.png" mode="aspectFit" />
                        <text class="business-text">企业规则</text>
                    </view>
                    <view class="business-item small" @tap="teamjzClick">
                        <image class="business-icon" src="@/static/img/qyjz.png" mode="aspectFit" />
                        <text class="business-text">企业机制</text>
                    </view>
                    <view class="business-item small" @tap="noviceClick">
                        <image class="business-icon" src="@/static/img/xskt.png" mode="aspectFit" />
                        <text class="business-text">新手课堂</text>
                    </view>
                </view>
            </view>

            <!-- 热门活动 -->
            <view class="hot-section">
                <view class="section-header">
                    <text class="section-title">热门活动</text>
                </view>
                <view class="hot-links">
                    <text class="hot-link" v-for="(item, index) in hotList" @tap="handleHotLink(item.con)">{{ item.title }}</text>
                </view>
            </view>

            <!-- 会员动态 -->
            <view class="member-section">
                <view class="section-header">
                    <text class="section-title">会员动态</text>
                </view>
                <swiper class="member-swiper" vertical :circular="true" :autoplay="true" :interval="3000" :duration="1000" :display-multiple-items="5">
                    <swiper-item v-for="(item, index) in dongdaiList" :key="index" class="swiper-item">
                        <view class="member-item">
                            <text class="member-phone">{{ item.usename }}</text>
                            <text class="member-amount">{{ item.moneys }}</text>
                            <text class="member-time">{{ item.addtime }}</text>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
        </view>

        <!-- 弹窗消息 -->
        <uni-popup ref="popup" type="center" :mask-click="true" @change="onPopupChange">
            <view class="popup-content">
                <view class="popup-message">
                    <div v-html="popMsg"></div>
                </view>
                <view class="popup-close goldbtn" @tap="closePopup">
                    <text>确定</text>
                </view>
            </view>
        </uni-popup>

        <customer-service />
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getIndex, getbanner, getuserdetail } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
const userStore = useUserStore();

// 弹窗相关
const popup = ref();
const showPopup = ref(false);

// 轮播图数据
const bannerList = ref([1, 2, 3]); // 示例数据
const dongdaiList = ref<any[]>([]); // 示例数据
// 通知文本
const noticeText = ref('定期更换，切勿保存充值卡号信息，造成损失概不负责');
const getVedio2 = computed(() => {
    return userStore.prefixUrl + '/index.mp4';
});
let videoContext: any = null;

// 会员动态数据
const memberList = ref([
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' },
    { phone: '150****3280', amount: '¥6118.00', time: '2024-01-18' }
]);

const popMsg = ref<any>('欢迎进入全意信！');

// 弹窗控制方法
const onPopupChange = (e: any) => {
    showPopup.value = e.show;
};

const closePopup = () => {
    popup.value.close();
};

const openPopup = () => {
    popup.value.open();
};

// 导航点击处理
const handleNavClick = (type: string) => {
    // 处理导航点击
    console.log('nav click:', type);
};

// 业务模块点击处理
const handleBusinessClick = (type: string) => {
    // 处理业务模块点击
    console.log('business click:', type);
};

// 热门链接点击处理
const handleHotLink = (con: string) => {
    // 处理热门链接点击
    window.open(con);
};

// 理财点击处理
const financialClick = () => {
    uni.navigateTo({
        url: '/pages/financial/index'
    });
};

// 活动中心点击处理
const activityClick = () => {
    uni.navigateTo({
        url: '/pages/activity/index'
    });
};

// 交易账单点击处理
const finishClick = () => {
    uni.navigateTo({
        url: '/pages/finish/index'
    });
};

// 金蛋点击处理
const goldeneggsClick = () => {
    uni.navigateTo({
        url: '/pages/goldeneggs/index'
    });
};

// 签到点击处理
const signinClick = () => {
    uni.navigateTo({
        url: '/pages/signin/index'
    });
};

// 邀请点击处理
const inviteClick = () => {
    uni.navigateTo({
        url: '/pages/invite/index'
    });
};

// 企业文化点击处理
const platformClick = () => {
    uni.navigateTo({
        url: '/pages/platform/index'
    });
};

// 营业执照点击处理
const aboutClick = (type: string) => {
    uni.navigateTo({
        url: '/pages/aboutus/index'
    });
};

// 企业机制点击处理
const teamruleClick = () => {
    uni.navigateTo({
        url: '/pages/teamrule/index'
    });
};

// 企业机制点击处理
const teamjzClick = () => {
    uni.navigateTo({
        url: '/pages/teamjz/index'
    });
};

// 新手教程点击处理
const noviceClick = () => {
    uni.navigateTo({
        url: '/pages/novice/index'
    });
};

const indexData = ref<any>({});
const ulList = ref<any[]>([]);
const adv_ = ref(false);
const marginTop = ref(0);
const marginIndex = ref(0);
const list = ref<any[]>([]);
const slides = ref<any[]>([]);
const userInfo = ref<any>({});
const hotList = ref<any[]>([]);
const getIndexData = () => {
    getIndex().then(function (res: any) {
        indexData.value = res;
        ulList.value = indexData.value.gonggao;
        noticeText.value = ulList.value[0].usename;
        hotList.value = indexData.value.zixun;
        dongdaiList.value = indexData.value.dongdai;
// indexData.value.tanchuang="欢迎来到全意信欢迎来到全意信欢迎来到全意信欢迎来到全意信欢迎来到全意信欢迎来到全意信"
        // 处理弹窗数据
        if (indexData.value.tanchuang && indexData.value.tanchuang !== '' ) {
            popMsg.value = indexData.value.tanchuang;
            // 延迟显示弹窗，确保组件已渲染
            setTimeout(() => {
                openPopup();
                window.localStorage.setItem('advshow', 'true');
            }, 500);
        }

    });
};

const getBanner = () => {
    getbanner().then(function (res: any) {
        slides.value = res.banner;
    });
};

const InitData = () => {
    getuserdetail().then(function (res: any) {
        userInfo.value = res;
    });
};

onLoad(() => {
    getBanner();
    InitData();
    getIndexData();
    videoContext = uni.createVideoContext('homeVideo');
});

onShow(() => {
    // if (videoContext) {
    //     videoContext.play();
    // }
});

onHide(() => {
    if (videoContext) {
        videoContext.stop();
        videoContext.seek(0);
    }
});

onUnload(() => {
    if (videoContext) {
        videoContext.stop();
        videoContext.seek(0);
    }
});
</script>

<style lang="scss" scoped>
.home-container {
    min-height: 100vh;
    background-color: #000;
}

.swiper {
    width: 100%;
    height: 400rpx;

    &-image {
        width: 100%;
        height: 100%;
    }
}

.notice-bar {
    margin: 20rpx;
    border-radius: 20rpx;
}
.content {
    background: linear-gradient(to right, #fff6eb 0%, #fffcf9 29%);
    border-radius: 40rpx 40rpx 0 0;
}

.nav-grid {
    display: flex;
    flex-wrap: wrap;
    padding: 0rpx;
    // background-color: #fff;
    border-radius: 20rpx;
    margin: 0 20rpx;

    .nav-item {
        // width: 16.66%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20rpx 0;

        .nav-icon {
            width: 80rpx;
            height: 80rpx;
            margin-bottom: 10rpx;
        }

        .nav-text {
            font-size: 24rpx;
            color: #333;
        }
    }
}
.qdbar {
    position: relative;
    width: 100%;
    padding: 20rpx;
    // height: 100rpx;
    background-color: #fff;
    .qdbarimg {
        width: 100%;
        height: auto;
    }
}
.video-section {
    margin: 20rpx;
    border-radius: 20rpx;
    overflow: hidden;

    .video-player {
        width: 100%;
        height: 400rpx;
    }
}

.business-grid {
    display: flex;
    padding: 0rpx;
    background-color: transparent;
    border-radius: 20rpx;
    margin: 20rpx;
    gap: 20rpx;

    .business-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // background: #fff;
        //背景弄错渐变色，从上到下#e6effe - #fff
        background: #d7bf8c1f;
        border-radius: 20rpx;
        border: 1rpx solid #f2e9dc;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);

        &.large {
            width: 40%;
            height: 360rpx;
            padding: 40rpx;

            .business-icon {
                width: 140rpx;
                height: 140rpx;
                margin-bottom: 20rpx;
            }

            .business-text {
                font-size: 28rpx;
                color: #333;
            }
        }
    }

    .business-right {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 20rpx;

        .business-item.small {
            height: 170rpx;
            padding: 20rpx;

            .business-icon {
                width: 80rpx;
                height: 80rpx;
                margin-bottom: 10rpx;
            }

            .business-text {
                font-size: 24rpx;
                color: #333;
            }
        }
    }
}

.hot-section {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;

    .section-header {
        margin-bottom: 20rpx;

        .section-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }
    }

    .hot-links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20rpx;

        .hot-link {
            color: #855100;
            font-size: 28rpx;
            width: 48%;
        }
    }
}

.member-section {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;

    .section-header {
        margin-bottom: 20rpx;

        .section-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
        }
    }

    .member-swiper {
        height: 280rpx; // 根据你想显示的条目数量调整高度
    }

    .swiper-item {
        height: 60rpx; // 每个项目的高度
    }

    .member-item {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20rpx;

        .member-phone {
            color: #333;
            font-size: 28rpx;
        }

        .member-amount {
            color: #855100;
            font-size: 28rpx;
        }

        .member-time {
            color: #999;
            font-size: 24rpx;
        }
    }
}

// 弹窗样式
.popup-content {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    width: 600rpx;
    text-align: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.popup-message {
    margin-bottom: 40rpx;

    text {
        font-size: 32rpx;
        color: #333;
        line-height: 1.5;
    }
}

.popup-close {
    background: linear-gradient(to right, #f4be43, #ffd700);
    color: #fff;
    padding: 10rpx 60rpx;
    border-radius: 50rpx;
    font-size: 24rpx;
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
    }
}
</style>
