<template>
  <div class="home-content">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    NavigationBar,
    Footer,
  },
};
</script>

<style lang="less" scoped> 
.home-content{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>