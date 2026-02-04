<script setup lang="ts">
import { ref } from 'vue';
import { getRecordDetail, postCj } from '@/api/index';

interface RecordItem {
  endtime1: string;
  moneys1: string;
  lixi_moneys1: string;
  isok: string;
}

interface DetailData {
  shouyi: string;
  zmoneys: string;
  dd_name: string;
  shuoming: string;
  moneys: string;
  rishouyi: string;
  addtime: string;
  endtime: string;
  bankuser: string;
  bankcode: string;
  bankname: string;
  sid: string;
}

const datas = ref<DetailData>({} as DetailData);
const records = ref<RecordItem[]>([]);
const isLoading = ref(false);

onLoad((options: any) => {
  getData(options.sid);
});

const getData = (sid: string) => {
  getRecordDetail(sid).then((res: any) => {
    records.value = res.ding;
    datas.value = res.dingdan[0];
  });
};

const ok = () => {
  if (isLoading.value) return;
  isLoading.value = true;

  postCj().then((res: any) => {
    isLoading.value = false;
    getData(datas.value.sid);
  });
};
</script>

<template>
  <div class="revenuedetails_wrap">
    <div class="details_con">
      <div class="con_one">
        <image src="@/static/img/appxz.png" mode="widthFix" />
        <div class="income">
          <div>
            <p>利息收益</p>
            <span>¥{{ datas.shouyi }}</span>
          </div>
          <p>本息合计：<span>¥{{ datas.zmoneys }}</span></p>
        </div>
      </div>

      <div class="card_con">
        <p class="clearfix">
          {{ datas.dd_name }}<span>{{ datas.shuoming }}</span>
        </p>
        <div class="card_money">
          <span>代还金额</span>
          <p>{{ datas.moneys }}元</p>
          <div>
            <p>总收益</p>
            <span>{{ datas.rishouyi }}%</span>
          </div>
        </div>
        <div class="time_end">
          代还<i> {{ datas.addtime }}</i>
          <span class="clearfix">到期 <b>{{ datas.endtime }}</b></span>
        </div>
      </div>

      <div class="repayment_wrap">
        <p>信用卡代还信息</p>
        <div class="repayment_con">
          <div>
            <p>姓名</p>
            <span>{{ datas.bankuser }}</span>
          </div>
          <div>
            <p>{{ datas.bankname }}</p>
            <span>{{ datas.bankcode }}</span>
          </div>
        </div>
      </div>

      <div class="detail_revenue">
        <div class="title">
          <div style="text-align: inherit; width: 30%">收益日期</div>
          <div>还款本金</div>
          <div>利息收益</div>
          <div>状态</div>
        </div>
        <div v-for="(item, index) in records" :key="index" class="details_list">
          <div style="text-align: inherit; width: 30%">{{ item.endtime1 }}</div>
          <div>{{ item.moneys1 }}</div>
          <div class="lixisy">{{ item.lixi_moneys1 }}</div>
          <div>{{ item.isok }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.revenuedetails_wrap {
  min-height: 100vh;
  background: #f5f6f8;
  padding: 20rpx;

  .details_con {
    .con_one {
      background: linear-gradient(to right, #4080ff, #6ba6ff);
      border-radius: 20rpx;
      padding: 40rpx;
      position: relative;
      overflow: hidden;
      
      image {
        position: absolute;
        right: 40rpx;
        top: 50%;
        transform: translateY(-50%);
        width: 120rpx;
        height: 120rpx;
      }

      .income {
        color: #fff;
        
        div {
          margin-bottom: 20rpx;
          p {
            font-size: 28rpx;
            margin-bottom: 10rpx;
          }
          span {
            font-size: 48rpx;
            font-weight: bold;
          }
        }

        > p {
          font-size: 26rpx;
          span {
            font-weight: bold;
          }
        }
      }
    }

    .card_con {
      background: #fff;
      border-radius: 20rpx;
      margin-top: 20rpx;
      padding: 30rpx;

      > p {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 20rpx;
        
        span {
          float: right;
          color: #666;
          font-size: 26rpx;
        }
      }

      .card_money {
        border-bottom: 2rpx solid #eee;
        padding-bottom: 20rpx;
        margin-bottom: 20rpx;

        span {
          color: #666;
          font-size: 26rpx;
        }

        p {
          font-size: 40rpx;
          font-weight: bold;
          margin: 10rpx 0;
        }

        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          p {
            font-size: 26rpx;
            color: #666;
            font-weight: normal;
            margin: 0;
          }

          span {
            color: #ff6b6b;
            font-weight: bold;
          }
        }
      }

      .time_end {
        color: #666;
        font-size: 26rpx;

        i {
          color: #333;
          font-style: normal;
        }

        span {
          float: right;
          
          b {
            color: #333;
          }
        }
      }
    }

    .repayment_wrap {
      background: #fff;
      border-radius: 20rpx;
      margin-top: 20rpx;
      padding: 30rpx;

      > p {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 20rpx;
      }

      .repayment_con {
        div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15rpx;
          
          p {
            color: #666;
            font-size: 26rpx;
          }

          span {
            color: #333;
            font-size: 26rpx;
          }
        }
      }
    }

    .detail_revenue {
      background: #fff;
      border-radius: 20rpx;
      margin-top: 20rpx;
      padding: 30rpx;

      .title {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid #eee;
        
        div {
          color: #666;
          font-size: 26rpx;
          text-align: center;
          flex: 1;
        }
      }

      .details_list {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0;
        border-bottom: 2rpx solid #eee;
        
        div {
          color: #333;
          font-size: 26rpx;
          text-align: center;
          flex: 1;

          &.lixisy {
            color: #ff6b6b;
          }
        }
      }
    }
  }
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
</style>

