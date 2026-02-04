import { createSSRApp } from 'vue';
import App from './App.vue';
import 'uno.css';
import '@/styles/index.scss';
import '@/styles/common.scss';
import { useUserStoreHook } from '@/stores/modules/userStore';

import { setupStore } from '@/stores';

export function createApp() {
    const app = createSSRApp(App);
    app.config.globalProperties.$test = () => {
        console.log('test----------------');
    };

    setupStore(app);
    // console.log(process.env.NODE_ENV )
    const userStore = useUserStoreHook();
    userStore.reqChanyeNames();
    return {
        app
    };
}
