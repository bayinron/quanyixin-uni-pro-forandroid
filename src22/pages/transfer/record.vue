<template>
    <div class="record_wrap">
        <div class="record_header">
            <div class="tabs">
                <div :class="{ active: status === 0 }" @click="changeStatus(0)">全部</div>
                <div :class="{ active: status === 1 }" @click="changeStatus(1)">待审核</div>
                <div :class="{ active: status === 2 }" @click="changeStatus(2)">通过</div>
                <div :class="{ active: status === 3 }" @click="changeStatus(3)">驳回</div>
            </div>
        </div>

        <scroll-view class="list" scroll-y="true" @scrolltolower="loadMore" refresher-enabled :refresher-triggered="refreshing" @refresherrefresh="onRefresh">
            <view v-for="item in records" :key="item.id" class="list_item">
                <div class="row">
                    <span class="label">收款账号</span>
                    <span class="value">{{ item.to_username }}</span>
                </div>
                <div class="row">
                    <span class="label">金额</span>
                    <span class="value money">¥{{ item.money }}</span>
                </div>
                <div class="row">
                    <span class="value">{{ item.create_time }}</span>
                    <span class="value" :class="statusClass(item.status)">{{ statusText(item.status) }}</span>
                </div>
         
                <div class="row" v-if="item.status == 3 && item.remark">
                    <span class="label">驳回理由</span>
                    <span class="value">{{ item.remark }}</span>
                </div>
            </view>
            <view class="list_footer">
                <text v-if="loading">加载中...</text>
                <text v-else-if="noMore">没有更多了</text>
            </view>
        </scroll-view>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTransferRecords } from '@/api/getdata';

type RecordItem = {
    id: string;
    to_id: string;
    to_username: string;
    create_time: string;
    audit_time: string;
    status: string | number;
    money: string;
    remark?: string;
};

const status = ref<number>(0); // 0:全部 1:待审核 2:通过 3:驳回
const page = ref<number>(1);
const size = ref<number>(10);
const total = ref<number>(0);
const records = ref<RecordItem[]>([]);
const loading = ref<boolean>(false);
const noMore = ref<boolean>(false);
const refreshing = ref<boolean>(false);

onMounted(() => {
    loadList(true);
});

function changeStatus(newStatus: number) {
    if (status.value === newStatus) return;
    status.value = newStatus;
    loadList(true);
}

function onRefresh() {
    refreshing.value = true;
    loadList(true);
}

function loadMore() {
    if (loading.value || noMore.value) return;
    page.value += 1;
    loadList();
}

function loadList(reset: boolean = false) {
    if (loading.value) return;
    loading.value = true;
    if (reset) {
        page.value = 1;
        noMore.value = false;
    }
    getTransferRecords({ status: status.value === 0 ? undefined : status.value, size: size.value, page: page.value })
        .then((res: any) => {
            if (res && res.result === 'true' && res.data) {
                total.value = Number(res.data.total || 0);
                const list: RecordItem[] = (res.data.data || []) as RecordItem[];
                records.value = reset ? list : records.value.concat(list);
                const loadedCount = records.value.length;
                noMore.value = loadedCount >= total.value || list.length < size.value;
            } else {
                if (reset) records.value = [];
                noMore.value = true;
            }
        })
        .finally(() => {
            loading.value = false;
            if (refreshing.value) {
                refreshing.value = false;
            }
        });
}

function statusText(s: string | number) {
    const v = Number(s);
    if (v === 1) return '待审核';
    if (v === 2) return '通过';
    if (v === 3) return '驳回';
    return '未知';
}

function statusClass(s: string | number) {
    const v = Number(s);
    if (v === 1) return 'pending';
    if (v === 2) return 'success';
    if (v === 3) return 'rejected';
    return '';
}
</script>

<style lang="scss" scoped>
.record_wrap {
    background: #eff9ff;
    min-height: 100%;
    padding-bottom: 40rpx;

    .record_header {
        width: 90%;
        margin: 20rpx auto 0;
        .tabs {
            display: flex;
            background: #fff;
            border-radius: 10rpx;
            overflow: hidden;
            div {
                flex: 1;
                text-align: center;
                line-height: 72rpx;
                height: 72rpx;
                font-size: 28rpx;
                color: #333;
                &.active {
                    color: #16cee5;
                    border-bottom: 2rpx solid #16cee5;
                    font-weight: 600;
                }
            }
        }
    }

    .list {
        width: 90%;
        margin: 20rpx auto 0;
        height: calc(100vh - 260rpx);
        .list_item {
            background: #fff;
            border-radius: 12rpx;
            padding: 20rpx;
            margin-bottom: 20rpx;
            .row {
                display: flex;
                justify-content: space-between;
                line-height: 56rpx;
                .label {
                    color: #666;
                    font-size: 26rpx;
                }
                .value {
                    color: #000;
                    font-size: 28rpx;
                    &.money { color: #d43030; }
                    &.pending { color: #ff9900; }
                    &.success { color: #00b578; }
                    &.rejected { color: #d43030; }
                }
            }
        }
        .list_footer {
            text-align: center;
            color: #999;
            font-size: 26rpx;
            padding: 20rpx 0 40rpx;
        }
    }
}
</style>


