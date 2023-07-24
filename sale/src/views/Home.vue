<template>
  <div class="home-content" ref="top">
    <navigation-bar></navigation-bar>
    <div class="sidebar">
        <div class="message">
            <img src="../assets/img/message.png" alt="" class="pic-message">
            消息
        </div>
        <div class="kefu">
            <img src="../assets/img/service.png" alt="" class="pic-kefu">
            客服
        </div>
        <div class="fankui" @click="goToFeedbackPage()">
            <img src="../assets/img/Feedback.png" alt="" class="pic-fankui">
            反馈
        </div>
        <div class="jubao" onclick="window.open('https://www.12377.cn/?spm=a21bo.jianhua.20220530.3.5af92a897oQFRy', '_blank')">
            <img src="../assets/img/jubao.png" alt="" class="pic-jubao">
            举报
        </div>
        <div class="to-Top">
            <img src="../assets/img/toTop.png" alt="" class="pic-top">
            <button @click="scrollToTop" class="top-button">回顶部</button>
        </div>
    </div>
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
  mounted() {
        window.addEventListener('scroll', this.handleScroll,true);
    },
  destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goToFeedbackPage() {
      const { href } = this.$router.resolve({
        path: '/FeedbackPage'
      });
      window.open(href, '_blank');
    },
    handleScroll() {
        const scrollHeight = window.innerHeight;
        var sidebar = document.querySelector('.sidebar');
        var toTop = document.querySelector('.to-Top');
        const scrollTop = this.$refs.top.scrollTop;
        if(scrollTop > scrollHeight){
          toTop.style.display = 'block';
          sidebar.style.borderBottomRightRadius = '0';
        } else {
          toTop.style.display = 'none';
          sidebar.style.borderBottomRightRadius = '10px';
        }
    },
    scrollToTop() {
      clearInterval(this.timers);
      // 重新点击回到顶部。清除之前的定时器
      if (this.timer != null) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.scrollToTopTimer();
      }, 20);
    },
    scrollToTopTimer() {
      let scrollTop = this.$refs.top.scrollTop;
      if (scrollTop > 0) {
        scrollTop -= 100;
        if (scrollTop <= 0) {
          scrollTop = 0;
          clearInterval(this.timer);
        }
      }
      this.$refs.top.scrollTop = scrollTop;
    },
  },
};
</script>

<style lang="less" scoped> 
.home-content{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  /* overflow:hidden; */
}

.sidebar {
  position: fixed;
  top: 130px;
  /* height: 295px; */
  padding-top: 26px;
  padding-bottom: 26px;
  left: 0;
  width: 60px;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.to-Top {
  display: none;
  position: fixed;
  top: 468px;
  left: 0;
  width: 60px;
  height: 70px;
  padding-bottom: 20px;
  background-color:white;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}

.top-button{
    border: none;
    background-color: white;
    width: 60px;
}

.pic-message,.pic-kefu,.pic-jubao,.pic-fankui,.pic-top{
    clear: both;
    display: block;
    margin: auto;
    display: flex;
    width: 22px;
    height: 24px;
    background-size: 28px;
    margin-bottom: 5px;
}

.message,.kefu,.fankui{
    text-align: center;
    margin-bottom: 30px;
}
.jubao{
    text-align: center;
}
</style>