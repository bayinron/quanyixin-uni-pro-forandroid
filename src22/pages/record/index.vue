<template>
    <div class="deposit_warp">
      <div class="notdata" v-if="list.length == 0">暂无数据</div>
      
      <div class="transfer">
        <div v-for="(item, index) in list" :key="index" class="transfer2">
          <div class="transfer3">
            <p>{{ item.shuoming }}</p>
            <span>{{ item.addtime }}</span>
          </div>
          <div class="transfe4">
            <p>{{ item.lx == '支出' ? '-' : '+' }}{{ item.moneys }}</p>
            <i>{{ item.res }}</i>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { getjfstream } from '../../api/getdata'
  
  interface RecordItem {
    shuoming: string
    addtime: string
    lx: string
    moneys: string | number
    res: string
  }
  
  const list = ref<RecordItem[]>([])
  
  const getData = async () => {
    const res:any = await getjfstream()
    list.value = res.records
  }
  
  onMounted(() => {
    getData()
  })
  </script>
  
  <style lang="scss">
  .deposit_warp {
    .notdata {
      text-align: center;
      padding: 40rpx;
      color: #999;
      font-size: 28rpx;
    }
    
    .transfer {
      padding: 20rpx;
      
      .transfer2 {
        background: #fff;
        border-radius: 20rpx;
        padding: 30rpx;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: .01px solid hsla(0, 0%, 85%, 0.5);
        .transfer3 {
          p {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 10rpx;
          }
          
          span {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .transfe4 {
          text-align: right;
          p {
              color: #16cee5;
              font-size: 32rpx;
        
            font-weight: bold;
            margin-bottom: 10rpx;
          }
          
          i {
            font-size: 24rpx;
            color: #999;
            font-style: normal;
          }
        }
      }
    }
  }
  </style>