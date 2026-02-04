<template>
    <div class="topay_warp">
      <div class="address_warp_1" v-if="!!address.id">
        <div class="address_warp_2 clearfix">
          <p style="font-size: 32rpx">{{ address.name || '-' }}</p>
          <p style="font-size: 32rpx; padding: 8rpx 40rpx">{{ address.phone }}</p>
          <p style="font-size: 32rpx">{{ address.diqu }}{{ address.xiangxi }}</p>
          <image mode="widthFix" 
            src="@/static/img/edit.png" 
            alt=""
            @click="editAddress"
          />
        </div>
      </div>
  
      <div 
        v-if="!address.id" 
        class="common_btn"
        style="width: 80%; margin: 120rpx auto 0"
        @click="addAddress"
      >
        添加收货地址
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { getaddress } from '../../api/getdata';
  
  const address = ref<any>({});
  
  function getData() {
    getaddress().then((data: any) => {
      if(data.result && data.address && data.address.length) {
        address.value = data.address[0];
      }
    });
  }
  
  function editAddress() {
    const { id, name, phone, diqu, xiangxi } = address.value;
    uni.navigateTo({
      url: `/pages/addaddress/index?id=${id}&name=${name}&phone=${phone}&diqu=${diqu}&dizhi=${xiangxi}`
    });
  }
  
  function addAddress() {
    uni.navigateTo({
      url: '/pages/addaddress/index'
    });
  }
  
  onShow(() => {
    getData();
  });
  </script>
  
  <style lang="scss" scoped>
  .topay_warp {
    background-color: #fff;
    padding-top: 20rpx;
  }
  
  .address_warp_1 {
    width: 90%;
    margin: auto;
    background-color: #fff;
    margin-top: 20rpx;
    border-radius: 20rpx;
  
    .address_warp_2 {
      margin-top: 0rpx;
      padding-top: 0rpx;
      border: 1rpx solid #e5e5e5;
      padding-bottom: 20rpx;
      border-radius: 20rpx;
      position: relative;
  
      p {
        color: 28rpx;
        padding: 10rpx 40rpx;
        color: #000;
        font-weight: 700;
        border-bottom: 1rpx solid #e5e5e5;
  
        span {
          float: right;
          color: #3a79f7;
          font-size: 32rpx;
          margin-right: 40rpx;
          font-weight: 700;
        }
      }
  
      i {
        font-style: normal;
        padding-left: 50rpx;
        color: #000;
        font-size: 24rpx;
      }
  
      image {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        width: 40rpx;
      }
    }
  }
  
  .common_btn {
    background-color: #16cee5;
    text-align: center;
    font-size: 28rpx;
    line-height: 80rpx;
    border-radius: 44rpx;
    color: #fff;
    border: 0;
    border: 2rpx solid #009bff;
  }
  </style>