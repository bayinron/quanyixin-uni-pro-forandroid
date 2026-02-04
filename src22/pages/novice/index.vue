<template>
    <MyNavBar title="" />
    <div class="novice_warp">
      <div>新人必看</div>
      <image mode="widthFix" class="takeout_bg" src="@/static/img/aaaaab.png" alt="" />
      <!-- <div class="novice">
        <div class="novice2">
          <div class="novice3">
            <p>{{ title }}</p>
          </div>
          <div class="novice4">
            <div v-html="news_con1"></div>
            <div v-html="news_con2"></div>
            <div v-html="news_con3"></div>
          </div>
        </div>
      </div> -->
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getNotice } from '../../api/getdata';
  import MyNavBar from '@/components/MyNavBar.vue';
  const title = ref('');
  const news_con1 = ref('');
  const news_con2 = ref('');
  const news_con3 = ref('');
  const type = ref(null);
  
  function getData() {
    getNotice('11').then((data: any) => {
      news_con1.value = data.msg.con;
    });
    
    getNotice('12').then((data: any) => {
      news_con2.value = data.msg.con;
    });
    
    getNotice('13').then((data: any) => {
      news_con3.value = data.msg.con;
    });
  }
  
  onMounted(() => {
    getData();
  });
  </script>
  
  <style lang="scss" scoped>
  .novice_warp {
    background-color: #f8f8f8;
    height: 100%;
    position: relative;
    padding-top: 20rpx;
    
    .takeout_bg {
      position: absolute;
      top: 0;
      width: 100%;
    }
    
    .novice {
      width: 95%;
      margin: 120rpx auto 0;
      position: relative;
      
      .novice2 {
        border-radius: 38rpx;
        background: #fff;
        margin-top: 40rpx;
        border: 1rpx solid #87b5ff;
        
        .novice3 {
          border-radius: 0 0 40rpx 40rpx;
          background: #4180f4;
          display: flex;
          width: 300rpx;
          height: 60rpx;
          margin: auto;
          align-items: center;
          justify-content: center;
          
          p {
            color: #fff;
            font-size: 32rpx;
            margin: 0 20rpx;
          }
        }
        
        .novice4 {
          font-size: 32rpx;
          color: #000;
          padding: 20rpx 40rpx 40rpx;
        }
      }
    }
  }
  </style>