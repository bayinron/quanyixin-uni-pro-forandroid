<template>
    <div class="index_warp1">
        <!-- 自定义弹窗 -->
        <view v-if="showCustomPopup" class="custom-popup-mask" @click="onMaskClick">
            <view class="custom-popup-content" @click.stop>
                <image class="popup-bg" src="@/static/img/tanc.png" mode="widthFix" />
                <view class="popup-text" v-html="tanchuang"></view>
                <image class="popup-close" src="@/static/imgs/close.png" @click="closeCustomPopup" />
            </view>
        </view>
        <view class="index_bg">
            <image mode="widthFix" src="@/static/img/sybgbg.png" alt="" />
            <view class="title">首页</view>
        </view>

        <div class="index2">
            <swiper class="swiper" autoplay circular style="height: 360rpx" next-margin="-10rpx" previous-margin="0rpx">
                <swiper-item v-for="(item, index) in slides" :key="index">
                    <!-- <img :src="item.pic" class="swiper-img"></img> -->

                    <image :src="item.pic" class="swiper-img"></image>
                </swiper-item>
            </swiper>
            <view class="notice-warp">
                <view class="flex flex-row flex-justify-start flex-items-center absolute top--6rpx left-20rpx color-#78c8e4">
                    <uni-icons type="sound" size="30" color="#78c8e4"></uni-icons>
                    <text style="color: #78c8e4">通知：</text>
                </view>
                <uv-notice-bar :icon="false" :text="announcementText" bgColor="#fff" color="#000" speed="20"></uv-notice-bar>
            </view>
        </div>
        <div class="hdnr_warp">
            <div class="hdnr">
                <div class="hd" @click="inviteClick">
                    <image mode="widthFix" src="@/static/img/fxyl.png" alt="" />
                    <p>分享有礼</p>
                </div>
                <div class="hd" @click="goldeneggsClick">
                    <image mode="widthFix" src="@/static/img/cjhd.png" alt="" />
                    <p>抽奖活动</p>
                </div>
                <div class="hd" @click="aboutusClick">
                    <image mode="widthFix" src="@/static/img/xrlb.png" alt="" />
                    <p>新人礼包</p>
                </div>
                <div class="hd" @click="sgininClick">
                    <image mode="widthFix" src="@/static/img/ttqd.png" alt="" />
                    <p>天天签到</p>
                </div>
            </div>
        </div>
        <div class="cishan_warp">
            <image mode="widthFix" src="@/static/img/cszl.png" alt="" />
        </div>
        <div class="ci" @click="csClick">
            <image mode="widthFix" src="@/static/img/csxt.png" alt="" />
        </div>

        <div class="fahzan_war">
                <image mode="widthFix" src="@/static/img/fzjz.png" alt="" @click="businessClick" />
                <image mode="widthFix" src="@/static/img/ywgh.png" alt="" @click="rulesClick" />
        </div>
        <div class="data_warp">
            <div class="data" @click="platformClick">
                <image mode="widthFix" src="@/static/img/qqywh.png" alt="" />
                <p>企业文化</p>
            </div>
            <div class="data" @click="noviceClick">
                <image mode="widthFix" src="@/static/img/xxrbk.png" alt="" />
                <p>新人必看</p>
            </div>
            <div class="data" @click="womenClick">
                <image mode="widthFix" src="@/static/img/ggywm.png" alt="" />
                <p>关于我们</p>
            </div>
        </div>

        <div class="fahzan_war">
                <image mode="widthFix" src="@/static/img/yjzq.png" alt="" @click="yjzqClick" />
                <image mode="widthFix" src="@/static/img/axyz.png" alt="" @click="axyzClick" />
        </div>
        <div class="cishan_warp">
                <image mode="widthFix" src="@/static/img/rmzx.png" alt="" />
        </div>
        <div class="Popular_warp">
            <div class="Popular">
                <div class="Popu_warp">
                    <image class="img1" mode="widthFix" src="@/static/img/rm.png" alt="" @click="luodiClick" />
                    <image class="img2" mode="widthFix" src="@/static/img/cujin.png" alt="" @click="cujinClick" />
                    <!-- <div class="Popu">
                        <p v-for="(item, index) in zixun" :key="index" @click="xq(item.con)">{{ item.title }} <img src="@/static/img/yyjt.png" alt="" /></p>
                    </div> -->
                </div>
            </div>
        </div>
        <image class="chat_icon" mode="widthFix" src="@/static/img/kkkfff.png" alt="" @click="chatClick" />
    </div>
</template>

<script setup lang="ts">
import { getIndex, getbanner, getuserdetail, getNotice } from '../../api/getdata';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
import globalTool from '@/utils/globalTool';
const userStore = useUserStore();

import { usePageStore } from '@/stores/modules/pageStore';
const pageStore = usePageStore();
const { setZixunContent } = pageStore;
const { prefixUrl } = storeToRefs(userStore);

const indexData = ref<any>({});
const ulList = ref([]);
const adv_ = ref(false);
const zixun = ref<any[]>([]);
const tanchuang = ref({});
const news_con = ref('');
const marginTop = ref(0);
const marginIndex = ref(0);
const list = ref([]);
const slides = ref<any[]>([]);

// uni-popup 引用
const popup = ref();

const announcementText = ref('');
let announcementList = [];

// 自定义弹窗相关
const showCustomPopup = ref(false);
const ADV_STATUS_KEY = 'advshow';
function openCustomPopup() {
    showCustomPopup.value = true;
}
function closeCustomPopup() {
    uni.setStorageSync(ADV_STATUS_KEY, 'false');
    showCustomPopup.value = false;
}
function onMaskClick() {
    closeCustomPopup();
}

function luodiClick() {
    globalTool.openExternalUrl('https://wanhuacs.com/');
}
function cujinClick() {
    uni.navigateTo({
        url: '/pages/zhuli/index'
    });
}
function chatClick() {
    uni.navigateTo({
        url: '/pages/customer/index'
    });
}
function businessClick() {
    uni.navigateTo({
        url: '/pages/business/index'
    });
}
function rulesClick() {
    uni.navigateTo({
        url: '/pages/rules/index'
    });
}
function yjzqClick() {
    uni.navigateTo({
        url: '/pages/yjzq/dec'
    });
}
function axyzClick() {
    uni.navigateTo({
        url: '/pages/axyz/dec'
    });
}
function platformClick() {
    uni.navigateTo({
        url: '/pages/platform/index'
    });
}
function noviceClick() {
    uni.navigateTo({
        url: '/pages/novice/index'
    });
}
function womenClick() {
    uni.navigateTo({
        url: '/pages/women/index'
    });
}
function aboutusClick() {
    uni.navigateTo({
        url: '/pages/aboutus/index'
    });
}
function csClick() {
    globalTool.openExternalUrl('http://www.chinacharityfederation.org/pv.html?id=6e9bf96c-6697-453f-8d10-b90a37ccd2a5');
}
function sgininClick() {
    uni.navigateTo({
        url: '/pages/sginin/index'
    });
}
function inviteClick() {
    uni.navigateTo({
        url: '/pages/invite/index'
    });
}
function goldeneggsClick() {
    uni.navigateTo({
        url: '/pages/goldeneggs/index'
    });
}

onShow(() => {
    if (slides.value.length === 0) {
        getBanner();
        GetZixun();
        GetTanchuang();
        getIndexData();
        initRecent();
    }
});

function getBanner() {
    getbanner().then((res: any) => {
        res.banner.forEach((item: any) => {
            item.pic = prefixUrl.value + item.pic;
        });
        slides.value = res.banner;
    });
}

function getIndexData() {
    getIndex().then((res: any) => {
        announcementList = res.gonggao.map((item: any) => {
            return item.con;
        });
        announcementText.value = announcementList.join(' ');
        //过滤掉announcementText中的标记语言，只留下文字
        announcementText.value = announcementText.value.replace(/<[^>]*>|&nbsp;/g, '');
        zixun.value = res.zixun;
    });
}

function GetZixun() {
    getNotice('6').then((data: any) => {
        zixun.value = data.wenti;
    });
}

function GetTanchuang() {
    getNotice('1').then((data: any) => {
        tanchuang.value = data.msg.con;
        const advStatus = uni.getStorageSync(ADV_STATUS_KEY);
        if (tanchuang.value && advStatus !== 'false') {
            showCustomPopup.value = true;
        }
    });
}

function xq(con: string) {
    // setZixunContent(con);
    uni.setStorageSync('zixunContent', con);
    uni.navigateTo({
        url: `/pages/zixun/index`
    });
}

function initRecent() {
    // setInterval(() => {
    //   if (dongtai_con.value && dongtai_con.value.scrollTop + 500 >= dongtai_con_list.value.scrollHeight) {
    //     dongtai_con.value.scrollTop = 0;
    //   } else {
    //     dongtai_con.value ? dongtai_con.value.scrollTop++ : null;
    //   }
    // }, 50);
}

function startPlay() {
    setTimeout(() => {
        marginIndex.value++;
        if (marginIndex.value > ulList.value.length - 1) {
            marginIndex.value = 0;
        }
        marginTop.value = -(marginIndex.value * 0.378);
        startPlay();
    }, 8000);
}

function mathNum() {
    let number = Math.ceil(Math.random() * 22);
    if (number < 14) {
        number = 21;
    }
    return number;
}

function goZixun(con: string) {
    globalTool.openExternalUrl(con);
}
</script>

<style scoped lang="scss">
.index_bg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 400rpx;
    width: 100%;
    image {
        width: 100%;
        height: auto;
    }

    .title {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        top: 20rpx;
        left: 0;
        color: #fff;
    }
}

.notice-warp {
    width: 94%;
    margin: 30rpx auto 0;
    padding-left: 140rpx;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    z-index: 2;
    border-radius: 50rpx;
}

.index_warp1 {
    padding: 0 20rpx;

    .index2 {
        padding-top: 88rpx;

        .swiper-img {
            border-radius: 20rpx;
            width: 99%;
            height: 100%;
        }

        .notice {
            .content {
                span {
                    -webkit-animation: marquee 30s linear infinite;
                    animation: marquee 30s linear infinite;
                }
            }
        }
    }

    .hdnr_warp {
        margin: 30rpx 20rpx 0;
        height: 208rpx;
        .hdnr {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            .hd {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;

                image {
                    width: 100%;
                    height: auto;
                }

                p {
                    text-align: center;
                    position: relative;
                    bottom: 90rpx;
                    font-size: 26rpx;
                    font-weight: 600;
                }
            }
        }
    }

    .cishan_warp {
        display: flex;
        margin: 0 40rpx;
        margin-bottom: 20rpx;
        image {
            width: 40%;
            height: auto;
        }
    }

    .ci {
        display: block;
        margin: 0rpx auto;
        margin-top: 0rpx;
        margin-bottom: 20rpx;
        text-align: center;

        image {
            width: 90%;
            height: auto;
        }
    }

    .fahzan_war {
    
        display: flex;
        margin: 0 30rpx;


            image {
                flex: 1;
                width: 100%;
                height: auto;
            }
        
    }

    .data_warp {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0 30rpx;
        height: 200rpx;
            .data {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;

                image {
                    width: 100%;
                    height: auto;
                }

            p {
                text-align: center;
                position: relative;
                bottom: 90rpx;
                font-size: 26rpx;
                font-weight: 600;
            }
        }
    }

    .Popular_warp {
        background-color: #ffffff;
        width: 95%;
        display: block;
        margin: 30rpx auto;
        margin-top: 0rpx;
        border-radius: 40rpx;

        .Popular {
            .Popu_warp {
                display: flex;
                gap: 20rpx;
                padding: 30rpx;

                .img1 {
                    width: 48%;
                }
                .img2 {
                    width: 48%;
                }
                .Popu {
                    -webkit-box-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                    margin-left: 40rpx;

                    p {
                        margin-top: 30rpx;
                        vertical-align: middle;
                        font-size: 28rpx;

                        img {
                            width: 5%;
                            vertical-align: middle;
                            float: right;
                        }
                    }
                }
            }
        }
    }
}

.chat_icon {
    position: fixed;
    width: 200rpx;
    z-index: 898;
    right: 20rpx;
    top: 70%;
}

/* uni-popup 弹窗样式 */
.custom-popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.custom-popup-content {
    position: relative;
    width: 600rpx;
    background: transparent;
    border-radius: 20rpx;
    //overflow: hidden;
}

.popup-bg {
    width: 100%;
    display: block;
}

.popup-text {
    position: absolute;
    top: 320rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 65%;
    height: 400rpx;
    overflow-y: auto;
    font-size: 32rpx;
    font-weight: bold;
    color: #000;
    z-index: 999;
}

.popup-close {
    height: 100rpx;
    width: 100rpx;
    margin-left: 50%;
    margin-top: 20rpx;
    transform: translateX(-50%);
    z-index: 99999;
}
</style>
