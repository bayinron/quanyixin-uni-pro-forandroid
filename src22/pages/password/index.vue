<template>
    <div class="topay_warp">
      <div class="logon">
        <image mode="widthFix" class="logon_bg" src="@/static/img/dldlbg.png" alt="" />
        <div class="logon_help"></div>
        <div class="logon_telte">
          <p>修改登陆密码</p>
          <span>密码保障, 资金有保障</span>
        </div>
      </div>
  
      <div class="shuru">
        <p style="color: rgba(0, 0, 0, 1); font-size: 28rpx; font-weight: 800; text-align: center">
          密码支持字母、数字、符号
        </p>
        <div class="shu">
          <input v-model="name" type="text" placeholder="请输入姓名" />
          <input v-model="usecode" type="text" placeholder="请输入身份证" />
          <input v-model="usepwd" type="text" placeholder="请输入原密码" />
          <input v-model="newpwd" type="password" placeholder="请输入新密码" />
          <input v-model="okpwd" type="password" placeholder="请确认新密码" />
        </div>
        <div class="dl" @click="modifyPwd">
          {{ isLoading ? '正在提交...' : '确定' }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { modifypwd } from '../../api/getdata';
  
  const name = ref('');
  const usecode = ref('');
  const usepwd = ref('');
  const newpwd = ref('');
  const okpwd = ref('');
  const isLoading = ref(false);
  
  function modifyPwd() {
    if (name.value === '') {
      uni.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }
    if (usecode.value === '') {
      uni.showToast({ title: '请输入身份证', icon: 'none' });
      return;
    }
    if (usepwd.value === '') {
      uni.showToast({ title: '请输入旧密码', icon: 'none' });
      return;
    }
    if (newpwd.value === '') {
      uni.showToast({ title: '请输入新密码', icon: 'none' });
      return;
    }
    if (newpwd.value !== okpwd.value) {
      uni.showToast({ title: '请确保两次密码输入一致', icon: 'none' });
      return;
    }
    if (newpwd.value.length < 6 || newpwd.value.length > 16) {
      uni.showToast({ title: '密码长度为6-16位', icon: 'none' });
      return;
    }
  
    isLoading.value = true;
    modifypwd(usepwd.value, newpwd.value, okpwd.value, name.value, usecode.value).then((data: any) => {
      isLoading.value = false;
      if (data.result === 'true') {
        uni.showToast({ title: '修改成功', icon: 'success' });
        setTimeout(() => {
          uni.navigateBack();
        }, 2500);
      }
    }).catch((err) => {
      isLoading.value = false;
    });
  }
  </script>
  <style lang="scss" scoped>
 
.topay_warp {
  .logon_bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .logon {
    position: relative;
    top: 0rpx;
    .logon_help {
      font-size: 32rpx;
      width: 80%;
      margin: auto;
      color: #ffffff;
      text-align: right;
    }
    .logon_telte {
        width: 100%;
      padding: 0rpx 60rpx 0 60rpx;
      position: absolute;
      text-align: center;
      image {
        width: 20%;
      }
      p {
        font-size: 60rpx;
        color: #ffffff;
        margin-top: 60rpx;
      }
      span {
        font-size: 32rpx;
        color: #ffffff;
        display: block;
        margin-top: 28rpx;
      }
    }
    .logon_wj {
      text-align: center;
      display: block;
      font-size: 28rpx;
      color: #ffffff;
      margin-top: 60rpx;
    }
  }
  .shuru {
    background-color: #fff;
    padding: 40rpx;
    top: 260rpx;
    width: 100%;
    height: 73%;
    position: relative;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    .shu {
      padding: 40rpx 60rpx;
      input {
        border-radius: 10px;
        background: #f7fafc;
        width: 100%;
        line-height: 110rpx;
        padding-left: 40rpx;
        height: 110rpx;
        font-size: 32rpx;
        color: #000;
        margin-top: 20rpx;
      }
      ::-webkit-input-placeholder {
        color: #cccccc;
      }
      p {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #000000;
      }
    }
    .dl {
      padding-bottom: 40rpx;
      width: 85%;
      margin: 40rpx auto 0;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
      background-color: #16cee5;
      border-radius: 159px;
      line-height: 90rpx;
      height: 90rpx;
    }
  }
}
  </style>