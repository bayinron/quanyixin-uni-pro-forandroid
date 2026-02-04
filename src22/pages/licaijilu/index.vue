<template>
  <div class="deposit_warp">
      <div class="notdata" v-if="list.length == 0">暂无数据</div>

      <div class="transfer" id="scrollContainer" @scroll="handleScroll">
          <div class="transfer2" v-for="(item, index) in list" :key="index">
              <!-- 顶部：名称天数和状态 -->
              <div class="header">
                  <div class="title">{{ item.lname }} {{ item.days }}天</div>
                  <div class="status">
                      <text :class="item.status === 1 ? 'ongoing' : 'ended'">
                          {{ item.status === 1 ? '进行中' : '已结束' }}
                      </text>
                  </div>
              </div>

              <!-- 中间：金额信息 -->
              <div class="content">
                  <div class="amount-item">
                      <div class="value">{{ item.moneys }}</div>
                      <div class="label">投入金额</div>
                  </div>
                  <div class="amount-item">
                      <div class="value">{{ item.lixi }}%</div>
                      <div class="label">日利率</div>
                  </div>
                  <div class="amount-item">
                      <div class="value">{{ item.lixi_total }}</div>
                      <div v-if="item.status === 1" class="label">预计收益</div>
                      <div v-else class="label">累计收益</div>
                  </div>
              </div>

              <!-- 底部：日期 -->
              <div class="footer">
                  {{ item.endtime }}
              </div>
          </div>

          <!-- 加载更多提示 -->
          <div class="loading-more" v-if="list.length > 0">
              {{ hasMore ? '加载中...' : '没有更多数据了' }}
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getLicai } from '@/api/getdata';

interface LicaiItem {
  lname: string;
  moneys: string;
  days: string;
  lixi: string;
  addtime: string;
  endtime: string;
  status: number; //1进行中，2已结束 
  lixi_total: string;
}

const params = ref({
  page: 1,
  size: 5
});

const list = ref<LicaiItem[]>([]);
const loading = ref(false);
const hasMore = ref(true);

// 获取数据
async function getData(isLoadMore = false) {
  if (loading.value || (!isLoadMore && !hasMore.value)) return;
  
  loading.value = true;
  try {
      const data: any = await getLicai(params.value);
      if (data.result === 'true') {
          if (isLoadMore) {
              list.value = [...list.value, ...data.licai];
          } else {
              list.value = data.licai;
          }
          
          // 判断是否还有更多数据
          hasMore.value = data.licai.length === params.value.size;
      }
  } catch (error) {
      console.error('获取数据失败:', error);
  } finally {
      loading.value = false;
  }
}

// 滚动处理
function handleScroll(e: any) {
  const scrollHeight = e.target.scrollHeight;
  const scrollTop = e.target.scrollTop;
  const clientHeight = e.target.clientHeight;
  
  // 距离底部100px时加载更多
  if (scrollHeight - scrollTop - clientHeight < 100 && !loading.value && hasMore.value) {
      params.value.page++;
      getData(true);
  }
}

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.deposit_warp {
  background-color: #eff9ff;
  min-height: 100vh;
  padding: 20rpx;

  .notdata {
      line-height: 160rpx;
      color: #333;
      text-align: center;
      font-size: 28rpx;
  }

  .transfer {
      height: calc(100vh - 40rpx);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; // 增加 iOS 滚动流畅度

      .transfer2 {
          background-color: #fff;
          border-radius: 16rpx;
          margin-bottom: 20rpx;
          padding: 30rpx;

          .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30rpx;

              .title {
                  font-size: 32rpx;
                  font-weight: 600;
                  color: #333;
                  text-transform: uppercase;
              }

              .status {
                  .ongoing {
                      background-color: #16cee5;
                      color: #fff;
                      font-size: 24rpx;
                      padding: 6rpx 20rpx;
                      border-radius: 6rpx;
                  }
                  .ended {
                      background-color: #ff4d4f;
                      color: #fff;
                      font-size: 24rpx;
                      padding: 6rpx 20rpx;
                      border-radius: 6rpx;
                  }
              }
          }

          .content {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30rpx;

              .amount-item {
                  flex: 1;
                  text-align: center;

                  .value {
                      font-size: 36rpx;
                      font-weight: bold;
                      color: #333;
                      margin-bottom: 10rpx;

                      &:nth-child(2) {
                          color: #ff6b00;
                      }
                  }

                  .label {
                      font-size: 24rpx;
                      color: #999;
                  }
              }
          }

          .footer {
              font-size: 24rpx;
              color: #999;
              text-align: right;
          }
      }

      .loading-more {
          text-align: center;
          padding: 20rpx 0;
          color: #999;
          font-size: 24rpx;
      }
  }
}
</style>