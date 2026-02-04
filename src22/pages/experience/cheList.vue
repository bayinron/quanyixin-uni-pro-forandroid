<template>
    <div class="experience_warp flex_column">
        <div class="xmlistbox flex_1 overflow-y-auto">
            <div class="li flex_row" v-for="(item, index) in lists.data">
                <div class="mr_10 relative"><image mode="widthFix" :src="item.pic?prefixUrl+item.pic:''" class="pic" style="display: block; width: 72px; height: 72px; border-radius: 5px" /></div>
                <div class="flex_1">
                    <div class="name">{{ item.dname }}</div>
                    <div class="flex_row flex_center">
                        <div class="flex_1 mr_10">
                            <div class="c_666">{{ item.con }}</div>
                            <div class="c_main">{{ item.xm_yu }}</div>
                        </div>
                        <div class="mainbtn mainbtn_qx" v-if="item.isok == 1">未开放</div>
                        <div class="mainbtn" @click="gotobuy(item)" v-if="item.isok == 0">立即参与</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="tianjia" @click="handleOrder">
            <p>确认</p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getZhanche, postOrder, getuserdetail, _getXmlist } from '../../api/getdata';
import globalTool from '@/utils/globalTool';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();

const { prefixUrl } = storeToRefs(userStore);
interface UserInfo {
    benjin: string;
    uselevel: number;
    pay_pwd: string;
    name: string;
}

interface XindaiInfo {
    uselevel: number;
    uname: string;
    bankuser: string;
    bankcode: string;
    riqi: string;
    benjin: string;
    lixi: string;
    day: string;
}

interface TanchuangInfo {
    msg: string;
}
interface Lists {
    data: any;
}
const xindai: any = ref<XindaiInfo>({} as XindaiInfo);
const userInfo = ref<UserInfo>({} as UserInfo);

const lists = ref<Lists>({} as Lists);
const tanchuang = ref<TanchuangInfo>({} as TanchuangInfo);
const adv_ = ref(false);
const lname = ref('');

const calculateIncome = computed(() => {
    const { benjin, lixi, day } = xindai.value;
    return (Number(benjin) * (Number(lixi) / 100) * Number(day)).toFixed(2);
});

const formatPhone = (phone: string) => {
    return phone?.substr(0, 3) + '****' + phone?.substr(7);
};

const initData = async () => {
    const res: any = await getuserdetail();
    userInfo.value = res;
    userInfo.value.uselevel = Number(res.uselevel);
    localStorage.setItem('pay_pwd', res.pay_pwd);
};

const getData = async (sx: string) => {
    const res: any = await getZhanche(sx);
    xindai.value = res;
};
const getXmlist = async (id: string) => {
    const res: any = await _getXmlist(id);
    lists.value = res;
    //console.log(JSON.stringify(lists))
};
const handleOrder = async () => {
    const res: any = await postOrder(xindai.value.zid, xindai.value.benjin, xindai.value.day);
    tanchuang.value = res;
    adv_.value = true;
};
const pageid = ref('');

const gotobuy = async (item: any) => {
    if (item.isok == 1) {
        uni.showToast({
            title: '未开放，无法投资',
            duration: 2000,
            icon: 'none'
        });
        return;
    }
    // if(item.if_acc!=1){
    // 	uni.showToast({
    // 		title: '等级不符，无法投资',
    // 		duration: 2000,
    // 		icon:"none"
    // 	});
    // 	return;
    // }
    // if(item.xm_yu<=0){
    // 	return uni.showToast({
    // 		title: '已售罄，无法投资',
    // 		duration: 2000,
    // 		icon:"none"
    // 	});
    // }

    /**
     * 爱心 id 3
     * 车贷 id 4
     */
    if (pageid.value == '4') {
        uni.navigateTo({
            url: `/pages/experience/cheDetail?zqid=${item.zqid}&id=${item.id}`
        });
    } else {
        uni.navigateTo({
            url: `/pages/experience/aixinDetail?zqid=${item.zqid}&id=${item.id}`
        });
    }
    // const res: any = await postOrder(xindai.value.zid, xindai.value.benjin, xindai.value.day);
    // tanchuang.value = res;
    // adv_.value = true;
};

const handleClose = () => {
    uni.navigateBack();
};
onLoad(async (options: any) => {
    const pages = getCurrentPages();
    const currentPage: any = pages[pages.length - 1];
    if (currentPage?.options) {
        pageid.value = currentPage.options.id;
        const { sx, id, lname: name } = currentPage.options;
        lname.value = name;
        uni.setNavigationBarTitle({
            title: name
        });

        //console.log(JSON.stringify(currentPage.options))
        await initData();
        // await getData(sx);
        await getXmlist(id); //车贷4，企业5，爱心3，房贷2
    }
});
</script>

<style lang="scss" scoped>
.experience_warp {
    height: calc(100vh - 44px);
    overflow: hidden;
}
.xmlistbox {
    position: relative;
}

.tianjia {
    text-align: center;
    background-color: #16cee5;
    width: 90%;
    display: block;
    margin: 360rpx auto 0;
    color: #ffffff;
    font-size: 32rpx;
    line-height: 90rpx;
    height: 90rpx;
    border-radius: 50rpx;
}
</style>
