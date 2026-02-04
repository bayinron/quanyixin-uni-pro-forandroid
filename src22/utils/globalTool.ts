import { http } from './request';
declare const plus: any;

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
  
    //将多个字符串相加
    addString: function (str1: string[]) {
        try {
            //判断str1数组里面的任何元素是否为空，否则返回0
            str1 = str1.map((item: string) => {
                return !item ? '0.00' : item;
            });
            //去掉字符串中的逗号
            const str = str1.map((item: string) => parseFloat(item.replace(/,/g, '')));
            let num = str.reduce((a: number, b: number) => a + b, 0);
            //判断 num 有没有小数点，如果有保留两位小数，否则保留0位小数
            let num2 = num.toFixed(num.toString().includes('.') ? 2 : 0);
            //把 num 做成 3 位 一个间隔的数，用逗号分开
            return num2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } catch (error) {
            console.log(error);
            return '0.00';
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
        if (typeof uni !== 'undefined' && uni.setClipboardData) {
            uni.setClipboardData({
                data: text,
                success: () => this.showToast(tips),
                fail: () => this.showToast('复制失败,请手动长按复制')
            });
            return;
        }
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    this.showToast(tips);
                })
                .catch(() => {
                    this.showToast('复制失败,请手动长按复制');
                });
        } else {
            this.fallbackCopyTextToClipboard(text, tips);
        }
    },
    fallbackCopyTextToClipboard: function (text: string, tips: string) {
        if (typeof document === 'undefined') {
            this.showToast('复制失败,请手动长按复制');
            return;
        }
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            console.log('Fallback: Copying text command was ' + (successful ? 'successful' : 'unsuccessful'));
            this.showToast(tips);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            this.showToast('复制失败,请手动长按复制');
        }
        document.body.removeChild(textArea);
    },
    openExternalUrl: function (targetUrl: string, openInNewTab: boolean = true) {
        if (!targetUrl) return;
        // #ifdef H5
        if (typeof window !== 'undefined' && openInNewTab) {
            window.open(targetUrl, '_blank');
            return;
        }
        // #endif
        // #ifndef H5
        if (typeof plus !== 'undefined' && plus.runtime) {
            plus.runtime.openURL(targetUrl);
            return;
        }
        // #endif
        if (typeof uni !== 'undefined' && uni.setClipboardData) {
            uni.setClipboardData({
                data: targetUrl,
                success: () => {
                    uni.showToast({
                        title: '链接已复制',
                        icon: 'none'
                    });
                }
            });
        }
    },
    getRuntimeOrigin: function () {
        if (typeof window !== 'undefined' && window.location) {
            return window.location.origin;
        }
        return import.meta.env.VITE_APP_BASE_URL || '';
    }
};
