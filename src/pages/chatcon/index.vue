<template>
    <div class="news_con_wrap">
      <!-- <uni-icons type="left" size="30" class="lefticon" @click="handleBack" color="#fff" ></uni-icons> -->
        <div class="rightback" @click="handleBack">
            返回app
        </div>
        <div class="iframe_container">
            <!-- <iframe class="iframe_wrap" :src="url + '&type=' + type"></iframe> -->
            <iframe class="iframe_wrap" :src="getUrlWithTimestamp"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getapistrade } from '@/api/index';
import globalTool from '@/utils/globalTool';
const handleBack = () => {
    globalTool.back();
  }
const url = ref<string | null>(null);
const type = ref<string | null>(null);
onLoad((options: any) => {
    url.value = decodeURIComponent(options.url);
});

// 添加时间戳到 URL
const getUrlWithTimestamp = computed(() => {
    if (!url.value) return '';
    const separator = url.value.includes('?') ? '&' : '?';
    return `${url.value}${separator}t=${Date.now()}`;
});
</script>

<style lang="scss" scoped>
.iframe_wrap{
border: none;
width: 100%;
height: 100vh;
}
.news_con_wrap {
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding-bottom: 80rpx;
    
    .rightback{
        position: absolute;
        right: 10rpx;
        top: 10rpx;
        width: 120rpx;
        height: 70rpx;
        background: #fff;
        line-height: 70rpx;
        font-size: 28rpx;
        color: #333;
        border-radius: 10rpx;
        text-align: center;
    }
    .vux-header-title {
        color: #000 !important;
    }

    .vux-header .vux-header-left .left-arrow:before {
        border-color: #000 !important;
    }

    .news_con {
        height: 100%;
        position: relative;
        z-index: 2;
        overflow: scroll;

        .rule_title {
            margin-top: 80rpx;
            text-align: center;
            margin-bottom: 20rpx;
            position: relative;
            z-index: 2;

            img {
                width: 40rpx;
                position: relative;
                top: 10rpx;
                margin-right: 2px;
            }
        }

        .news_con_detail {
            color: #333;
            font-size: 28rpx;
            padding: 20rpx;
            width: 95%;
            border-radius: 10rpx;
            position: relative;
            z-index: 2;
            margin: 0 auto;
            background: white;

            .title {
                border-left: 3px solid #9158cc;
                padding-left: 4px;
            }

            .news_con_item {
                width: 100%;
                float: left;
                margin: 20rpx auto;
                padding: 20rpx;
                border-radius: 6px;
                background-color: #fff;
                -webkit-box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
                box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);

                .news_con_item_title {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    position: relative;

                    p {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        line-height: 60rpx;
                        text-align: left;
                        font-size: 32rpx;
                        font-weight: bold;
                        color: #333;
                    }

                    span img {
                        width: 40rpx;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }

                .news_con_flex {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    margin: 20rpx 0;

                    div {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;

                        p {
                            text-align: center;
                            font-size: 36rpx;
                            font-weight: bold;
                        }

                        span {
                            display: block;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
