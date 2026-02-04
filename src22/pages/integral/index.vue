<template>
    <div class="integral_warp">
      <image mode="widthFix" class="record_bg" src="@/static/img/JFGZ.png" alt="" />
      
      <div class="integral">
        <div class="inte">
          <image mode="widthFix" src="@/static/img/sygz.png" alt="" />
          <p>积分使用规则</p>
        </div>
        
        <div class="guize_warp">
          <div class="guize">
            <p>贴心攻略 让你更大获益</p>
            <span>1、每日签到 <em>+10</em>积分</span>
            <span>2、每日垫资<em>+10</em>积分</span>
            <span>3、参加慈善活动<em>+50</em>积分</span>
            <span>4、邀请好友加入<em>+100</em>积分</span>
          </div>
          
          <div class="duihuan_warp">
            <span @click="goToMall">积分兑换</span>
            <p>积分可在积分商城兑换精美礼品</p>
            <i>(兑换实物需填写地址)</i>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getInvest } from '../../api/getdata'
  
  function goToMall() {
    uni.navigateTo({
      url: '/pages/home/mall'
    })
  }
  </script>
  
<style lang="scss" scoped>

.integral_warp {
  width: 100%;
  background-color: #eff9ff;
  position: relative;

  .record_bg {
    position: absolute;
    top: -10rpx;
    width: 100%;
  }

  .integral {
    position: relative;
    top: 780rpx;

    .inte {
      position: relative;
      z-index: 33;
      top: 100rpx;

      image {
        width: 60%;
        display: block;
        margin: 0 auto;
      }

      p {
        position: relative;
        text-align: center;
        font-size: 36rpx;
        color: #000000;
        bottom: 90rpx;
        font-weight: 600;
      }
    }

    .guize_warp {
      background-color: #ffffff;
      width: 95%;
      display: block;
      margin: 0 auto;
      padding: 40rpx;
      border-radius: 40rpx;

      .guize {
        margin-top: 80rpx;
        padding-bottom: 60rpx;

        p {
          color: #16cee5;
          font-size: 36rpx;
          font-weight: 600;
          text-align: center;
          padding-bottom: 60rpx;
        }

        span {
          display: block;
          background-color: rgba(22, 206, 229, 0.1);
          width: 80%;
          margin: 20rpx auto;
          padding: 20rpx 40rpx;
          border-radius: 50rpx;
          color: #000000;
          font-size: 28rpx;

          em {
            font-style: normal;
            color: rgba(22, 206, 229, 0.8);
          }
        }
      }

      .duihuan_warp {
        text-align: center;

        span {
          background-color: #16cee5;
          padding: 10rpx 20rpx;
          color: #ffffff;
        }

        p {
          margin-top: 30rpx;
          color: #000000;
          font-size: 28rpx;
        }

        i {
          display: block;
          color: #999999;
          font-size: 28rpx;
          font-style: normal;
        }
      }
    }
  }
}
</style>