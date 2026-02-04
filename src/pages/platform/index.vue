<template>
    <MyNavBar title="" />
    <div class="platform_warp">
        <div class="platform">
            <image src="@/static/img/qyjj/1.png" mode="widthFix" />
            <!-- <image src="@/static/img/qyjj/2.png" mode="widthFix" />
            <image src="@/static/img/qyjj/3.png" mode="widthFix" />
            <image src="@/static/img/qyjj/4.png" mode="widthFix" />
            <image src="@/static/img/qyjj/5.png" mode="widthFix" /> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
import { getNotice } from '@/api/index';
import MyNavBar from '@/components/MyNavBar.vue';
const userStore = useUserStore();
const { prefixUrl } = storeToRefs(userStore);

const title = ref('');
const news_con = ref('');
const type = ref(null);
const nav = ref(1);

function getData() {
    getNotice('3').then((data: any) => {
        news_con.value = data.msg.con;
    });
}

onShow(() => {
    getData();
});
</script>

<style lang="scss" scoped>
.platform_warp {
    position: relative;
    height: 100%;

    .platform {
        image {
            width: 100%;
            height: 100%;
            display: block;
            margin-bottom: -1rpx;
        }
    }
}
</style>
