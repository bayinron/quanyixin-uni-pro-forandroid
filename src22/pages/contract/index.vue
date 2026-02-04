<template>
    <view class="contract_warp">
        <view class="contract">
            <p class="title">万华智汇金融服务有限公司项目投资协议</p>
            <span v-if="!!datas.addtime" class="contract-no">合同编号：HT-{{ datas.addtime.substr(0, 10) }}EXD</span>
        </view>

        <view class="ae">
            <p class="party">甲方（投资方）：{{ usename }}</p>
            <p class="party">乙方（管理方）：萬華智匯金融服務有限公司</p>
            <p class="party">丙方（担保方）：香港金安投資有限公司</p>
        </view>

        <view class="ad">
            <view class="intro">经甲乙丙三方协商，本着平等自愿、诚实信用的原则，就甲方使用乙方提供的本平台所有代还服务的有关事项达成如下协议：</view>
            <text class="section-title">一、垫资投资明细</text>
        </view>

        <view class="product_warp">
            <p>
                <i class="label">产品名称</i>
                <span class="value">{{ datas.dd_name }}</span>
            </p>
            <p>
                <i class="label">垫资方姓名</i>
                <span class="value">{{ usename }}</span>
            </p>
            <p>
                <i class="label">垫资方身份证</i>
                <span class="value">{{ usecode }}</span>
            </p>
            <p>
                <i class="label">垫资资金数额</i>
                <span class="value">{{ datas.moneys }}</span>
            </p>
            <p>
                <i class="label">协议期</i>
                <span class="value">{{ datas.days }}日</span>
            </p>
            <p>
                <i class="label">预计收益利率</i>
                <span class="value">{{ datas.lixi }}%</span>
            </p>
            <p>
                <i class="label">起息时间</i>
                <span class="value">{{ datas.addtime }}</span>
            </p>
            <p>
                <i class="label">到期时间</i>
                <span class="value">{{ datas.endtime }}</span>
            </p>
            <p>
                <i class="label">应收本息</i>
                <span class="value">{{ datas.zmoneys }}</span>
            </p>
            <p>
                <i class="label">还款方式</i>
                <span class="value">{{ datas.shuoming }}</span>
            </p>
        </view>
        <div class="ad">
            <p style="margin-top: 40rpx">二、垫资周期未满，甲方不得擅自終止本协议</p>
            <span style="margin-top: 20rpx">否则，乙方将取消为甲方的垫资服务，甲方不享受任何投资收益，甲方投资时必须看清楚垫资项目的一切事宜，按企业要求进行垫资投资，如有违反规定，甲方并承担由此所引起的一切损失。</span>
            <p style="margin-top: 40rpx">三、垫资方式以升级2.0安全保障投资垫资的形式进行合作。</p>
            <span style="margin-top: 20rpx">垫资资金由甲方账户划转到乙方的綜合理财账户上进行具体的垫资投资操作，由于甲方全权委托乙方进行投资服务，因此在公司运营管理、品牌拓展、连锁加盟的投资管理期间的投资风险由乙方承担，乙方全权负责所有项目垫资资金的安全性，然后才考虑投资的收益性。甲方不得以任何形式干预乙方的垫资服务操作，乙方按协议要求将所有本金及收益在协议周期结束后发放至甲方的收款账户。</span>
            <p style="margin-top: 40rpx">四、 乙方对甲方垫资投资资金负有控制风险的责任，必须勤勉尽责。如果投资出现亏损情况，则无论亏损大小由乙方承担全部损失，并按合同承诺支付所有应得的本金及收益给甲方，如果乙方出现违约将由担保机构方（丙方）履行保本保息承诺兑付义务。</p>
            <p style="margin-top: 40rpx">五、保密义务 甲乙双方对其通过接触和其他渠道得知的有关各方的商业机密负有严格保密的义务，应对合同各方所有项目资料严格保密，不得向任何其他人员及机构透露相关信息。</p>
            <p style="margin-top: 40rpx">六、合同生效</p>
            <span style="margin-top: 20rpx">1、本协议经投资人通过垫资投资企业点击确认后自动生成并签订，本协议自生成后即时生效。</span> <span style="margin-top: 20rpx">2、本协议履行期间，各方如发生争议或者纠纷，应友好协商解決；如协商不成，任何一方有权向本方所在地人民法院提起仲裁或起诉。本协议采用电子文本形式制成，各方均认可该形式合同的法律效力。</span>
            <p style="margin-top: 40rpx">七、此垫资投资协议一式三份，甲方一份，乙方一份，丙方一份，具有同等法律效力。</p>
        </div>

        <div class="ae">
            <p>甲方（投资方）：{{ jiafangName }}</p>
            <p style="margin-bottom: 40rpx">{{ time }}</p>
            <p>乙方（管理方）：萬華智匯金融服務有限公司</p>
            <p style="margin-bottom: 40rpx">{{ time }}</p>
            <p>丙方（担保方）：香港金安投資有限公司</p>
            <p style="margin-bottom: 40rpx">{{ time }}</p>
            <image mode="widthFix" src="@/static/img/zhang.png" alt="" class="zhang_icon" /> <image mode="widthFix" src="@/static/img/jinan.png" alt="" class="gongsi_icon" />
        </div>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getContract } from '../../api/getdata';

interface ContractData {
    addtime: string;
    dd_name: string;
    moneys: string;
    days: string;
    lixi: string;
    endtime: string;
    zmoneys: string;
    shuoming: string;
    hetong: any[];
}

const datas = ref<ContractData>({} as ContractData);
const usename = ref('');
const usecode = ref('');
const time = ref('');
//甲方姓名
const jiafangName = ref('');
const getData = async (sid: string) => {
    const res: any = await getContract(sid);
    datas.value = res.hetong[0];
    usecode.value = res.usecode;
    usename.value = res.usename;
    time.value = res.hetong[0].addtime;
    jiafangName.value = res.hetong[0].ht_user_name;
};

onLoad((options: any) => {
    if (options.sid) {
        getData(options.sid);
    }
});
</script>
<style lang="scss" scoped>
.contract_warp {
    padding-top: 100rpx;

    .vux-header-title {
        background: none !important;
        color: #000 !important;
    }

    .vux-header .vux-header-left .left-arrow:before {
        border-color: #000 !important;
        font-weight: bold;
    }

    .contract {
        text-align: center;

        p {
            color: #000000;
            font-size: 36rpx;
        }

        span {
            color: #555555;
            font-size: 26rpx;
        }
    }

    .ae {
        padding-left: 40rpx;
        margin-top: 80rpx;
        color: #333333;
        font-size: 26rpx;
        font-weight: 500;
        position: relative;

        .zhang_icon {
            position: absolute;
            left: 300rpx;
            bottom: 120rpx;
            width: 230rpx;
        }

        .gongsi_icon {
            position: absolute;
            left: 400rpx;
            bottom: -50rpx;
            width: 200rpx;
        }
    }

    .ad {
        padding: 40rpx;
        color: #555555;
        font-size: 24rpx;

        span {
            margin-top: 60rpx;
            display: inline-block;
            color: #000000;
        }
    }

    .product_warp {
        background-color: #fcfdff;
        width: 95%;
        margin: auto;
        padding: 20rpx;
        border-radius: 20rpx;

        p {
            border-bottom: solid #eaf1fa 2rpx;
            color: #000000;
            font-size: 24rpx;
            padding-bottom: 20rpx;
            margin-top: 20rpx;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            i {
                font-style: normal;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
            }

            span {
                -webkit-box-flex: 1.5;
                -ms-flex: 1.5;
                flex: 1.5;
                padding-left: 20rpx;
                color: #999999;
                border-left: solid #eaf1fa 2rpx;
            }
        }
    }
}
</style>
