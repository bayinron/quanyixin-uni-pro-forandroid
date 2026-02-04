<template>
    <MyNavBar title="" />
    <div class="women">
        <div>关于我们</div>
        <image mode="widthFix" class="download_bg" src="@/static/img/dmz.png" alt="" />
        <div class="gsjj">
            <div class="gs">
                <p v-html="news_con"></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getNotice } from '../../api/getdata';

const title = ref('');
const news_con = ref('');
const type = ref(null);
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
import { getapistrade } from '../../api/getdata';
import MyNavBar from '@/components/MyNavBar.vue';
const userStore = useUserStore();
const { prefixUrl } = storeToRefs(userStore);
function getData() {
    getNotice('9').then((data: any) => {
        //把data.msg.con中的src=替换为prefixUrl
        news_con.value = data.msg.con.replace(/src="/g, 'src="' + prefixUrl.value);
    });
}

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped>
.women {
    background-color: #f8f8f8;
    height: 100%;
    position: relative;
    padding-top: 20rpx;

    .download_bg {
        position: absolute;
        top: 0;
        width: 100%;
    }

    .gsjj {
        top: 400rpx;
        background-color: #fff;
        position: relative;
        z-index: 55;
        width: 95%;
        display: block;
        margin: 0 auto;
        padding: 40rpx;
        border-radius: 10rpx;
        margin-bottom: 40rpx;

        .gs {
            border-radius: 38rpx;
            background: #fff;
            margin-top: 40rpx;
            padding: 40rpx;

            p {
                font-size: 32rpx;
                color: #333;
                line-height: 48rpx;
            }
        }
    }
}
</style>
