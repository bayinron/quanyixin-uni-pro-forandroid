<template>
    <MyNavBar title="" />
    <div class="platform_warp">
      <div class="platform">
        <image mode="widthFix" src="@/static/img/qywh2.png" alt="" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/modules/userStore';
  import { storeToRefs } from 'pinia';
  import { getNotice } from '../../api/getdata';
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
  
  onMounted(() => {
    getData();
  });
  </script>
  
  <style lang="scss" scoped>
  .platform_warp {
    position: relative;
    height: 100%;
  
    .vux-header {
      background: none !important;
    }
  
    .platform {
      image {
        width: 100%;
        position: relative;
      }
    }
  
    .qiang_con {
      padding-bottom: 40rpx;
      position: relative;
      bottom: 50rpx;
      background-color: #16cee5;
  
      .qiang——warp {
        background-color: #fff;
        padding: 0 40rpx;
        width: 90%;
        display: block;
        margin: 40rpx auto;
        border-radius: 30rpx;
        padding-top: 20rpx;
        font-size: 32rpx;
        font-weight: 600;
      }
  
      .data——warp {
        margin-top: 30rpx;
  
        .data {
          display: flex;
  
          span {
            border-top-left-radius: 30rpx;
            border-top-right-radius: 30rpx;
            flex: 1;
            text-align: center;
            margin: 0 20rpx;
            padding: 20rpx 10rpx;
            font-size: 30rpx;
          }
  
          .active {
            background-color: #16cee5;
            color: #fff;
          }
        }
  
        .da {
          background: linear-gradient(180deg, #d9e2ff, #fff);
          padding: 40rpx 20rpx;
          border-radius: 30rpx;
  
          p {
            font-size: 32rpx;
          }
        }
      }
    }
  }
  </style>