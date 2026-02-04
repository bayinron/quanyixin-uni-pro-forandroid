<template>
    <view class="rule-tab-container">
        <!-- Tab 标签栏 -->
        <view class="tab-container">
            <!-- 第一行：前两个 tab 各占 50% -->
            <view class="tab-row tab-row-first">
                <view 
                    v-for="(item, index) in list.slice(0, 2)" 
                    :key="index" 
                    class="tab-item tab-item-first-row" 
                    :class="{ active: activeTab === index }"
                    @tap="switchTab(index)"
                >
                    {{ item.title }}
                </view>
            </view>
            <!-- 第二行：剩余的 tab 平均分配 -->
            <view class="tab-row tab-row-second" v-if="list.length > 2">
                <view 
                    v-for="(item, index) in list.slice(2)" 
                    :key="index + 2" 
                    class="tab-item tab-item-second-row" 
                    :class="{ active: activeTab === index + 2 }"
                    @tap="switchTab(index + 2)"
                >
                    {{ item.title }}
                </view>
            </view>
        </view>
        <!-- Tab 内容 -->
        <view class="tab-content">
            <DaihuanRuleItem 
                v-if="list[activeTab]" 
                :ruleData="list[activeTab]" 
                width="100%"
                :hideTitle="true"
            />
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DaihuanRuleItem from '@/components/DaihuanRuleItem.vue';

interface RuleItem {
    title: string;
    content: string;
    remark: string;
    extra: string;
}

interface Props {
    list: RuleItem[];
}

const props = defineProps<Props>();

const activeTab = ref(0);

// 切换 Tab
const switchTab = (index: number) => {
    activeTab.value = index;
};
</script>

<style lang="scss" scoped>
.rule-tab-container {
    width: 98%;
    background-color: #faf8f5;
    border-radius: 20rpx;
    overflow: hidden;
    margin: 1%;
    box-shadow: inset 0 0 20rpx rgba(255, 255, 255, 0.1), 0 0 10rpx rgba(232, 191, 146, 0.5);
    border: 4rpx solid #fddaa5;
}

.tab-container {
    width: 100%;
    background-color: #faf8f5;
    padding: 0;
    border-bottom: 2rpx solid #f5f5f5;
    
    .tab-row {
        display: flex;
        flex-direction: row;
        padding: 0 0rpx;
        
        &.tab-row-first {
            margin-bottom: 0rpx;
        }
        
        &.tab-row-second {
            padding-top: 0rpx;
        }
        
        .tab-item {
            text-align: center;
            padding: 15rpx 10rpx;
            font-size: 28rpx;
            color: #666;
            transition: all 0.3s ease;
            position: relative;
            background-color: #f5f3f0;
            // border-radius: 8rpx;
            // margin: 0 5rpx;
            
            &.tab-item-first-row {
                flex: 1;
                width: 50%;
            }
            
            &.tab-item-second-row {
                flex: 1;
            }
            
            &.active {
                background: #ab7f41;
                color: #fff;
                font-weight: 600;
                z-index: 1;
            }
        }
    }
}

.tab-content {
    padding: 0rpx;
    background-color: #faf8f5;
}
</style>

