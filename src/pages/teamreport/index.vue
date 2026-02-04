<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getrankings } from '@/api/index';

interface TeamData {
    shouchong: string;
    teams: string;
    zhitui: string;
    xinzeng: string;
    teamss: string;
    shouyi: string;
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
const datalist = ref<any>({});
const teams = ref<any[]>([]);

// These variables are already defined above
// const select = ref(1);
// const datalist = ref<TeamData>({} as TeamData);
// const teams = ref<TeamMember[]>([]);

const stradeinfo = ref('');
const show = ref(false);
const msg = ref('');
const page = ref({
    PageSize: 10,
    PageNumber: 1
});
const notdata = ref(false);
const datacount = ref('');
const show_load = ref(false);

// Function to get data from API
function getData() {
    getrankings()
        .then((res: any) => {
                datalist.value = res;
                teams.value = datalist.value.team1;
            
        })
        .catch(() => {
            console.log('error');
        });
}

// Function to handle tab selection
function choice(index: number) {
    console.log(index);
    select.value = index;
    if (index === 1) {
        teams.value = datalist.value.team1;
    } else if (index === 2) {
        teams.value = datalist.value.team2;
    } else if (index === 3) {
        teams.value = datalist.value.team3;
    }
}

// Function to mask phone number
function GetPhone(m: string) {
    const tel = String(m);
    const dh = tel.substr(0, 3) + '****' + tel.substr(7);
    return dh;
}

// Function to refresh data
function getccData() {
    datalist.value = {} as TeamData;
    getData();
}

// Function to get history data
function gethtData() {
    datalist.value = {} as TeamData;
    // getHistory function is not defined in the provided code
    // getHistory();
}

// Function to load more data
function getMoreList() {
    if (Math.ceil(Number(datacount.value) / 10) > page.value.PageNumber) {
        page.value.PageNumber++;
        if (Math.ceil(Number(datacount.value) / 10) > 1) {
            show_load.value = true;
            notdata.value = false;
        }
        if (select.value === 1) {
            getData();
        } else {
            // getHistory function is not defined in the provided code
            // getHistory();
        }
    } else {
        notdata.value = true;
    }
}
onShow(() => {
    getData();
});
</script>

<template>
    <div class="teamreport_warp">
        <view class="user-card">
            <!-- 账户余额区域 -->
            <view class="balance-section">
                <view class="balance-content">
                    <view class="flex justify-between mb-20rpx">
                        <view>
                            <view class="balance">
                                <text class="amount">{{ datalist.yue }}</text>
                            </view>
                            <view class="balance-title flex items-center">
                                <text>团队余额</text>
                                <image class="w-100rpx ml-20rpx" src="@/static/img/zjbz.png" mode="widthFix" />
                            </view>
                        </view>
                        <view>
                            <view class="balance">
                                <text class="amount">{{ datalist.yongjin }}</text>
                            </view>
                            <view class="balance-title">团队订单分佣</view>
                        </view>
                    </view>

                    <view class="stats-row">
                        <view class="stat-item">
                            <text class="label">首充人数</text>
                            <text class="value">{{ datalist.shouchong }}</text>
                        </view>
                        <view class="stat-item">
                            <text class="label">团队人数</text>
                            <text class="value">{{ datalist.teams }}</text>
                        </view>
                        <view class="stat-item">
                            <text class="label">直推人数</text>
                            <text class="value">{{ datalist.zhitui }}</text>
                        </view>
                        <view class="stat-item">
                            <text class="label">今日新增加</text>
                            <text class="value">{{ datalist.xinzeng }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <div class="teamreport">
            <div class="teamreport_warp5">
                <div class="teamreport_warp6">
                    <div :class="{ active: select == 1 }" @click="choice(1)">直属一级 <span></span></div>
                    <div :class="{ active: select == 2 }" @click="choice(2)">下属二级 <span></span></div>
                    <div :class="{ active: select == 3 }" @click="choice(3)">下属三级 <span></span></div>
                </div>
            </div>

            <div class="teamreport_warp7">
                <div v-for="(item, index) in teams" :key="index" class="teamreport_warp8">
                    <div class="teamreport_warp9">
                        <img src="@/static/img/txtx.png" alt="" />
                        <div class="led">
                            <span>{{ item.usename }}</span>
                        </div>
                    </div>
                    <div class="balance_info">
                        <span class="balance_label">账户余额:</span>
                        <span class="balance_amount">{{ item.benjin }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
        
        padding-bottom: 60rpx;

        .teamreport_warp2 {
            border-radius: 20rpx;
            background-color: #000;
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

                        img {
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
                    color: 828282;
                }

                .active {
                    color:#512000;

                    span {
                        border-radius: 10rpx;
                        background-color: #5b3601;
                        display: block;
                        width: 120rpx;
                        margin-top: 20rpx;
                        height: 10rpx;
                    }
                }
            }
        }

        .teamreport_warp7 {
            background-color: #fff;
            border-radius: 20rpx;
            padding: 30rpx;
            margin: 20rpx;
            box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
            
            .teamreport_warp8 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20rpx 0;
                border-bottom: 1rpx solid #f0f0f0;
                
                &:last-child {
                    border-bottom: none;
                }
                
                .teamreport_warp9 {
                    display: flex;
                    align-items: center;
                    
                    img {
                        width: 80rpx;
                        height: 80rpx;
                        border-radius: 50%;
                        margin-right: 20rpx;
                    }
                    
                    .led {
                        span {
                            font-size: 32rpx;
                            color: #333;
                            font-weight: 600;
                        }
                    }
                }
                
                .balance_info {
                    display: flex;
                    align-items: center;
                    
                    .balance_label {
                        font-size: 28rpx;
                        color: #666;
                        margin-right: 10rpx;
                    }
                    
                    .balance_amount {
                        font-size: 32rpx;
                        color: #ae8c54;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}
.user-card {
    // background: linear-gradient(to bottom, #2b7fff, #1e6df7);
    // padding: 40rpx 30rpx;
    color: #fff;
    background: #000;
    padding: 30rpx 20rpx 0 20rpx;
    .user-info {
        display: flex;
        align-items: center;

        padding: 50rpx 20rpx 0 20rpx;
        margin-left: 40rpx;
        .avatar {
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
            margin-right: 20rpx;
        }

        .user-detail {
            color: #000;
            .nickname {
                font-size: 32rpx;
                margin-bottom: 10rpx;
                font-weight: bold;
            }

            .phone {
                font-size: 28rpx;
                opacity: 0.9;

                .vip-tag {
                    background: #ffd700;
                    color: #333;
                    padding: 4rpx 12rpx;
                    border-radius: 20rpx;
                    font-size: 24rpx;
                    margin-left: 10rpx;
                }
            }
        }
    }

    .balance-section {
        position: relative;
        padding: 30rpx;
        width: 96%;
        margin: 0 auto;
        border-radius: 20rpx;
        background: linear-gradient(to bottom, #1b0f08 24%, #675940 99%);
        border: 1px solid #3e3b3a;
        .balance-bg {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .balance-content {
            position: relative;
            z-index: 2;
            
        }
        .balance {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;

            .amount {
                font-size: 48rpx;
                font-weight: bold;
            }

            .action-buttons {
                display: flex;
                gap: 20rpx;

                .action-btn {
                    min-width: 160rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    border-radius: 35rpx;
                    font-size: 28rpx;
                    padding: 0 40rpx;
                    border: none;

                    &.recharge {
                        background: #1f359a;
                        color: #fff;
                        border: 2rpx solid #fff;
                    }

                    &.withdraw {
                        background: #fff;
                        color: #2b5cff;
                    }

                    &::after {
                        border: none;
                    }
                }
            }
        }

        .stats-row {
            display: flex;
            justify-content: space-between;
            padding: 20rpx 30rpx 0;
            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .label {
                    font-size: 24rpx;
                    margin-bottom: 10rpx;
                }

                .value {
                    font-size: 28rpx;
                }
            }
        }
    }
}
</style>
