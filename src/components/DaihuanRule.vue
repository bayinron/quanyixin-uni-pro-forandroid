<template>
  <view class="daihuan-rules">
    <view 
      class="rule-card" 
      v-for="(rule, index) in ruleList" 
      :key="index"
    >
      <view class="card-tab">{{ rule.title }}</view>
      <view class="card-content">
        <view class="rule-line">{{ rule.content }}</view>
        <view class="rule-remark" v-if="rule.remark">{{ rule.remark }}</view>
        <view class="rule-extra" v-if="rule.extra">{{ rule.extra }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface RuleItem {
  title: string;
  content: string;
  remark: string;
  extra: string;
}

interface Props {
  ruleList: RuleItem[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.daihuan-rules {
  padding: 20rpx;
  // background-color: #000;
  min-height: 100vh;
}

.rule-card {
  position: relative;
  background: #3F342B;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  padding: 30rpx;
  box-shadow: inset 0 0 10rpx rgba(255, 255, 255, 0.1), 0 0 6rpx rgba(232, 191, 146, 0.5);
  overflow: visible;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.card-tab {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  background: #281c0b;
  color: #e8bf92;
  padding: 15rpx 25rpx;
  border-radius: 15rpx 0rpx 15rpx 0;
  font-size: 28rpx;
  font-weight: 600;
  z-index: 2;
  border: 1rpx solid #6a5d54;
  box-shadow: 0 0 6rpx rgba(232, 191, 146, 0.6);
}

.card-content {
  padding-top: 50rpx;
  
  .rule-line {
    color: #fcfcfc;
    font-size: 28rpx;
    line-height: 1.8;
    margin-bottom: 15rpx;
    font-weight: 500;
    
    &:last-child {
      margin-bottom: 0;
      color: #FF6B6B;
    }
  }
  .rule-remark {
    color: #e8bf92;
    font-size: 28rpx;
    line-height: 1.8;
    margin-bottom: 15rpx;
  }
  .rule-extra {
    color: #FF6B6B;
    font-size: 28rpx;
    line-height: 1.8;
    margin-bottom: 15rpx;
  }
}
</style>
