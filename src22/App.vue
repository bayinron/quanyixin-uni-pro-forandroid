<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
    console.log('App Launch');
});
onShow(() => {
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>
<style lang="scss">
@import '@climblee/uv-ui/index.scss';
page {
    background-color: #f0f8ff;
}
body {
    overscroll-behavior-y: none;
}
</style>
