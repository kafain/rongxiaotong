<!-- 关于我们页面 -->
<template>
  <div class="about-container">
    <img src="../assets/img/logo.png" class="logo"/>
    <div class="about-content">
      <div class="item-style">关于融销通：</div>
      <div class="item-style marginL25">融销通是一款基于数字经济的农产品融销一体平台。</div>
      <div class="item-style marginL25">
        从用户的角度出发，能够很好的支持农户进行产销购入等活动：针对性性强，使用简便，农户进行买卖商品，联系客户时，操作简单易于理解。将农产品求购与货源同
      </div>
      <div class="item-style">
        时展出，提高了成功率。长此以往将形成一个良性循环。支持农业专家进行知识分享，解惑答疑等工作，农户不仅在网站平台上进行商品的买卖，如果遇到有关问题，可以
      </div>
      <div class="item-style">
        线上与专家讨论，搜索相关知识，也可以与专家线下预约，解决农业问题。同时，平台也提供了一个良好的银行与用户进行融资的环境，农户用户作为贷款很大的群体，实
      </div>
      <div class="item-style">际中却不尽人意，银行方面，难以获取实际需求用户，难以了解用户需求，农民方面，文化水平有限或单方面排斥，不能很好的相关获取信息，利用银行资源。平台瞄准需</div>
      <div class="item-style">求，给银行推智能匹配客户，给农户开通融资申请接口，方便双方沟通，达到双赢。</div>
      <div class="contact-us marginR105" style="margin-top:150px;">联系我们：</div>
      <div class="item-style contact-us">全国服务热线：400-828-123456</div>
      <div class="item-style contact-us marginR50">QQ: 1234567890</div>
    </div>
    <div class='map-box'>
      <div class='container' id='container'></div>
    </div>
  </div>
</template>
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
data() {
return {
map: null
}
},
created() {
this.initMap()
},
methods: {
initMap() {
// 高德地图key的密钥
window._AMapSecurityConfig = {
securityJsCode: '' // 密钥
}
AMapLoader.load({
key: "93479051c3ebc91b0af8e57a1683c6f4", // 申请好的Web端开发者Key，首次调用 load 时必填
version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
AMapUI: {
// 是否加载 AMapUI，缺省不加载
version: '1.1', // AMapUI 缺省 1.1
plugins: [] // 需要加载的 AMapUI ui插件
},
Loca: {
// 是否加载 Loca， 缺省不加载
version: '2.0.0' // Loca 版本，缺省 1.3.2
}
}).then((AMap) => {
console.log('-----')
this.map = new AMap.Map('container', {
viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
zoom: 11, //初始化地图层级
center: [104.18408, 30.8222],//初始化地图中心点
});
}).catch(e => {
console.log(e);
})
}
}
}
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
}
</style>
<style lang="less" scoped>
.about-container{
  width: 1100px;
  background: #fff;
  margin: 10px auto;
  padding: 50px 20px;
  height: 100%;
  display: flex;
  flex-flow: column;
  // justify-content: center;
  align-items: center;
  .logo{
    width: 292px;
    height: 261px;
  }
  .item-style{
    height: 25px;
    line-height: 25px;
  }
  .marginL25{
    margin-left: 25px;
  }
  .marginL25{
    margin-left: 25px;
  }
  .contact-us{
    display: flex;
    justify-content: flex-end;
  }
  .marginR105{
    margin-right: 105px;
  }
  .marginR50{
    margin-right: 30px;
  }
  .about-content{
    margin-top: 50px;
  }
}
.map-box{
  width:1000px;
  height:1000px;
}
</style>
