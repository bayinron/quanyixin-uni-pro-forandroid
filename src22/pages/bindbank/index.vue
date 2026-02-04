<template>
    <div class="bind_warp">
      <image mode="widthFix" class="bind_bg" src="@/static/img/yhkbg.png" alt="" />
      <div class="bind_warp1">
        <div class="bind_warp2">
          <div class="bind_warp3">
            <p>姓名</p>
            <input v-model="realname" type="text" placeholder="请输入你的姓名" />
          </div>
          <div class="bind_warp3">
            <p>身份证</p>
            <input v-model="usecode" type="text" placeholder="请输入身份证" />
          </div>
          <div class="bind_warp3">
            <p>银行名称</p>
            <input v-model="bankname" type="text" placeholder="请输入银行名称" />
          </div>
          <!-- <div class="bind_warp3">
            <p>开户支行</p>
            <input v-model="bankadd" type="text" placeholder="请输入开户支行" />
          </div> -->
          <div class="bind_warp3">
            <p>银行卡号</p>
            <input v-model="bankcode" type="number" placeholder="请输入银行卡号" />
          </div>
          <div class="bind_warp4" @click="submit">确定</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { authentication } from '../../api/getdata';
import globalTool from '@/utils/globalTool';
  
  const realname = ref('');
  const usecode = ref('');
  const bankcode = ref('');
  // const bankadd = ref('');
  const bankname = ref('');
  
  function submit() {
    if (!validateForm()) return;
    
    const params = {
      realname: realname.value,
      usecode: usecode.value,
      bankcode: bankcode.value,
      bankuser: realname.value,
      bankname: bankname.value,
      // bankadd: bankadd.value
    };
  
    authentication(params).then((data: any) => {
      if (data.result === 'true') {
        uni.navigateTo({
          url: '/pages/home/my'
        });
      }
    });
  }
  
  function validateForm() {
    if (!realname.value) return false;
    if (!usecode.value) return false;
    if (usecode.value.length !== 18){
      globalTool.showToast('身份证号格式错误');
      return false;
    }
    if (!bankcode.value) return false;
    if (!bankname.value) return false;
    // if (!bankadd.value) return false;
    return true;
  }
  </script>
  
  <style lang="scss" scoped>
  
.bind_warp {
  height: 100%;
  position: relative;
  padding-top: 80rpx;

  .vux-header {
    background: none !important;
  }

  .bind_bg {
    position: absolute;
    top: 0;
    width: 100%;
  }

  .bind_warp1 {
    position: relative;
    top: 320rpx;
    background: #fbfbfb;
    border-radius: 50rpx;
    padding-bottom: 220rpx;

    .bind_warp2 {
      width: 80%;
      margin: auto;
      padding-top: 80rpx;

      .bind_warp3 {
        p {
          font-size: 32rpx;
          color: #000;
          font-weight: 600;
          margin-top: 30rpx;
        }

        input {
          display: block;
          margin-top: 30rpx;
          font-size: 32rpx;
          color: #000;
          border-radius: 10px;
          background: #f7f7f7;
          height: 96rpx;
          line-height: 96rpx;
          width: 100%;
          padding-left: 20rpx;
        }

        ::-webkit-input-placeholder {
          color: #a6a6a6;
        }
      }

      .bind_warp4 {
        border-radius: 25px;
        background-color: #16cee5;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 32rpx;
        color: #fff;
        line-height: 90rpx;
        height: 90rpx;
        margin-top: 60rpx;
      }
    }
  }
}
  </style>