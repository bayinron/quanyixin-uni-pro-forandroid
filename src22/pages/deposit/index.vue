<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getstream } from '../../api/getdata';

interface RecordItem {
  shuoming: string;
  addtime: string;
  moneys: number;
  res: string;
}

const data = ref<RecordItem[]>([]);
const wallet = ref<RecordItem[]>([]);
const wallet2 = ref<RecordItem[]>([]);

const page = ref({
  PageSize: 10,
  PageNumber: 1
});

onMounted(() => {
  GetData();
});

function GetData() {
  getstream().then((res: any) => {
    wallet.value = res.records;
    data.value = wallet.value;
  });
}
</script>

<template>
  <div class="deposit_warp">
    <div v-if="data.length==0" class="notdata">暂无数据</div>
    
    <div class="transfer">
      <div v-for="(item, index) in data" 
           :key="index" 
           class="transfer2">
        <div class="transfer3">
          <p>{{item.shuoming}}</p>
          <span>{{item.addtime}}</span>
        </div>
        <div class="transfe4">
          <p>+{{item.moneys}}</p>
          <i>{{item.res}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.deposit_warp {
  background-color: #eff9ff;
  min-height: 100vh;
  padding-top: 20rpx;

  .notdata {
    line-height: 160rpx;
    color: #333;
    text-align: center;
    font-size: 28rpx;
  }

  .transfer {
    width: 95%;
    display: block;
    margin: 0 auto;
    border-radius: 30rpx;

    .transfer2 {
      padding: 30rpx;
      background-color: #fff;
      display: flex;
      border-bottom: 0.01px solid hsla(0, 0%, 85%, 0.5);
      padding-bottom: 40rpx;

      .transfer3 {
        flex: 1;

        p {
          font-size: 32rpx;
          color: #000;
          font-weight: 600;
        }

        span {
          color: #999;
          font-size: 24rpx;
        }
      }

      .transfe4 {
        p {
          color: #16cee5;
          font-size: 32rpx;
        }

        i {
          display: block;
          text-align: right;
          font-style: normal;
        }

        span {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
}
</style>