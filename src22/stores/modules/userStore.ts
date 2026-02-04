import { defineStore } from 'pinia';
import { store } from '@/stores';
import { ref } from 'vue';
function getRuntimeOrigin() {
    if (typeof window !== 'undefined' && window.location) {
        return window.location.origin;
    }
    return '';
}

export const useUserStore = defineStore('user', () => {
    // state
    const userId = ref();
    let wxCode = ref(); //服务器用来获取用户搜索历史记录的唯一id
    const chanyeRange = ref<Array<Object>>([]); // 用户权限编码集合 → 判断按钮权限
    const defaultOrigin = import.meta.env.VITE_APP_BASE_URL || 'https://wanhua5.sxjzlwxh.com';
    let currentDomain = getRuntimeOrigin();
    if(currentDomain.includes && currentDomain.includes('localhost')){
        currentDomain = "";
    }
    const effectiveOrigin = currentDomain || defaultOrigin;
    const url = effectiveOrigin.indexOf('http://localhost')>-1 ? 'https://wanhua5.sxjzlwxh.com/' : effectiveOrigin + '/';
    const prefixUrl = ref(import.meta.env.VITE_APP_BASE_URL || effectiveOrigin || 'https://wanhua5.sxjzlwxh.com/');// ref('https://wanhua5.sxjzlwxh.com/');
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
