<template>
  <div class="container">
    <div id="left"><div><MapChart></MapChart></div></div>
    <div class="right-container">
      <div id="top"><GoodsChart></GoodsChart></div>
      <div id="bottom"><NeedsChart></NeedsChart></div>
    </div>
  </div>
</template>

<script>
import GoodsChart from "@/components/AllCharts/GoodsChart.vue";
import NeedsChart from "@/components/AllCharts/NeedsChart.vue";
import MapChart from "@/components/AllCharts/MapChart.vue";

export default {
  name: "AllCharts",
  components: {MapChart, NeedsChart, GoodsChart}
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
.container {
  display: flex; /* 使用 Flexbox 布局 */
  margin-top: 60px;
  justify-content: center;
  align-items: center;
}

#left {
  flex: 1; /* 左边的容器占据剩余空间 */
  align-items: center;
  justify-content: center;
  margin-right: 80px;
  border-right: 1px dotted black;
}

.right-container {
  display: flex; /* 右边的容器使用 Flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  flex: 1; /* 右边的容器占据剩余空间 */
}

#top, #bottom {
  height: 50%; /* 设置上下两个内容块的高度为容器高度的一半 */
}
</style>