import { defineStore } from 'pinia';
import { store } from '@/stores';
import { ref } from 'vue';
import globalTool from '@/utils/globalTool';

export const useUserStore = defineStore('user', () => {
    // state
    const userId = ref();
    let wxCode = ref(); //服务器用来获取用户搜索历史记录的唯一id
    const chanyeRange = ref<Array<Object>>([]); // 用户权限编码集合 → 判断按钮权限
    // 使用 uni 环境变量获取当前运行平台，避免直接访问 window/location
    // H5 环境下从 location.origin 取域名，其它端使用默认前缀
    // @ts-ignore
    const isH5 = typeof window !== 'undefined' && typeof location !== 'undefined';
    let currentDomain = isH5 ? window.location.origin : 'https://101.55.21.55/';
    if (currentDomain.includes('localhost')) {
        currentDomain = '';
    }
    const url = isH5 && location.origin.indexOf('http://localhost') > -1 ? 'https://101.55.21.55/' : (isH5 ? location.origin + '/' : 'https://101.55.21.55/');
    const prefixUrl = ref(currentDomain || 'https://101.55.21.55/');
    const userdetail = ref<any>({});
    //图片前缀url
    function getOpenID() {
        uni.login({
            provider: 'weixin', //使用微信登录
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log('err', res);
            }
        });
    }
    /**
     * @param {LoginData}
     * @returns
     */
    function reqChanyeNames() {
        return new Promise<void>((resolve, reject) => {
            console.log("项目启动-获取服务器基本信息")
            // getChanyeNames({})
            //     .then((response: any) => {
            //         chanyeRange.value = response.data;
            //         // sessionStorage.setItem('tokenName', response.data.tokenName);
            //         // sessionStorage.setItem('sessionid', response.data.sessionid);
            //         // router.push({
            //         //     path: '/'
            //         // });
            //         resolve();
            //     })
            //     .catch((error: any) => {
            //         reject(error);
            //     });
        });
    }
  
    return {
        chanyeRange,
        reqChanyeNames,
        userId,
        wxCode,
        getOpenID,
        prefixUrl,
        url,
        userdetail
    };
});

// 非setup
export function useUserStoreHook() {
    return useUserStore(store);
}
