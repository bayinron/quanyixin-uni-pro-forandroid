<template>
  <view class="rule-item-card" :style="{ width: width }">
    <view class="card-content" :class="{ 'no-title': hideTitle }">
      <view class="content-line" v-html="replacetxt(ruleData.content)"></view>
      <view class="content-line" v-html="replacetxt(ruleData.remark)"></view>
      <view class="content-line" v-html="replacetxt(ruleData.extra)"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface RuleData {
  title: string;
  content: string;
  remark: string;
  extra: string;
}

interface Props {
  ruleData: RuleData;
  width: string;
  hideTitle?: boolean;
}
// 把\r\n和\n替换成<br>
const replacetxt = function(txt: string) {
  // return "1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />";
  return txt.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />') +'<br />';
}
defineProps<Props>();
</script>

<style lang="scss" scoped>
.rule-item-card {
    width: 50%;
  position: relative;
  background: #eee4d3;
  border-radius: 0rpx;
  margin: 0rpx;
  padding: 30rpx;
  overflow: visible;
  // box-shadow: inset 0 0 20rpx rgba(255, 255, 255, 0.1), 0 0 10rpx rgba(232, 191, 146, 0.5);
  // border: 4rpx solid #fddaa5;
}

.card-tab {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  background: #ab7f41;
  color: #fff;
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
  
  &.no-title {
    padding-top: 0rpx;
  }
  
  .content-line {
    color: #000;
    font-size: 28rpx;
    line-height: 1.8;
    margin-bottom: 15rpx;
    font-weight: 500;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
