<template>
    <div class="revenuedetails_wrap">
      <div>详情</div>
      <image mode="widthFix" class="index_bg" src="@/static/img/xqxqxq.png" alt="" />
      <div class="xqiangqing_warp">
        <div class="xqiangqing_warp1">
          <span>收益（¥）</span>
          <p>{{ datas.shouyi }}</p>
          <i>{{ datas.shuoming }}：<em>{{ datas.zmoneys }}</em></i>
        </div>
  
        <div class="xinxi_warp">
          <i>垫资信息</i>
          <div class="xinxi_warp1">
            <div class="xinxi">
              <p style="color: rgba(153, 153, 153, 1)">垫资金额</p>
              <p style="color: rgba(22, 206, 229, 1); font-size: 48rpx">
                {{ datas.moneys }}元
              </p>
            </div>
            <div class="xinxi">
              <p>垫资时间: <span>{{ datas.addtime }}</span></p>
              <p style="margin-top: 30rpx">到期时间: <span>{{ datas.endtime }}</span></p>
            </div>
          </div>
        </div>
  
        <div class="xinxi_warp" style="margin: 40rpx auto">
          <i>垫资对象</i>
          <div class="xinxi_warp1">
            <div class="xinxi">
              <p style="color: rgba(153, 153, 153, 1)">姓名</p>
              <p style="color: rgba(0, 0, 0, 1); font-size: 26rpx; font-weight: bold">
                {{ datas.bankuser }}
              </p>
            </div>
            <div class="xinxi">
              <p style="color: rgba(136, 136, 136, 1); font-size: 24rpx">
                {{ datas.bankname }}
              </p>
              <p style="color: rgba(0, 0, 0, 1); font-size: 26rpx; font-weight: bold">
                {{ datas.bankcode }}
              </p>
            </div>
          </div>
        </div>
  
        <div class="detail_revenue">
          <div class="title">
            <div style="width: 40%; text-align: left; padding-left: 50rpx">收益日期</div>
            <div>本金</div>
            <div>收益</div>
            <div>状态</div>
          </div>
          <div v-for="(item, index) in records" :key="index" class="details_list">
            <div style="width: 40%; text-align: left; padding-left: 50rpx">
              {{ item.endtime1 }}
            </div>
            <div>{{ item.moneys1 }}</div>
            <div class="lixisy">{{ item.lixi_moneys1 }}</div>
            <div>{{ item.isok }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getRecordDetail } from '../../api/getdata';
  
  interface RecordItem {
    endtime1: string;
    moneys1: string | number;
    lixi_moneys1: string | number;
    isok: string;
  }
  
  interface DataItem {
    shouyi: string | number;
    shuoming: string;
    zmoneys: string | number;
    moneys: string | number;
    addtime: string;
    endtime: string;
    bankuser: string;
    bankname: string;
    bankcode: string;
  }
  
  const records = ref<RecordItem[]>([]);
  const datas = ref<DataItem>({} as DataItem);
  const query = ref<any>({});
  onLoad((options:any) => {
    query.value = options;
  });
  function getData() {
    getRecordDetail(query.value.sid as string).then((data: any) => {
      records.value = data.ding;
      datas.value = data.dingdan[0];
    });
  }
  
  onMounted(() => {
    getData();
  });
  </script>
  
  <style lang="scss" scoped>
  .revenuedetails_wrap {
    padding-top: 0rpx;
  
    .index_bg {
      position: absolute;
      top: -50rpx;
      width: 100%;
      left: 0;
    }
  
    .xqiangqing_warp {
      position: relative;
      z-index: 3;
      padding-top: 50rpx;
  
      .xqiangqing_warp1 {
        span {
          color: #fff;
          display: block;
          text-align: center;
        }
  
        p {
          text-align: center;
          font-size: 50rpx;
          background-color: #00a0c5;
          width: 60%;
          display: block;
          margin: 30rpx auto;
          line-height: 100rpx;
          color: #fff;
          border-radius: 10rpx;
          letter-spacing: 16rpx;
        }
  
        i {
          margin-top: 60rpx;
          text-align: center;
          display: block;
          font-style: normal;
          font-size: 28rpx;
          color: #fff;
  
          em {
            font-style: normal;
          }
        }
      }
  
      .xinxi_warp {
        background-color: #fff;
        display: block;
        width: 95%;
        margin: 80rpx auto 0;
        padding: 20rpx 20rpx;
        border-radius: 20rpx;
  
        i {
          display: block;
          font-style: normal;
          color: #000;
          font-size: 28rpx;
          font-weight: 700;
        }
  
        .xinxi_warp1 {
          display: flex;
  
          .xinxi {
            flex: 1;
            margin-top: 20rpx;
  
            p {
              color: #000;
              font-size: 24rpx;
  
              span {
                color: #555;
              }
            }
          }
          .xinxi2 {
            margin-top: 20rpx;
  
            p {
              color: #000;
              font-size: 24rpx;
  
              span {
                color: #555;
              }
            }
          }
        }
      }
  
      .detail_revenue {
        width: 94%;
        background: #fff;
        border-radius: 20rpx;
        margin: 40rpx auto;
        line-height: 80rpx;
  
        .title {
          display: flex;
  
          div {
            width: 22%;
            text-align: center;
            color: #888;
            font-size: 24rpx;
          }
        }
  
        .details_list {
          display: flex;
  
          div {
            text-align: center;
            width: 22%;
          }
  
          .lixisy {
            font-weight: 600;
            color: #16cee5;
          }
        }
      }
    }
  }
  </style>