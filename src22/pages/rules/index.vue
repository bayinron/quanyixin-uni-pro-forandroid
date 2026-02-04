<template>
    <MyNavBar title="" />
    <div class="rules_warp">
      <image mode="widthFix" src="@/static/img/jjjaaa.png" alt="" style="width: 100%" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/modules/userStore';
  import { storeToRefs } from 'pinia';
  import { getNotice } from '../../api/getdata';
  
  const userStore = useUserStore();
  const { prefixUrl } = storeToRefs(userStore);
  import MyNavBar from '@/components/MyNavBar.vue';
  const title = ref('');
  const news_con = ref('');
  const type = ref(null);
  
  function getData() {
    getNotice('7').then((data: any) => {
      news_con.value = data.msg.con;
    });
  }
  
  onMounted(() => {
    getData();
  });
  </script>
  
  <style lang="scss" scoped>
  .rules_warp {
    position: relative;
    height: 100%;
  
    .rules_bg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  
    .rules_warp1 {
      position: relative;
  
      .rules_warp2 {
        position: relative;
        top: 760rpx;
  
        image {
          position: absolute;
          z-index: 55;
          width: 95%;
          left: 10rpx;
        }
  
        .rules {
          position: relative;
          z-index: 66;
          padding-top: 120rpx;
          margin-left: 50rpx;
  
          p {
            color: #000;
            font-size: 28rpx;
            margin-top: 20rpx;
          }
        }
      }
  
      .rules_warp3 {
        position: relative;
        top: 820rpx;
        padding-bottom: 40rpx;
  
        image {
          position: absolute;
          z-index: 55;
          width: 95%;
          left: 10rpx;
        }
  
        .rules {
          position: relative;
          z-index: 66;
          padding-top: 120rpx;
          margin-left: 50rpx;
  
          .rule {
            display: flex;
            background-color: #fff;
            width: 91%;
            margin-left: 20rpx;
            margin-top: 10rpx;
            border-radius: 10rpx;
  
            .ru {
              flex: 1;
              padding: 20rpx;
              padding-left: 20rpx;
  
              p span {
                color: #f46e50;
              }
            }
          }
  
          .shu {
            margin-top: 20rpx;
            margin-left: 20rpx;
  
            p {
              color: #000;
              font-size: 28rpx;
              margin-top: 20rpx;
  
              span {
                color: #f46e50;
              }
            }
          }
        }
      }
    }
  }
  </style>