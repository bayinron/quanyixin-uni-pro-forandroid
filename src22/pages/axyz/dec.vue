<template>
    <div class="deposit_warp">
        <image mode="widthFix" src="@/static/img/axyzdec.png" alt="" />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getLicai } from '@/api/getdata';
  import bgImage from '@/static/img/yjzqbg.png';  // 导入背景图片
  
  </script>
  
  <style lang="scss" scoped>
.deposit_warp{
    min-height: 100vh;
    img{
        width: 100%;
        height: 100%;
    }
}
  </style>