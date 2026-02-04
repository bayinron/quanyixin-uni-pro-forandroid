



<template>
    <view>
        <MyNavBar title="" />
        <image src="@/static/img/dhgz/1.png" mode="widthFix" class="w-full" />       
        <view class="bg-black">

            <DaihuanRule :ruleList="ruleList" />
        </view>
    </view>
</template>

<script setup lang="ts">
import MyNavBar from '@/components/MyNavBar.vue';
import DaihuanRule from '@/components/DaihuanRule.vue';
import { getAck } from '@/api';
const ruleList = ref<any[]>([
    {
        title: '新人体验专享',
        content: '新人首次注册账户平台赠送5000专享体验券,代还天数为1天,代还时间结束后利润自动返还账户,体验券由系统自动回收。',
        remark: '日利率为1%(5000×1%=50/天)',
        extra: '新人添加小助手可额外获得新手奖励12元 体验券收益及新手奖励均可提现'
    },
    {
        title: '普通专区',
        content: '起始代还金额为200 最高20000',
        remark: '代还天数为1天 日利率1% 每日可代还1次',
        extra: '(每日签到可额外获得6元)'
    },
    {
        title: 'VIP1专区',
        content: '起始代还金额为10000 最高为30000,',
        remark: '需分享1位普通会员 代还天数为3天 日利率1.2% 每日可代还1次',
        extra: '(每日签到可额外获得12元)'
    }
]);
onLoad(() => {
    getAck().then((res: any) => {
        ruleList.value = res.data;
    });
});
</script>

<style scoped lang="scss">
image{
    width: 100%;
    height: 100%;
    display: block;
    margin-bottom: -1rpx;
}
</style>