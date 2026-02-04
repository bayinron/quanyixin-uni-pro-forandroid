<template>
    <div class="download" style="padding-top: 20rpx;">
      <div
        style="position: relative; font-size: 28rpx;color: #000; background: #fff; width: 710rpx; margin: 20rpx auto 0; border-radius: 20rpx; padding: 20rpx 40rpx 40rpx;"
        v-html="content"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { usePageStore } from '@/stores/modules/pageStore';
  const pageStore = usePageStore();
  
  const show = ref(false);
  const msg = ref('');
  const content = ref('');
  

  
  onMounted(() => {
    content.value = uni.getStorageSync('zixunContent') || '';
  });
  
  function sendMsg(content: string) {
    msg.value = content;
    show.value = true;
  }
  </script>
  
  <style scoped>
  .download {
    padding-top: 20rpx;
    min-height: 100vh;
    background-color: #f3f4f8;
  }
  
  
  .content {
    position: relative;
    font-size: 28rpx;
    background: #fff;
    width: 1800rpx;
    margin: 120rpx auto 0;
    border-radius: 20rpx;
    padding: 20rpx 40rpx 40rpx;
  }
  </style>