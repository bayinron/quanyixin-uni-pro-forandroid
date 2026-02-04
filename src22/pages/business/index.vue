<template>
    <MyNavBar title="" />
    <div class="business_warp">
        <image mode="widthFix" class="business_bg" src="@/static/img/pt_bg.png" alt="" />
        <div class="ptfz_warp">
            <div class="ptfz">
                <image mode="widthFix" src="@/static/img/whbg.png" alt="" />
            </div>
            <div class="daili_warp">
                <div class="daili">
                    <div class="dai">
                        <image mode="widthFix" src="@/static/img/daili.png" alt="" />
                    </div>
                    <div class="dai">
                        <image mode="widthFix" src="@/static/img/daili.png" alt="" />
                    </div>
                    <div class="dai">
                        <image mode="widthFix" src="@/static/img/daili.png" alt="" />
                    </div>
                </div>
                <p v-html="news_con"></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/modules/userStore';
import { storeToRefs } from 'pinia';
import { getNotice } from '../../api/getdata';
import MyNavBar from '@/components/MyNavBar.vue';
const news_con = ref('');
const type = ref<number | null>(null);
const item = ref<any[]>([]);

const userStore = useUserStore();
const { prefixUrl } = storeToRefs(userStore);

onMounted(() => {
    GetData();
});

function GetData() {
    getNotice(5).then((data: any) => {
        news_con.value = data.msg.con;
    });
}
</script>

<style lang="scss" scoped>
.business_warp {
  height: 100%;
  position: relative;
  padding-top: 20rpx;
  
  .business_bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .ptfz_warp {
    position: relative;

    .ptfz {
      position: absolute;
      z-index: 54;
      top: 800rpx;

      image {
        width: 100%;
      }
    }
  }

  .daili_warp {
    background-color: #eff5fe;
    width: 95%;
    display: block;
    margin: 0 auto;
    border-radius: 30rpx;
    position: relative;
    top: 1480rpx;

    .daili {
      display: -ms-flexbox;
      display: flex;

      .dai {
        -ms-flex: 1;
        flex: 1;
        padding: 40rpx;

        image {
          width: 100%;
        }
      }
    }

    p {
      padding: 0 40rpx;
      color: #1e3667;
      padding-bottom: 40rpx;
    }
  }
}
</style>
