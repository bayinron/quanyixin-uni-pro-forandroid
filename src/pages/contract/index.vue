<template>
    <view class="contract_warp">        
        <view class="contract">
            <text>大華银行全意信代还协议</text>
            <text v-if="!!datas.addtime">合同编号：HT-{{ datas.addtime.substr(0, 10) }}EXD</text>
        </view>

        <view class="ae">
            <text>甲方（投资方）：{{ usename }}</text>
            <text>乙方（管理方）：大華银行全意信金融有限公司</text>
            <text>丙方（擔保方）：香港嘉华投资擔保(集團)有限公司</text>
        </view>

        <view class="ad">
            <text>经甲乙丙三方协商，本着平等自愿、诚实信用的原则，就甲方使用乙方提供的本平台所有代还服务的有关事项达成如下协议：</text>
            <text class="section-title">一、垫资投资明细</text>
        </view>

        <view class="product_warp">
            <view class="product-item">
                <text class="label">产品名称</text>
                <text class="value">{{ datas.dd_name }}</text>
            </view>
            <view class="product-item">
                <text class="label">代还人姓名</text>
                <text class="value">{{ usename }}</text>
            </view>
            <view class="product-item">
                <text class="label">代还人身份证</text>
                <text class="value">{{ usecode }}</text>
            </view>
            <view class="product-item">
                <text class="label">代还本金数额</text>
                <text class="value">{{ datas.moneys }}</text>
            </view>
            <view class="product-item">
                <text class="label">协议期</text>
                <text class="value">{{ datas.days }}日</text>
            </view>
            <view class="product-item">
                <text class="label">预计收益利率</text>
                <text class="value">{{ datas.lixi }}%</text>
            </view>
            <view class="product-item">
                <text class="label">起息时间</text>
                <text class="value">{{ datas.addtime }}</text>
            </view>
            <view class="product-item">
                <text class="label">到期时间</text>
                <text class="value">{{ datas.endtime }}</text>
            </view>
            <view class="product-item">
                <text class="label">应收本息</text>
                <text class="value">{{ datas.zmoneys }}</text>
            </view>
            <view class="product-item">
                <text class="label">还款方式</text>
                <text class="value">{{ datas.shuoming }}</text>
            </view>
        </view>

        <view class="ad">
            <text class="section-title">二、代还周期未满，甲方不得擅自终止本协议。</text>
            <text class="section-content">否则，乙方将取消为甲方的代还服务，甲方不享受任何代还收益，甲方代还时必须看清楚代还项目的一切事宜，按企业要求进行代还投资，如有违反规定，甲方并承担由此所引起的一切损失。</text>
            
            <text class="section-title">三、代还方式以升级2.0安全保障投资代还的形式进行合作。</text>
            <text class="section-content">代还金由甲方账户划转到乙方的综合理财账户上进行具体的信用卡代还操作，由于甲方全权委托乙方进行代还服务，因此在公司运营管理、品牌拓展、连锁加盟的代还管理期间的投资风险由乙方承担，乙方全权负责所有项目代还资金的安全性，然后才考虑投资的收益性。甲方不得以任何形式干预乙方的代还服务操作，乙方按协议要求将所有本金及收益在协议周期结束后发放至甲方的收款账户。</text>
            
            <text class="section-title">四、乙方对甲方代还投资资金负有控制风险的责任，必须勤勉尽责。</text>
            <text class="section-content">如果投资出现亏损情况，则无论亏损大小由乙方承担全部损失，并按合同承诺支付所有应得的本金及收益给甲方，如果乙方出现违约将由担保机构方（丙方）履行保本保息承诺兑付义务。</text>
            
            <text class="section-title">五、保密义务</text>
            <text class="section-content">甲乙双方对其通过接触和其他渠道得知的有关各方的商业机密负有严格保密的义务，应对合同各方所有项目资料严格保密，不得向任何其他人员及机构透露相关信息。</text>
            
            <text class="section-title">六、合同生效</text>
            <text class="section-content">1、本协议经代还投资人通过代还投资企业点击确认代还后自动生成并签订，本协议自生成后即时生效。</text>
            <text class="section-content">2、本协议履行期间，各方如发生争议或者纠纷，应友好协商解決；如协商不成，任何一方有权向本方所在地人民法院提起仲裁或起诉。本协议采用电子文本形式制成，各方均认可该形式合同的法律效力。</text>
            
            <text class="section-title">七、此代还投资协议一式三份，甲方一份，乙方一份，丙方一份，具有同等法律效力。</text>
        </view>

        <view class="ae">
            <text>甲方（投资方）：{{ usename }}</text>
            <text class="date">{{ datas.addtime }}</text>
            
            <text>乙方（管理方）：大華银行全意信金融有限公司</text>
            <text class="date">{{ datas.addtime }}</text>
            
            <text>丙方（擔保方）：香港嘉华投资擔保(集團)有限公司</text>
            <text class="date">{{ datas.addtime }}</text>
            
            <image class="zhang_icon" src="@/static/img/zhang.png" mode="aspectFit" />
            <image class="gongsi_icon" src="@/static/img/gongsi.png" mode="aspectFit" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getContract } from '@/api/index';

interface ContractData {
    addtime: string;
    dd_name: string;
    moneys: string;
    days: string;
    lixi: string;
    endtime: string;
    zmoneys: string;
    shuoming: string;
}

const datas = ref<ContractData>({} as ContractData);
const usename = ref('');
const usecode = ref('');

const goBack = () => {
    uni.navigateBack();
};

const getData = async (sid: string) => {
    const res: any = await getContract(sid);
    datas.value = res.hetong[0] || {};
    usecode.value = res.usecode;
    usename.value = res.usename;
};

onLoad((options: any) => {
    if (options.sid) {
        getData(options.sid);
    }
});
</script>

<style lang="scss" scoped>
.contract_warp {
    min-height: 100vh;
    background: #fff;
    padding: 20rpx;

    .contract {
        text-align: center;
        margin: 30rpx 0;

        text {
            display: block;
            margin-bottom: 20rpx;
            font-size: 32rpx;
            font-weight: bold;

            &:last-child {
                font-size: 28rpx;
                color: #666;
            }
        }
    }

    .ae {
        margin: 30rpx 0;
        position: relative;
        text {
            display: block;
            margin-bottom: 20rpx;
            font-size: 28rpx;

            &.date {
                color: #666;
                margin-bottom: 30rpx;
            }
        }

        .zhang_icon{
            width: 200rpx;
            height: 200rpx;
            margin: 20rpx 0;
            position: absolute;
            bottom: 0;
            right: 260rpx;
        }
        .gongsi_icon {
            width: 200rpx;
            height: 200rpx;
            margin: 20rpx 0;
            position: absolute;
            right: 100rpx;
            bottom: -120rpx;
        }
    }

    .ad {
        margin: 30rpx 0;

        .section-title {
            display: block;
            font-size: 28rpx;
            font-weight: bold;
            margin: 20rpx 0;
        }

        .section-content {
            display: block;
            font-size: 26rpx;
            color: #666;
            line-height: 1.6;
            margin-bottom: 20rpx;
        }
    }

    .product_warp {
        background: #f8f8f8;
        border-radius: 12rpx;
        padding: 20rpx;
        margin: 30rpx 0;

        .product-item {
            display: flex;
            margin-bottom: 20rpx;

            .label {
                width: 200rpx;
                color: #666;
                font-size: 28rpx;
            }

            .value {
                flex: 1;
                font-size: 28rpx;
            }
        }
    }
}
</style>
