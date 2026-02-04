<template>
    <view class="page flex-col">
   
        <view class="box_3 flex-col">
            <view class="section_1 flex-row">
                <view class="image-text_7 flex-row justify-between">
                    <image mode="widthFix" class="thumbnail_1" referrerpolicy="no-referrer" src="https://lanhu-oss.lanhuapp.com/SketchPng135f55d13ff8ecaf697d943f4b11e5c3dd8d2ce827683b03c2c26988b8fc5330" />
                    <text class="text-group_1">未开放</text>
                </view>
                <view class="image-text_8 flex-row justify-between">
                    <view class="section_2 flex-col"></view>
                    <view class="section_6 flex-col">
                        <view class="text-group_7 flex-col">
                            <text class="text_3">爱心情暖万家</text>
                            <text class="text_4">为身处困境的贫困群众送去物资支持和…</text>
                        </view>
                        <view class="text-wrapper_1 flex-col">
                            <text class="text_5" @click="goDetail">立即参与</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="section_4 flex-row">
                <view class="image-text_9 flex-row justify-between">
                    <image mode="widthFix" class="thumbnail_2" referrerpolicy="no-referrer" src="https://lanhu-oss.lanhuapp.com/SketchPng65d2337ffcd52c62bf840e76dd15675bb238836d34244103f42d9a6ab3494100" />
                    <text class="text-group_3">开放中</text>
                </view>
                <view class="image-text_10 flex-row justify-between">
                    <view class="box_1 flex-col"></view>
                    <view class="box_4 flex-col">
                        <view class="text-group_8 flex-col">
                            <text class="text_6">抢险救灾&nbsp;携手共行</text>
                            <text class="text_7"> 共同为受灾地区和困难群众提供援助&nbsp;传… </text>
                        </view>
                        <view class="text-wrapper_2 flex-col">
                            <text class="text_8">立即参与</text>
                        </view>
                    </view>
                </view>
            </view>
            <image mode="widthFix" class="label_1" referrerpolicy="no-referrer" src="https://lanhu-oss.lanhuapp.com/SketchPng500226fcdd5b6474d2299c660c3bcd531a44745219b70d26a63b3a2d10d99064" />
            <image mode="widthFix" class="image_5" referrerpolicy="no-referrer" src="https://lanhu-oss.lanhuapp.com/SketchPng984af110ab2db5c161b0f729b5bc7b2c369ef06061ad8e6f9cbab47a69622d25" />
            <view class="section_5 flex-row">
                <view class="image-text_11 flex-row justify-between">
                    <image mode="widthFix" class="thumbnail_3" referrerpolicy="no-referrer" src="https://lanhu-oss.lanhuapp.com/SketchPng65d2337ffcd52c62bf840e76dd15675bb238836d34244103f42d9a6ab3494100" />
                    <text class="text-group_5">开放中</text>
                </view>
                <view class="image-text_12 flex-row justify-between">
                    <view class="group_3 flex-col"></view>
                    <view class="section_7 flex-col">
                        <view class="text-group_9 flex-col">
                            <text class="text_9">爱心孤儿工程</text>
                            <text class="text_10"> 引导全社会同献爱心&nbsp;让残孤儿童获得美…. </text>
                        </view>
                        <view class="text-wrapper_3 flex-col">
                            <text class="text_11">立即参与</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            constants: {}
        };
    },
    methods: {
        goDetail() {
            uni.navigateTo({
                url: '/pages/axyz/detail'
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.page {
    background-color: rgba(239, 249, 255, 1);
    position: relative;
    width: 750rpx;
    height: auto;
    .group_1 {
        background-size: 100% 100%;
        padding: 30rpx 25rpx 68rpx 38rpx;
        .text_1 {
            overflow-wrap: break-word;
            color: rgba(255, 255, 255, 1);
            font-size: 24rpx;
            font-family: Helvetica;
            font-weight: normal;
            text-align: right;
            white-space: nowrap;
            line-height: 29rpx;
        }
        .image_1 {
            width: 33rpx;
            height: 20rpx;
            margin: 2rpx 0 7rpx 456rpx;
        }
        .image_2 {
            width: 29rpx;
            height: 20rpx;
            margin: 2rpx 0 7rpx 13rpx;
        }
        .image_3 {
            width: 53rpx;
            height: 23rpx;
            margin: 1rpx 0 5rpx 13rpx;
        }
    }
    .image_4 {
        width: 750rpx;
        height: 68rpx;
        margin-top: 1429rpx;
    }
    .box_3 {
        
        width: 750rpx;
        height: 1430rpx;
        padding: 0 30rpx 643rpx 30rpx;
        .text_2 {
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 1);
            font-size: 32rpx;
            font-weight: normal;
            text-align: left;
            white-space: nowrap;
            line-height: 45rpx;
            align-self: center;
            margin-top: -17rpx;
        }
        .section_1 {
            box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 51, 151, 0.1);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            position: relative;
            margin-top: 291rpx;
            padding: 161rpx 356rpx 21rpx 221rpx;
            .image-text_7 {
                width: 113rpx;
                .thumbnail_1 {
                    width: 18rpx;
                    height: 18rpx;
                    margin: 11rpx 0 11rpx 0;
                }
                .text-group_1 {
                    overflow-wrap: break-word;
                    color: rgba(255, 133, 0, 1);
                    font-size: 28rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
            }
            .image-text_8 {
                position: absolute;
                left: 21rpx;
                top: 21rpx;
                width: 639rpx;
                height: 181rpx;
                .section_2 {
                    border-radius: 10rpx;
                    background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/dd2bb7d4b30c4a80a99066cdcf2c36f8_mergeImage.png);
                    width: 180rpx;
                    height: 180rpx;
                    margin-bottom: 1rpx;
                }
                .section_6 {
                    .text-group_7 {
                        margin-right: 7rpx;
                        .text_3 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 32rpx;
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 45rpx;
                            margin-right: 240rpx;
                        }
                        .text_4 {
                            overflow-wrap: break-word;
                            color: rgba(136, 136, 136, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                            margin-top: 20rpx;
                        }
                    }
                    .text-wrapper_1 {
                        background-color: rgba(22, 206, 229, 1);
                        border-radius: 36rpx;
                        margin: 29rpx 0 0 297rpx;
                        padding: 11rpx 23rpx 10rpx 23rpx;
                        .text_5 {
                            overflow-wrap: break-word;
                            color: rgba(255, 255, 255, 1);
                            font-size: 24rpx;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                            text-align: right;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                    }
                }
            }
        }
        .section_4 {
            box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 51, 151, 0.1);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            position: relative;
            margin-top: 24rpx;
            padding: 161rpx 356rpx 21rpx 221rpx;
            .image-text_9 {
                width: 113rpx;
                .thumbnail_2 {
                    width: 18rpx;
                    height: 18rpx;
                    margin: 11rpx 0 11rpx 0;
                }
                .text-group_3 {
                    overflow-wrap: break-word;
                    color: rgba(58, 219, 70, 1);
                    font-size: 28rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
            }
            .image-text_10 {
                position: absolute;
                left: 21rpx;
                top: 21rpx;
                width: 640rpx;
                height: 181rpx;
                .box_1 {
                    border-radius: 10rpx;
                    background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/a6642818833849f9987b3dbd9a682ecd_mergeImage.png);
                    width: 180rpx;
                    height: 180rpx;
                    margin-bottom: 1rpx;
                }
                .box_4 {
                    .text-group_8 {
                        .text_6 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 32rpx;
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 45rpx;
                            margin-right: 173rpx;
                        }
                        .text_7 {
                            overflow-wrap: break-word;
                            color: rgba(136, 136, 136, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                            margin-top: 20rpx;
                        }
                    }
                    .text-wrapper_2 {
                        background-color: rgba(22, 206, 229, 1);
                        border-radius: 36rpx;
                        margin: 29rpx 1rpx 0 297rpx;
                        padding: 11rpx 23rpx 10rpx 23rpx;
                        .text_8 {
                            overflow-wrap: break-word;
                            color: rgba(255, 255, 255, 1);
                            font-size: 24rpx;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                            text-align: right;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                    }
                }
            }
        }
        .label_1 {
            position: absolute;
            left: 24rpx;
            top: -15rpx;
            width: 40rpx;
            height: 40rpx;
        }
        .image_5 {
            position: absolute;
            left: 559rpx;
            top: -44rpx;
            width: 145rpx;
            height: 133rpx;
        }
        .section_5 {
            box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(0, 51, 151, 0.1);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            position: absolute;
            left: 30rpx;
            top: 73rpx;
            width: 690rpx;
            height: 222rpx;
            padding: 161rpx 356rpx 21rpx 221rpx;
            .image-text_11 {
                width: 113rpx;
                .thumbnail_3 {
                    width: 18rpx;
                    height: 18rpx;
                    margin: 11rpx 0 11rpx 0;
                }
                .text-group_5 {
                    overflow-wrap: break-word;
                    color: rgba(58, 219, 70, 1);
                    font-size: 28rpx;
                    font-family: PingFangSC-Semibold;
                    font-weight: 600;
                    text-align: left;
                    white-space: nowrap;
                    line-height: 40rpx;
                }
            }
            .image-text_12 {
                position: absolute;
                left: 21rpx;
                top: 21rpx;
                width: 647rpx;
                height: 181rpx;
                .group_3 {
                    border-radius: 10rpx;
                    background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/b5047f908f7046d98edeaca17b49fd6e_mergeImage.png);
                    width: 180rpx;
                    height: 180rpx;
                    margin-bottom: 1rpx;
                }
                .section_7 {
                    .text-group_9 {
                        .text_9 {
                            overflow-wrap: break-word;
                            color: rgba(0, 0, 0, 1);
                            font-size: 32rpx;
                            font-family: PingFangSC-Medium;
                            font-weight: 500;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 45rpx;
                            margin-right: 255rpx;
                        }
                        .text_10 {
                            overflow-wrap: break-word;
                            color: rgba(136, 136, 136, 1);
                            font-size: 24rpx;
                            font-weight: normal;
                            text-align: left;
                            white-space: nowrap;
                            line-height: 33rpx;
                            margin-top: 20rpx;
                        }
                    }
                    .text-wrapper_3 {
                        background-color: rgba(22, 206, 229, 1);
                        border-radius: 36rpx;
                        margin: 29rpx 8rpx 0 297rpx;
                        padding: 11rpx 23rpx 10rpx 23rpx;
                        .text_11 {
                            overflow-wrap: break-word;
                            color: rgba(255, 255, 255, 1);
                            font-size: 24rpx;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                            text-align: right;
                            white-space: nowrap;
                            line-height: 33rpx;
                        }
                    }
                }
            }
        }
    }
}
</style>
