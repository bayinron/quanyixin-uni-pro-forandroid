<script setup lang="ts">
import { ref } from 'vue';
import { getHuodong } from '@/api/index';
import { useUserStore } from '@/stores/modules/userStore';
interface ActivityItem {
  id: string;
  pic: string;
  title: string;
}

const datas = ref<ActivityItem[]>([]);
const url = ref(useUserStore().prefixUrl);

onLoad(() => {
  getData();
});

const getData = async () => {
  const token = uni.getStorageSync('token');
  const res: any = await getHuodong();
  datas.value = res.hot || [];
};

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: '/pages/activitycon/index?id=' + id
  });
};
</script>

<template>
  <view class="activity_warp">    
    <view class="activity_con">
      <view 
        v-for="(item, index) in datas" 
        :key="index" 
        @tap="goToDetail(item.id)"
        class="item"
      >
        <image v-if="item.pic" :src="url + item.pic" style="width: 100%" mode="widthFix"></image>
        <!-- <image src="@/static/img/mallbg.png" style="width: 100%" mode="widthFix"></image> -->
        <view class="activity_item_title">
          <text>{{ item.title }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.activity_warp {
  width: 100%;
  background-color: #f8f8f8;
}

.header {
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-size: 36rpx;
  background-color: #fff;
  position: relative;
  border-bottom: 2rpx solid #f1f1f1;
}

.activity_con {
  padding: 20rpx;
  
  .item {
    margin-bottom: 30rpx;
    background-color: #fff;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
    
    image {
      display: block;
    }
    .activity_item_title {
      padding: 20rpx;
      text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}
</style>