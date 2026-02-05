<template>
    <div class="recharge-page">
        <div class="recharge_warp1">
            <div class="recharge_header">
                <div class="title_section">
                    <h1>USDT充值</h1>
                    <div class="recharge_banner">
                        <span>联系客服获取充值信息</span>
                    </div>
                </div>
                <div class="illustration_section">
                    <img src="@/static/img2/txicon.png" alt="" />
                </div>
            </div>
            
            <view class="content">
                <div class="recharge_warp3">
                    <span class="recharge-info-title">充值信息</span>

                    <div class="input_section">
                        <div class="input_item">
                            <div class="input_label">收款地址</div>
                            <div class="input_field">
                                <input 
                                    type="text"
                                    v-model="address"
                                    placeholder="TRC20 地址"
                                />
                            </div>
                        </div>
                        <div class="input_item">
                            <div class="input_label">数量USDT</div>
                            <div class="input_field">
                                <input 
                                    type="number"
                                    v-model="money"
                                    placeholder="请输入充值数量"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="upload_section">
                        <div class="upload_title">上传付款凭证信息</div>
                        <div class="pz_img">
                            <view class="upload-wrapper" @click="chooseImage">
                                <image 
                                    v-if="previewImage" 
                                    :src="previewImage" 
                                    mode="widthFix"
                                    class="preview-image"
                                />
                                <view v-else class="upload-placeholder">
                                    <image 
                                        src="@/static/img/dxc.png" 
                                        mode="widthFix" 
                                        class="placeholder-icon"
                                    />
                                </view>
                                <view v-if="previewImage" class="delete-btn" @click.stop="deletePic">
                                    <text>×</text>
                                </view>
                            </view>
                        </div>
                    </div>

                    <div class="zf">
                        <p class="goldbtn" @click="handleSubmit">已完成支付</p>
                    </div>
                </div>
            </view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { bankRecharge, getuserdetail } from '@/api/index';
import globalTool from '@/utils/globalTool';

const address = ref('');
// const money = ref('');
const money  = ref(0);

interface UserInfo {
    benjin: string;
    pay_pwd: string;
}
// const selectAmount = (amount: number) => {
//     money.value = amount;
// };

const userInfo = ref<UserInfo>({} as UserInfo);
const src = ref('');
const previewImage = ref<string>('');
const url = ref<string | null>(null);
const type = ref<string | null>(null);

// 选择图片
const chooseImage = () => {
    uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            const tempFilePath = res.tempFilePaths[0];
            console.log('选择的图片路径:', tempFilePath);
            console.log('所有临时路径:', res.tempFilePaths);
            
            // 先验证图片是否可以访问
            uni.getImageInfo({
                src: tempFilePath,
                success: (info) => {
                    console.log('图片信息验证成功:', info);
                    uni.showModal({
                        title: '调试-选图成功',
                        content: `路径: ${tempFilePath}\n宽高: ${info.width} x ${info.height}`,
                        showCancel: false
                    });
                    previewImage.value = tempFilePath;
                    // 将图片转换为 base64
                    convertToBase64(tempFilePath);
                },
                fail: (err) => {
                    console.error('图片信息验证失败:', err);
                    uni.showModal({
                        title: '调试-选图失败',
                        content: `getImageInfo 失败: ${JSON.stringify(err)}`,
                        showCancel: false
                    });
                    uni.showToast({
                        title: '图片无效，请重新选择',
                        icon: 'none'
                    });
                }
            });
        },
        fail: (err) => {
            console.error('选择图片失败:', err);
            uni.showToast({
                title: '选择图片失败',
                icon: 'none'
            });
        }
    });
};

// 将图片转换为 base64
const convertToBase64 = (filePath: string) => {
    // #ifdef H5
    // H5 端使用 fetch + FileReader
    fetch(filePath)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                src.value = base64data;
                console.log('H5 图片转换成功，base64 长度:', base64data.length);
            };
            reader.onerror = () => {
                console.error('FileReader 错误');
                uni.showToast({
                    title: '图片转换失败',
                    icon: 'none'
                });
            };
            reader.readAsDataURL(blob);
        })
        .catch(err => {
            console.error('fetch 错误:', err);
            uni.showToast({
                title: '图片读取失败',
                icon: 'none'
            });
        });
    // #endif
    
    // #ifdef APP-PLUS
    // App 端使用 plus.io 读取文件
    uni.showModal({
        title: '调试-App 端开始转换',
        content: `文件路径: ${filePath}`,
        showCancel: false
    });
    usePlusIO(filePath);
    // #endif
    uni.showModal({
        title: '11111',
        content: `文件路径: ${filePath}`,
        showCancel: false
    });
};

// App 端使用 plus.io 读取文件
const usePlusIO = (filePath: string) => {
    if (typeof plus === 'undefined' || !plus.io) {
        console.error('plus.io 不可用');
        uni.showModal({
            title: '调试-plus.io 不可用',
            content: '当前环境没有 plus.io，无法读取文件',
            showCancel: false
        });
        uni.showToast({
            title: '当前环境不支持文件读取',
            icon: 'none'
        });
        return;
    }
    
    uni.showModal({
        title: '调试-使用 plus.io 读取文件',
        content: `文件路径: ${filePath}`,
        showCancel: false
    });
    plus.io.resolveLocalFileSystemURL(filePath, (entry: any) => {
        uni.showModal({
            title: '调试-使用 plus.io 读取文件成功',
            content: `文件路径: ${filePath}`,
            showCancel: false
        });
        entry.file((file: any) => {
            uni.showModal({
                title: '调试-entry.file',
                content: `文件名: ${file.name}\n大小: ${file.size}`,
                showCancel: false
            });

            // 关键修改：在 App 端使用 plus.io.FileReader，而不是 H5 的 FileReader
            const reader = new plus.io.FileReader();

            reader.onloadend = (evt: any) => {
                const base64data = evt.target?.result as string || (evt as any).result as string;
                if (base64data) {
                    src.value = base64data;
                    console.log('plus.io 转换成功，base64 长度:', base64data.length);
                    console.log('base64 前100个字符:', base64data.substring(0, 100));
                    uni.showModal({
                        title: '调试-base64 成功',
                        content: `长度: ${base64data.length}\n前50字符:\n${base64data.substring(0, 50)}`,
                        showCancel: false
                    });
                } else {
                    console.error('base64 数据为空');
                    uni.showModal({
                        title: '调试-base64 为空',
                        content: 'reader.onloadend 返回空数据',
                        showCancel: false
                    });
                    uni.showToast({
                        title: '图片数据为空，请重试',
                        icon: 'none'
                    });
                }
            };

            reader.onerror = (err: any) => {
                console.error('plus.io.FileReader 错误:', err);
                uni.showModal({
                    title: '调试-plus.FileReader 错误',
                    content: JSON.stringify(err),
                    showCancel: false
                });
                uni.showToast({
                    title: '图片读取失败，请重试',
                    icon: 'none'
                });
            };

            // 这里直接传入 5+ 的 File 对象，由 plus.io.FileReader 负责读取
            reader.readAsDataURL(file);
        }, (err: any) => {
            console.error('entry.file 失败:', err);
            uni.showModal({
                title: '调试-entry.file 失败',
                content: JSON.stringify(err),
                showCancel: false
            });
            uni.showToast({
                title: '无法读取文件，请重新选择',
                icon: 'none'
            });
        });
    }, (err: any) => {
        console.error('resolveLocalFileSystemURL 失败:', err);
        uni.showModal({
            title: '调试-路径解析失败',
            content: JSON.stringify(err),
            showCancel: false
        });
        uni.showToast({
            title: '文件路径无效，请重新选择',
            icon: 'none'
        });
    });
};

// 使用 uni.getFileSystemManager 读取文件（小程序端）
const useFileSystemManager = (filePath: string) => {
    // 检查 uni.getFileSystemManager 是否可用
    if (typeof uni.getFileSystemManager !== 'function') {
        console.error('uni.getFileSystemManager 不可用');
        uni.showToast({
            title: '当前平台不支持文件读取',
            icon: 'none'
        });
        return;
    }
    
    console.log('使用 getFileSystemManager 读取文件:', filePath);
    const fsm = uni.getFileSystemManager();
    
    fsm.readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (res: any) => {
            console.log('readFile 成功，数据长度:', res.data?.length);
            if (!res.data) {
                console.error('读取的数据为空');
                uni.showToast({
                    title: '图片数据为空，请重试',
                    icon: 'none'
                });
                return;
            }
            
            // 判断图片类型
            let mimeType = 'image/jpeg';
            if (filePath.includes('.png') || filePath.toLowerCase().includes('png')) {
                mimeType = 'image/png';
            } else if (filePath.includes('.gif') || filePath.toLowerCase().includes('gif')) {
                mimeType = 'image/gif';
            }
            // 生成 base64 字符串，格式：data:image/png;base64,xxxxx
            const base64data = `data:${mimeType};base64,${res.data}`;
            src.value = base64data;
            console.log('图片转换成功，base64 长度:', base64data.length);
            console.log('base64 前100个字符:', base64data.substring(0, 100));
        },
        fail: (err: any) => {
            console.error('readFile 失败:', err);
            uni.showToast({
                title: '图片读取失败，请重试',
                icon: 'none'
            });
        }
    });
};

// 删除图片
const deletePic = () => {
    console.log('删除图片，清空 previewImage 和 src');
    previewImage.value = '';
    src.value = '';
};

const handleSubmit = () => {
    console.log(
        '准备提交充值，当前数据：',
        'address =', address.value,
        'money =', money.value,
        'previewImage =', previewImage.value,
        'src length =', src.value ? src.value.length : 0
    );
    uni.showModal({
        title: '调试-提交前数据',
        content: `地址: ${address.value}\n金额: ${money.value}\n有预览图: ${!!previewImage.value}\nsrc 长度: ${src.value ? src.value.length : 0}`,
        showCancel: false
    });

    if (!address.value) {
        console.log('校验未通过：address 为空');
        uni.showToast({
            title: '请输入收款地址',
            icon: 'none'
        });
        return;
    }
    if (!money.value) {
        console.log('校验未通过：money 为空');
        uni.showToast({
            title: '请输入充值数量',
            icon: 'none'
        });
        return;
    }
    if (!src.value) {
        console.log('校验未通过：src 为空，尚未获取到 base64 凭证');
        uni.showModal({
            title: '调试-src 为空',
            content: `previewImage: ${previewImage.value}\nsrc 长度: 0\n说明 base64 尚未生成`,
            showCancel: false
        });
        uni.showToast({
            title: '请上传付款凭证',
            icon: 'none'
        });
        return;
    }

    console.log(
        '开始发起 bankRecharge 请求：',
        'moneys =', money.value.toString(),
        'con(src length) =', src.value.length,
        'usdt(address) =', address.value,
        'id = 1'
    );
    uni.showModal({
        title: '调试-开始发起 bankRecharge 请求',
        content: `money = ${money.value.toString()}\nsrc length = ${src.value.length}\nusdt(address) = ${address.value}\nid = 1`,
        showCancel: false
    });
    bankRecharge(money.value.toString(), src.value, address.value, '1')
        .then((data: any) => {
            uni.showModal({
                title: '调试-充值接口返回成功',
                content: `data = ${JSON.stringify(data)}`,
                showCancel: false
            });
            uni.showToast({
                title: '充值成功',
                icon: 'success'
            });
            setTimeout(() => {
                globalTool.back();
            }, 1000);
        })
        .catch((err: any) => {
            uni.showModal({
                title: '调试-充值接口返回失败',
                content: `err = ${JSON.stringify(err)}`,
                showCancel: false
            });
            uni.showToast({
                title: '充值失败，请重试',
                icon: 'none'
            });
        });
};

const getUrl = (_type: string) => {
    type.value = _type;
    const token = uni.getStorageSync('token');
    url.value = `/api/kefu_url.php?token=${token}&type=${_type}`;
    uni.navigateTo({
        url: `/pages/chatcon/index?url=${url.value}`
    });
    console.log(url.value);
};

const initData = () => {
    getuserdetail().then((data: any) => {
        userInfo.value = data;
        uni.setStorageSync('pay_pwd', data.pay_pwd);
    });
};

onShow(() => {
    initData();
});
</script>

<style lang="scss" scoped>
page {
    background-color: #000;
}

.recharge-page {
    background-color: #000;
    min-height: 100vh;
    width: 100%;
    position: relative;
    padding-bottom: 40rpx;
    padding-top: 0;
    margin-top: 0;
    
    /* 确保子元素也不会产生白色空隙 */
    * {
        box-sizing: border-box;
    }

    .recharge_warp1 {
        position: relative;
        
        .content {
            border-radius: 20rpx;
            padding: 20rpx 0;
            border: 1rpx solid #ffffff;
            width: 95%;
            margin: 0 auto;
        }
        
        .recharge_header {
            width: 90%;
            margin: 30rpx auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 20rpx;
            box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);

            .title_section {
                flex: 1;
                margin-right: 30rpx;

                h1 {
                    font-size: 40rpx;
                    color: #ffffff;
                    font-weight: 700;
                    margin-bottom: 20rpx;
                    line-height: 1.2;
                }

                .recharge_banner {
                    background: linear-gradient(to right, #f9dfb7, #ffc676);
                    color: #855100;
                    font-size: 28rpx;
                    padding: 15rpx 25rpx;
                    border-radius: 15rpx;
                    display: inline-block;
                    font-weight: 600;
                    border: 2rpx dashed #855100;
                    position: relative;
                    
                    &::before {
                        content: '';
                        position: absolute;
                        top: -2rpx;
                        left: -2rpx;
                        right: -2rpx;
                        bottom: -2rpx;
                        background: linear-gradient(to right, #f9dfb7, #ffc676);
                        border-radius: 15rpx;
                        z-index: -1;
                    }
                }
            }

            .illustration_section {
                width: 180rpx;
                height: 180rpx;
                display: flex;
                align-items: center;
                justify-content: center;
                
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }

        .recharge_warp3 {
            width: 90%;
            margin: 20rpx auto 0;

            .recharge-info-title {
                display: block;
                margin: 30rpx 0;
                font-size: 32rpx;
                color: #fff;
                font-weight: 600;
            }

            .input_section {
                margin-bottom: 40rpx;

                .input_item {
                    background-color: #f9f1e5;
                    padding: 20rpx;
                    border-radius: 16rpx;
                    margin-bottom: 20rpx;
                    box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                    .input_label {
                        font-size: 32rpx;
                        color: #333;
                        font-weight: 600;
                        margin-bottom: 20rpx;
                    }

                    .input_field {
                        input {
                            width: 100%;
                            height: 100rpx;
                            background: #fff;
                            border-radius: 12rpx;
                            padding: 0 30rpx;
                            font-size: 28rpx;
                            color: #333;
                            border: 1rpx solid #e5e7eb;
                            
                            &::placeholder {
                                color: #999;
                            }
                        }
                    }
                }
            }

            .upload_section {
                background-color: #f9f1e5;
                padding: 20rpx;
                border-radius: 16rpx;
                margin-bottom: 20rpx;
                box-shadow: 0 2rpx 10rpx rgba(51, 94, 248, 0.1);

                .upload_title {
                    font-size: 32rpx;
                    color: #333;
                    font-weight: 600;
                    margin-bottom: 20rpx;
                }

                .pz_img {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                    .upload-wrapper {
                        position: relative;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 200rpx;
                        
                        .upload-placeholder {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            
                            .placeholder-icon {
                                width: 50%;
                                display: block;
                            }
                        }
                        
                        .preview-image {
                            max-width: 100%;
                            border-radius: 8rpx;
                            display: block;
                        }
                        
                        .delete-btn {
                            position: absolute;
                            top: -10rpx;
                            right: -10rpx;
                            width: 50rpx;
                            height: 50rpx;
                            background-color: #ff4444;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            color: #fff;
                            font-size: 40rpx;
                            font-weight: bold;
                            z-index: 10;
                            box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
                            
                            text {
                                line-height: 1;
                            }
                        }
                    }
                }
            }

            .zf {
                width: 100%;
                margin: 60rpx auto;

                p {
                    width: 100%;
                    height: 96rpx;
                    line-height: 96rpx;
                    text-align: center;
                    font-weight: 700;
                    font-size: 32rpx;
                    border-radius: 48rpx;
                    box-shadow: 0 6rpx 20rpx rgba(51, 94, 248, 0.3);
                }
            }
        }
    }
}
</style>
