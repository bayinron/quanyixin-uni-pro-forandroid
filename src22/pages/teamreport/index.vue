<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getrankings } from '../../api/getdata';

interface TeamData {
  shouchong: string;
  teams: string;
  zhitui: string;
  xinzeng: string;
  teamss: string;
  shouyi:string;
  yongjin: string;
  team1: TeamMember[];
  team2: TeamMember[];
  team3: TeamMember[];
}

interface TeamMember {
  usename: string;
  benjin: string;
}

const select = ref(1);
const datalist = ref<TeamData>({} as TeamData);
const teams = ref<TeamMember[]>([]);

onMounted(() => {
  getData();
});

function getData() {
  getrankings().then((data: any) => {
    datalist.value = data;
    teams.value = datalist.value.team1;
  });
}

function choice(index: number) {
  select.value = index;
  if(index == 1) {
    teams.value = datalist.value.team1;
  } else if(index == 2) {
    teams.value = datalist.value.team2;
  } else if(index == 3) {
    teams.value = datalist.value.team3;
  }
}

function GetPhone(m: string) {
  const tel = String(m);
  return tel.substr(0,3) + "****" + tel.substr(7);
}
</script>

<template>
  <div class="teamreport_warp">
    <image mode="widthFix" class="team_bg" src="@/static/img/tdbg.png" alt="" />
    
    <div class="teamreport">
      <div class="teamreport_warp2">
        <div class="teamreport_warp3">
          <div class="datt_warp">
            <div class="datt">
              <image mode="widthFix" src="@/static/img/scrs.png" alt="" />
              <div class="da">
                <p>首充人数</p>
                <span>{{datalist.shouchong}}</span>
              </div>
            </div>
          </div>
          <div class="datt_warp">
            <div class="datt">
              <image mode="widthFix" src="@/static/img/tdrs.png" alt="" />
              <div class="da">
                <p>团队人数</p>
                <span>{{datalist.teams}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="teamreport_warp3">
          <div class="datt_warp">
            <div class="datt">
              <image mode="widthFix" src="@/static/img/ztrs.png" alt="" />
              <div class="da">
                <p>直推人数</p>
                <span>{{datalist.zhitui}}</span>
              </div>
            </div>
          </div>
          <div class="datt_warp">
            <div class="datt">
              <image mode="widthFix" src="@/static/img/jrxz.png" alt="" />
              <div class="da">
                <p>今日新增加</p>
                <span>{{datalist.xinzeng}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="teamreport_warp4">
          <p>团队活跃人数：{{datalist.teamss}}</p>
          <p>团队订单收益：{{datalist.shouyi}}</p>
        </div>
      </div>

      <div class="teamreport_warp5">
        <div class="teamreport_warp6">
          <div :class="{active: select==1}" @click="choice(1)">
            直属一级 <span></span>
          </div>
          <div :class="{active: select==2}" @click="choice(2)">
            下属二级 <span></span>
          </div>
          <div :class="{active: select==3}" @click="choice(3)">
            下属三级 <span></span>
          </div>
        </div>
      </div>

      <div class="teamreport_warp7">
        <div v-for="(item, index) in teams" 
             :key="index"
             class="teamreport_warp8">
          <div class="teamreport_warp9">
            <image mode="widthFix" src="@/static/img/txtx.png" alt="" />
            <div class="led">
              <span>{{item.usename}}</span>
            </div>
          </div>
          <i>账户余额:<em>{{item.benjin}}</em></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.teamreport_warp {
  background-color: #f8f8f8;
  min-height: 100vh;
  position: relative;

  .team_bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .teamreport {
    position: relative;
    top: 100rpx;
    padding-bottom: 60rpx;

    .teamreport_warp2 {
      border-radius: 20rpx;
      background-color: rgba(22, 215, 229, 0.986);
      width: 90%;
      margin: auto;

      .teamreport_warp3 {
        padding: 50rpx 0;
        display: flex;
        padding-left: 40rpx;

        .datt_warp {
          flex: 1;

          .datt {
            display: flex;

            image {
              width: 25%;
            }

            .da {
              margin-left: 20rpx;
              flex: 1;

              p {
                font-size: 28rpx;
                color: #fff;
                font-weight: 700;
              }

              span {
                font-size: 44rpx;
                color: #fff;
                font-weight: 700;
              }
            }
          }
        }
      }

      .teamreport_warp4 {
        display: flex;
        background: hsla(0, 0%, 100%, 0.65);
        padding: 40rpx;
        border-radius: 0 0 20rpx 20rpx;

        p {
          font-size: 28rpx;
          color: #042d8c;
          flex: 1;
        }
      }
    }

    .teamreport_warp5 {
      width: 90%;
      margin: 20rpx auto 0;
      border-radius: 10rpx;
      background: #fff;
      padding-top: 30rpx;

      .teamreport_warp6 {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;

        div {
          font-size: 32rpx;
          color: #383838;
        }

        .active {
          color: #16cee5;

          span {
            border-radius: 10rpx;
            background-color: #16cee5;
            display: block;
            width: 120rpx;
            margin-top: 20rpx;
            height: 10rpx;
          }
        }
      }
    }

    .teamreport_warp7 {
      border-radius: 10rpx;
      background: #fff;
      width: 90%;
      margin: 20rpx auto 0;
      padding: 30rpx;

      .teamreport_warp8 {
        display: flex;
        align-items: center;
        background-color: #eff9ff;
        margin: 40rpx 0;

        .teamreport_warp9 {
          display: flex;
          padding: 30rpx;
          flex: 1;

          image {
            width: 100rpx;
            border-radius: 100rpx;
          }

          .led {
            margin-left: 20rpx;
            padding-top: 20rpx;

            span {
              font-size: 24rpx;
              color: #383838;
              display: block;
              margin-top: 20rpx;
            }
          }
        }

        i {
          display: block;
          font-size: 24rpx;
          color: #000;
          font-style: normal;
          font-weight: 600;
          margin-right: 20rpx;
          padding-top: 20rpx;

          em {
            color: #d43030;
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>