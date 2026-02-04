<template>
    <view class="repayment-container">
        <!-- 顶部图片 -->
        <!-- <view class="bg-black">
            <DaihuanRule :ruleList="ruleList" />
        </view> -->
        <!-- Tab 标签栏和内容 -->
        <RuleTab :list="ruleList" />
        <!-- 热门专区 -->
        <view class="section-title">
            <text>热门专区</text>
        </view>

        <div class="financial_warp6">
            <div   @click="go2(item)" v-for="(item, index) in datas" :key="index" class="financial_warp7">
                <image class="img-center" :src="item.pic ? prefixUrl + item.pic : '@/static/img/dkdzicon.png'" mode="widthFix"/>
                <view class="enterbtn">点击进入</view>
                <!-- 进度条 -->
                <view v-if="item.is_jd && item.is_jd !== '0'" class="progress-container">
                    <view class="progress-bar">
                        <view class="progress-fill" :style="{ width: item.jd + '%' }"></view>
                    </view>
                    <text class="progress-text">{{ item.jd }}%</text>
                </view>
            </div>
        </div>
        <customer-service />
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onShow,onLoad } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/modules/userStore';
const userStore = useUserStore();
const prefixUrl = userStore.prefixUrl;
import { getAck, getXindaiTab } from '@/api/index';
import DaihuanRule from '@/components/DaihuanRule.vue';
import RuleTab from '@/components/RuleTab.vue';
const ruleList = ref<any[]>([
    {
        title: '新人体验专享',
        content: '新人首次注册账户平台赠送5000专享体验券,代还天数为1天,代还时间结束后利润自动返还账户,体验券由系统自动回收。',
        remark: '日利率为1%(5000×1%=50/天)',
        extra: '新人添加小助手可额外获得新手奖励12元 体验券收益及新手奖励均可提现'
    },
    {
        title: '普通专区',
        content: '起始代还金额为200 最高20000',
        remark: '代还天数为1天 日利率1% 每日可代还1次',
        extra: '(每日签到可额外获得6元)'
    },
    {
        title: 'VIP1专区',
        content: '起始代还金额为10000 最高为30000,',
        remark: '需分享1位普通会员 代还天数为3天 日利率1.2% 每日可代还1次',
        extra: '(每日签到可额外获得12元)'
    }
]);
// 返回上一页
const goBack = () => {
    uni.navigateBack();
};

// 页面跳转逻辑
const handleEnter = () => {
    uni.navigateTo({
        url: '/pages/repayment/detail/index'
    });
};
interface DataItem {
  id: string;
  title: string;
  pic: string;
  px: string;
  need_yuyue: string;
  is_jd:string;//进度控制（要显示进度条），0无进度控制
  jd:string;//进度%，如1就是1%

}
const datas = ref<DataItem[]>([]);

const go111 = (px: string) => {
    if (px == '3') {
        uni.navigateTo({
            url: '/pages/mortgage/index?px=' + px
        });
    } else if (px == '2') {
        uni.navigateTo({
            url: '/pages/carloan/index?px=' + px
        });
    } else {
        uni.navigateTo({
            url: '/pages/creditcard/index?px=' + px
        });
    }
};
/**
 * 贷款垫资 id 1
 * 房贷 id 2
 * 爱心 id 3
 * 车贷 id 4
 * 企业 id 5
 * 新 贷款垫资 id 6
 * 新贷款、企业、房贷一个页面
 * 爱心单独一个页面、
 * 车贷 单独一个页面
 */
function go(item: any) {
    if (item.suo == 1) {
        uni.showToast({
            title: '等级不符，无法进入',
            duration: 2000,
            icon: 'none'
        });
        return;
    }
    if (item.isok == 1) {
        return uni.showToast({
            title: '未开放，无法进入',
            duration: 2000,
            icon: 'none'
        });
    }

    if (item.id == 1) {
        uni.navigateTo({
            url: `/pages/experience/index?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    } else if (item.id == 2 || item.id == 5 || item.id == 6) {
        uni.navigateTo({
            url: `/pages/experience/fangList?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    } else {
        uni.navigateTo({
            url: `/pages/experience/cheList?sx=${item.sx}&id=${item.id}&lname=${item.lname}`
        });
    }
}
const go2 = (item: any) => {
    if (item.px == '3') {
        uni.navigateTo({
            url: '/pages/mortgage/index?px=' + item.px
        });
    } else if (item.px == '2') {
        uni.navigateTo({
            url: '/pages/carloan/index?px=' + item.px
        });
    } else {
        uni.navigateTo({
            url: '/pages/creditcard/index?px=' + item.px + '&title=' + item.title
        });
    }
};

const getData = () => {
    uni.showLoading({
        title: '加载中',
        mask: true
    });

    getXindaiTab()
        .then((res: any) => {
            uni.hideLoading();
            datas.value = res.data;
            //模拟测试数据，修改进度条数据
            // datas.value.forEach((item)=>{
            //     item.is_jd  = '1';
            //     item.jd = "20";
            //     return item;
            // })
        })
        .catch((err) => {
            uni.hideLoading();
            uni.showToast({
                title: JSON.stringify(err),
                duration: 2000,
                icon: 'none'
            });
            console.log('error');
        });
};

onShow(() => {
    getData();
});
onLoad(() => {
    getAck().then((res: any) => {
        ruleList.value = res.data;
        // ruleList.value.forEach(element => {
        //     element.title = "vip1"
        // });
        let lastItem = ruleList.value.pop();
        ruleList.value.splice(1,0,lastItem);
    });
});
</script>

<style lang="scss" scoped>
.repayment-container {
    min-height: 100vh;
    background-color: #f5f7ff;
    position: relative;
}

.custom-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;

    .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
        padding: 0 15px;

        .nav-left {
            width: 60rpx;
            display: flex;
            align-items: center;

            .nav-icon {
                font-size: 40rpx;
                color: #fff;
                font-weight: bold;
            }
        }

        .nav-title {
            flex: 1;
            text-align: center;
            font-size: 34rpx;
            color: #fff;
            font-weight: bold;
        }

        .nav-right {
            width: 60rpx;
        }
    }
}

.top-banner {
    width: 100%;
    display: block;
}

.bottom-banner {
    width: 100%;
    display: block;
    image {
        width: 100%;
        display: block;
        border: 1px solid blue;
    }
}

.section-title {
    background: #d4a35f;
    padding: 20rpx 30rpx;
    margin-top: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    box-shadow: 0 4rpx 15rpx rgba(51, 94, 248, 0.2);
}

.financial_warp6 {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10rpx;

    .financial_warp7 {
        position: relative;
        margin-top: 20rpx;
        position: relative;
        border-radius: 10rpx;
        overflow: hidden;
        border: 1px solid rgba(234, 199, 62, 0.731);
        .img-center {
            width: 100%;
            height: auto;
            display: block;
        }
        .enterbtn {
            width: 200rpx;
            height: 60rpx;
            display: flex;
            background-color: #2a62a5;
            border-radius: 10rpx;
            color: #fff;
            font-size: 28rpx;
            font-weight: 400;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            z-index: 999;
        }

        .progress-container {
            
            display: flex;
            align-items: center;
            gap: 15rpx;
            z-index: 999;
            padding: 12rpx 20rpx;
            border-radius: 8rpx;

            .progress-bar {
                flex: 1;
                height: 8rpx;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 4rpx;
                overflow: hidden;

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #335ef8 0%, #2a62a5 100%);
                    border-radius: 4rpx;
                    transition: width 0.3s ease;
                }
            }

            .progress-text {
                font-size: 24rpx;
                color: #333;
                font-weight: 500;
                min-width: 60rpx;
                text-align: right;
            }
        }
    }

    // .financial_warp7 {
    //     background-color: #ffffff;
    //     padding: 40rpx 60rpx;
    //     border-radius: 10rpx;
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     margin: 20rpx 0;
    //     align-items: center;
    //     justify-content: space-between;
    //     box-shadow: 0 4rpx 15rpx rgba(51, 94, 248, 0.1);
    //     transition: all 0.3s ease;

    //     &:hover {
    //         transform: translateY(-2rpx);
    //         box-shadow: 0 6rpx 20rpx rgba(51, 94, 248, 0.2);
    //     }

    //     img {
    //         width: 120rpx;
    //         height: 120rpx;
    //         display: block;
    //     }

    //     .jiangjjjj {
    //         -webkit-box-flex: 1;
    //         -ms-flex: 1;
    //         flex: 1;

    //         display: flex;
    //         flex-direction: column;
    //         span {
    //             color: #335ef8;
    //             font-size: 36rpx;
    //             font-weight: 700;
    //         }

    //         p {
    //             color: #555555;
    //             font-size: 24rpx;
    //             padding-top: 16rpx;
    //         }
    //         .dectxt {
    //             font-size: 28rpx;
    //             color: #666666;
    //             margin-top: 10rpx;
    //             font-weight: 400;
    //         }
    //     }
    //     .enterbtn {
    //         color: #fff;
    //         font-size: 28rpx;
    //         font-weight: 400;
    //         width: 150rpx;
    //         height: 50rpx;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         border-radius: 25rpx;
    //         border: 1px solid #335ef8;
    //         background-color: #335ef8;
    //     }
    // }
}
</style>
