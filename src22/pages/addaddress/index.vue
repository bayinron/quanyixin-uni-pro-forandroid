<template>
    <div class="topay_warp">

      <div class="inp">
        <div>
          <p>收货人</p>
          <input v-model="name" type="text" placeholder="请输入姓名" />
        </div>
        <div>
          <p>手机号码</p>
          <input v-model="phone" type="text" placeholder="请输入手机号码" />
        </div>
        <div>
          <p>所在地区</p>
          <input v-model="diqu" type="text" placeholder="请输入地区" />
        </div>
        <div>
          <p>详细地址</p>
          <input v-model="dizhi" type="text" placeholder="请输入详细地址" />
        </div>
      </div>
  
      <div class="qr" @click="save">
        <p>确定</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { addaddress, editaddress } from '../../api/getdata';
  import { onLoad } from '@dcloudio/uni-app';
  
  const name = ref('');
  const phone = ref('');
  const diqu = ref('');
  const dizhi = ref('');
  const title = ref('');
  const id = ref('');
  
  function save() {
    if(name.value === '') {
      uni.showToast({title: '请输入姓名', icon: 'none'});
      return;
    }
    if(phone.value === '') {
      uni.showToast({title: '请输入手机号', icon: 'none'});
      return;
    }
    if(diqu.value === '') {
      uni.showToast({title: '请输入地区', icon: 'none'});
      return;
    }
    if(dizhi.value === '') {
      uni.showToast({title: '请输入地址', icon: 'none'});
      return;
    }
  
    if(!id.value) {
      addaddress(name.value, phone.value, diqu.value, dizhi.value).then((data: any) => {
        if(data.result) {
          uni.showToast({title: '添加成功'});
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        }
      });
    } else {
      editaddress(name.value, phone.value, diqu.value, dizhi.value, id.value).then((data: any) => {
        if(data.result) {
          uni.showToast({title: '修改成功'});
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        }
      });
    }
  }
  
  onLoad((options: any) => {
    id.value = options.id;
    if(id.value) {
      title.value = '编辑收货地址';
      name.value = options.name || '';
      phone.value = options.phone || '';
      diqu.value = options.diqu || '';
      dizhi.value = options.dizhi || '';
    } else {
      title.value = '添加收货地址';
    }
  });
  </script>
  
  <style lang="scss">
  .topay_warp {
    background-color: #fff;
    padding-top: 20rpx;
  
    .inp {
      border-radius: 20rpx;
      background: #fff;
      border: 2rpx solid #e5e5e5;
      width: 90%;
      margin: 20rpx auto 0;
  
      div {
        border-bottom: 1rpx solid #e5e5e5;
        display: flex;
        align-items: center;
        padding: 20rpx;
        height: 100rpx;
  
        p {
          font-size: 28rpx;
          color: #000;
          width: 200rpx;
        }
  
        input {
          font-size: 28rpx;
          color: #000;
          background: none;
          border: none;
          display: block;
          width: 400rpx;
        }
      }
    }
  
    .qr {
      border-radius: 50rpx;
      background: #16cee5;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20rpx;
      width: 90%;
      margin: 40rpx auto 0;
  
      p {
        text-align: center;
        color: #fff;
        font-size: 28rpx;
      }
    }
  }
  </style>