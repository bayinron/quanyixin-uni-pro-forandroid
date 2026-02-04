<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getstream, getjfstream, getszstream, gethdstream, getlicaimx } from '../../api/getdata';

interface WalletItem {
  shuoming: string;
  res: string;
  addtime: string;
  lx: string;
  moneys: number;
  sxmoneys: number;
  is_cash: number;
}

const select = ref(1);
const wallet = ref<WalletItem[]>([]);
const wallet2 = ref<WalletItem[]>([]);
const wallet3 = ref<WalletItem[]>([]);
const wallet4 = ref<WalletItem[]>([]);
const data = ref<WalletItem[]>([]);

const page = ref({
  PageSize: 10,
  PageNumber: 1
});

onMounted(() => {
  GetSzData();
});

function GetJfData() {
  getjfstream().then((data: any) => {
    wallet3.value = data.records;
  });
}

function GetSzData() {
  getszstream().then((data: any) => {
    wallet.value = data.records;
    data.value = wallet.value;
  });
}

function getHdData() {
  gethdstream().then((data: any) => {
    wallet2.value = data.records;
  });
}

function getlcData() {
  getlicaimx().then((data: any) => {
    wallet4.value = data.licai;
    data.value = wallet4.value;
  });
}
</script>

<template>
  <div class="front">
    <div class="dian_warp">
      <div v-for="(item, index) in wallet" 
           :key="index" 
           class="dian">
        <p>
          {{item.shuoming}}
          <span>{{item.res}}</span>
        </p>
        <view class="flex flex-row flex-justify-between felx-align-center flex-items-center">
          {{item.addtime}}
          <view class="flex flex-col inline-block flex-justify-end flex-items-end">
            <span v-if="item.is_cash==1 && item.sxmoneys>0" >手续费：-{{item.sxmoneys}}</span>
            <span v-if="item.lx=='收入'">+{{item.moneys}}</span>
            <span v-if="item.lx!='收入'">-{{item.moneys}}</span>
          </view>
        </view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.front {
  background-color: #eff9ff;
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 0rpx;

  .dian_warp {
    padding-top: 20rpx;
    width: 95%;
    margin: 0 auto;
    display: block;
    border-radius: 10rpx;

    .dian {
      background-color: #fff;
      padding: 30rpx;
      border-radius: 10rpx;
      margin: 20rpx auto;

      p {
        color: #000;
        font-size: 32rpx;
        font-weight: 700;

        span {
          float: right;
          font-size: 24rpx;
        }
      }

      i {
        color: #bbbdc0;
        margin-top: 20rpx;
        display: block;
        font-style: normal;

        em {
          float: right;
          font-style: normal;
          font-size: 32rpx;
          font-weight: 700;
          color: #000;
        }
      }
    }
  }
}
</style>