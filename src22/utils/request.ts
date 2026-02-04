/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import { useUserStore } from '@/stores/modules/userStore';

//反向代理关键词
const proxyKey = '/wanhua/';
const prodBaseUrl = (import.meta.env.VITE_APP_BASE_URL || 'https://wanhua.zhounengkun16.cn/').replace(/\/+$/, '') + '/';
//服务器定义的url前缀
// 添加拦截器
const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        const isDev = import.meta.env.MODE === 'development';
        // #ifdef APP-PLUS
        const cleanedPath = options.url.replace(/^\/+/, '');
        const apiPath = cleanedPath.startsWith('api/') ? cleanedPath : `api/${cleanedPath}`;
        options.url = prodBaseUrl + apiPath;
        // #endif
        // #ifndef APP-PLUS
        options.url = (isDev ? proxyKey : '') + 'api/' + options.url;
        // #endif
        // 2. 请求超时, 默认 60s
        options.timeout = 15000;
        // 3. 添加小程序端请求头标识
        options.header = {
            ...options.header,
            'source-client': 'miniapp'
        };
        // 4. 添加 token 请求头标识
        const userStore = useUserStore();
        const token = uni.getStorageSync('token');
        if (token) {
            if (options.method == 'GET') {
                if (options.url.indexOf('?') == -1) {
                    options.url += '?token=' + token;
                } else {
                    options.url += '&token=' + token;
                }
            } else {
                options.data
                    ? ((options.data as any).token = token)
                    : (options.data = {
                          token: token
                      });
            }
            // options.header.Authorization = token;
        }
    }
};
uni.addInterceptor('request', httpInterceptor);
uni.addInterceptor('uploadFile', httpInterceptor);

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
    code: string;
    msg: string;
    result: T;
};
const notips = ["温馨提示，请先实名"]
// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
    if (options.data && typeof options.data === 'object' && (options.data as any).page == 1) {
        uni.showLoading({
            title: '加载中',
            mask: true
        });
    }
    // 1. 返回 Promise 对象
    return new Promise<Data<T>>((resolve, reject) => {
        uni.showLoading({
            title: '加载中',
            mask: true
        });
        uni.request({
            ...options,
            // 响应成功
            success(res) {
                const data = res.data as any;
                if (data.result == 'false' || data.code == -1 || !data.hasOwnProperty('result')) {
                    console.log('data.result == false', data);
                    if(data.msg?.includes('重新登录')){
                        //清除缓存
                        uni.clearStorage();
                        uni.redirectTo({
                            url:'/pages/login/index'
                        })
                    }
                    if(!notips.includes(data.msg)){
                        uni.showToast({
                            icon: 'none',
                            title: data.msg || '请求错误'
                        });

                    }
                    // if (data.msg.includes('签名错误') || data.msg.includes('请重新登录') || data.msg.includes('提示：您已在其它地方登录。')) {
                    //     uni.reLaunch({ url: '/pages/login/index' });
                    //     uni.clearStorageSync();
                    // }
                    reject(res);
                }
                // 状态码 2xx， axios 就是这样设计的
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    //if(res.data.result)
                    // 2.1 提取核心数据 res.data
                    resolve(res.data as Data<T>);
                } else if (res.statusCode === 401) {
                    // 401错误  -> 清理用户信息，跳转到登录页
                    //   const memberStore = useMemberStore();
                    //   memberStore.clearProfile();
                    uni.clearStorageSync();
                    uni.reLaunch({ url: '/pages/login/index' });
                    reject(res);
                } else {
                    // 其他错误 -> 根据后端错误信息轻提示
                    // uni.showToast({
                    //     icon: 'none',
                    //     title: (res.data as Data<T>).msg || '请求错误'
                    // });
                    reject(res);
                }
            },
            // 响应失败
            fail(err) {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误，换个网络试试'
                });
                uni.reLaunch({ url: '/pages/login/index' });
                reject(err);
            },
            complete() {
                uni.hideLoading();
            }
        });
    });
};
