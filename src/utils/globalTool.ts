import { http } from './request';

export default {
    //针对姓名的隐私处理,如果姓名是3个字，隐藏中间一个字，如果2个字，隐藏最后一个字
    privacyName: (name: string) => {
        if (name.length === 3) {
            return name.substring(0, 1) + '*' + name.substring(2, 3);
        } else if (name.length === 2) {
            return name.substring(0, 1) + '*';
        }
        return name;
    },
    back: () => {
        var pages = getCurrentPages();
        if (pages.length > 1) {
            uni.navigateBack({
                delta: 1
            });
        } else {
            uni.switchTab({
                url: '/pages/home/index'
            });
        }
    },
    showModal: function (content: any, cb: Function, showCancel: boolean = false, title: string = '提示', confirmText: string = '确定', cancelText: string = '取消') {
        uni.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            confirmText: confirmText,
            cancelText: cancelText,
            success: function (res) {
                if (res.confirm && cb instanceof Function) {
                    cb();
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    sendMsg: function (title: string) {
        uni.showToast({
            title: title,
            duration: 1500
        });
    },
    showToast: function (title: string, back: Function | boolean = false, _icon: any = 'none') {
        if (_icon) {
            uni.showToast({
                title: title,
                duration: 1500,
                icon: _icon
            });
        } else
            uni.showToast({
                title: title,
                duration: 1500
            });
        if (typeof back == 'function') {
            setTimeout(() => {
                back();
            }, 1000);
        }
        if (typeof back == 'boolean' && back) {
            setTimeout(() => {
                uni.navigateBack();
            }, 1500);
        }
    },
    checkLogin: function () {
        let token = uni.getStorageSync('token');
        if (token) {
            return true;
        } else {
            uni.reLaunch({
                url: '/pages/login/index'
            });
            return false;
        }
    },
    //base64转本地图片，将数据存储在本地
    base64ToSave: function (base64data: string, FILE_BASE_NAME = 'tmp_base64src') {
        const fsm = uni.getFileSystemManager();
        return new Promise((resolve, reject) => {
            //format这个跟base64数据的开头对应
            const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
            if (!format) {
                reject(new Error('ERROR_BASE64SRC_PARSE'));
            }
            const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
            const buffer = wx.base64ToArrayBuffer(bodyData);
            fsm.writeFile({
                filePath,
                data: buffer,
                encoding: 'binary',
                success() {
                    resolve(filePath);
                },
                fail() {
                    reject(new Error('ERROR_BASE64SRC_WRITE'));
                }
            });
        });
    },
    brightenKeyword: function (hText: string, text: string, color: string) {
        /**
         * 将 \ . ( ) 等等字符前面都加上 \
         * @param val string
         * @returns string
         */
        function eacapeReg(val: any) {
            return val.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\./g, '\\.').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\$/g, '\\$').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/\|/g, '\\|').replace(/\-/g, '\\-').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\?/g, '\\?').replace(/\!/g, '\\!').replace(/\,/g, '\\,');
        }
        if (hText && text) {
            /**
             * 全局匹配、不区分大小写
             */
            const Reg = new RegExp(eacapeReg(hText), 'gi');
            // const keys = this.queryKeys.reduce((t, v, ind) => {
            //     t += v;
            //     if (ind != this.queryKeys.length - 1) t += '|';
            //     return t;
            // }, '');
            const keys = hText;
            return text.replace(new RegExp(keys, 'gi'), function ($1) {
                return `<span style="color: ${color};">${hText === $1 ? hText : $1}</span>`;
            });
        } else {
            return text;
        }
    },
    deepCopy: function (obj: any) {
        return startCopy(obj);

        function startCopy(obj2: any) {
            let source: any;
            if (Object.prototype.toString.call(obj2) == '[object Array]' || Object.prototype.toString.call(obj2) == '[object Object]') {
                if (Object.prototype.toString.call(obj2) == '[object Array]') {
                    source = [];
                }
                if (Object.prototype.toString.call(obj2) == '[object Object]') {
                    source = {};
                }
                Object.keys(obj2).forEach((v) => {
                    if (Object.prototype.toString.call(obj2[v]) == '[object Object]' || Object.prototype.toString.call(obj2[v]) == '[object Array]') source[v] = startCopy(obj2[v]);
                    else source[v] = obj2[v];
                });
                return source;
            } else source = obj2;
            return source;
        }
    },
    numToChinese: function (num: number) {
        let numArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

        return numArr[num];
    },
    setStore: function (name: string, content: any) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        uni.setStorageSync(name, content);
    },

    copyText: function (text: string, tips: string = '已复制到剪贴板') {
        uni.setClipboardData({
            data: text,
            success: () => {
                this.showToast(tips);
            },
            fail: () => {
                this.showToast('复制失败,请手动长按复制');
            }
        });
        return;
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    this.showToast(tips);
                })
                .catch((err) => {
                    this.showToast('复制失败,请手动长按复制');
                });
        } else {
            // TipsManger.getInstance().showTips('当前浏览器不支持粘贴板功能');
            this.fallbackCopyTextToClipboard(text, tips);
        }
    },
    // H5 备用的复制逻辑在 App 端无意义，这里保留空实现避免使用 document
    fallbackCopyTextToClipboard: function (_text: string, _tips: string) {
        // 在非 H5 端不会走到这里，H5 端优先使用 uni.setClipboardData
        this.showToast('复制失败,请手动长按复制');
    },
    gotoKefu: function (url: string) {
        // 统一通过内置 webview 打开客服链接，兼容 App
        uni.navigateTo({
            url: '/pages/webview/index?url=' + encodeURIComponent(url)
        });
    }
};
