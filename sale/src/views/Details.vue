<template>
  <div>
  <div class="details-box">
    <img v-if="data.picture" :src="$store.state.imgShowRoad + '/file/' + data.picture" alt="" />
    <img v-else src="../assets/img/wutu.gif" alt="" style="border:1px solid #f2f2f2;"/>
    <div class="info">
      <h4 class="title">{{ data.title }}</h4>
      <div class="content" :title="data.content">{{ data.content }}</div>
      <span class="price">￥{{ data.price }}</span>
      <div class="time">
        <span style="margin-right:30px;">发布时间：{{ data.createTime | changeTime }}</span>
        <span>最近修改时间：{{ data.updateTime | changeTime }}</span>
      </div>
      <div class="item-style">
        <div class="operation">
          <div class="operation-item">
            <img src="../assets/img/good.png" class="operation-img" alt="" v-if="i%2!==0" @click="changeGoodsPicture"/>
            <img src="../assets/img/pick.png" class="operation-img" alt="" v-else @click="changeGoodsPicture"/>
            点赞
          </div>
          <div class="operation-item">
            <img src="../assets/img/no-star.png" class="operation-img" alt="" v-if="j%2!==0" @click="changeCollectPicture"/>
            <img src="../assets/img/collect.png" class="operation-img" alt="" v-else @click="changeCollectPicture"/>
            收藏
          </div>
          <div class="operation-item">
            <img src="../assets/img/fill-in.png" class="operation-img" alt="" />
            评论
          </div>
          <div class="operation-item">
            <img @click="genEwm('ermId',data.title)" src="../assets/img/ewm.png" class="operation-img" alt="" />
            商品二维码
          </div>
          <div id="ewm" style="display: none;" class="showEwm">
            <div id="qrCode" ref="qrCodeDiv"></div>
          </div>
        </div>
        <div class="btn-content">
          <el-button type="danger" @click="addShopcartClick" v-if="data.type == 'goods'">加入购物车</el-button>
          <el-popover placement="right" width="320" trigger="hover">
            <div>
              <div class="item-sales">卖家姓名：<span class="sales-text">{{updateUserData.userName}}</span></div>
              <div class="item-sales">卖家地址：<span class="sales-text">{{updateUserData.address}}</span></div>
              <div class="item-sales">卖家手机号码：<span class="sales-text">{{updateUserData.phone}}</span></div>
              <div class="item-sales">更新时间：<span class="sales-text">{{updateUserData.updateTime | formatTimer}}</span></div>
            </div>
            <el-button type="danger" slot="reference" @click.once="changeInfo(item.orderId)" v-show="data.type == 'needs'">联系买家</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
  <CommentArea></CommentArea>
  </div>
</template>

<script>
import { addOrderToCart } from "../api/cart";
import { selectOrderById } from "../api/order";
import ChangeMessage from "../components/ChangeMessage.vue";
import { selectUserByUsername } from "../api/user";
import CommentArea from "../components/CommentArea.vue"
import QRCode from "qrcodejs2"

export default {
  data() {
    return {
      data: [],
      ownerInfo: {},
      userGoods: [],
      updateGoodInfo: {},
      updateUserData:{},
      i:1,
      j:1,
      isShow:false
    };
  },
  filters: {
    changeTime(time) {
      return time.slice(0, 10);
    },
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " ";
    }
  },
  components: { ChangeMessage , CommentArea},
  props: {
    ctype: {
      type: String,
    },
    cdesciibe: {
      type: String,
    },
  },
  methods: {
    //控制是否显示二维码
    genEwm(classId,value){
      this.$nextTick(()=>{
      let isShow = document.getElementById("ewm").style.display;
      if(isShow == 'block'){
      document.getElementById("ewm").style.display = 'none'
      isShow = 'none'
      }else{
      document.getElementById("ewm").style.display = 'block'
      isShow = 'block'
      }
      })
    },
    //生成二维码
    bindQRCode: function (value) {
      var that = this
      setTimeout(() => {
      var qrcode = new QRCode(that.$refs.qrCodeDiv, {
      text: value, // 需要转换为二维码的内容
      width: 130,
      height: 130,
      colorDark: '#000000',
      colorLight: '#ffffff' 
      })
      }, 1000)
    },
    addShopcartClick() {
      addOrderToCart({
        order_id: this.data.orderId,
      })
        .then((res) => {
          console.log(res);
          if (res.flag == true) {
            alert(res.message);
          } else {
            alert(res.message);
          }
        })
        .catch((err) => {
          alert("添加失败,请先登录");
        });
    },
    changeInfo(item) {
      this.$store.commit("updateChangedOrderId", item);
      selectOrderById({
        order_id: this.$store.state.changedOrderId,
      })
        .then((res) => {
          this.updateGoodInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSalesInfo(){
      selectUserByUsername({
        user_name: this.data.ownName,
      }).then((res) => {
        this.updateUserData = res.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    changeGoodsPicture(){
      this.i++
    },
    changeCollectPicture(){
      this.j++
    }
    
  },
  mounted() {
    
    selectOrderById({
      order_id: this.$route.query.orderId,
    }).then((res) => {
      if (res.flag == true) {
        this.data = res.data;
        this.$nextTick(function () {
          this.bindQRCode(this.data.title);
        })
        this.getSalesInfo()
      }
    });
  },
};
</script>

<style lang="less" scoped>
.details-box {
  width: 1100px;
  height: 100%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  img {
    width: 360px;
    height: 300px;
    border-radius: 6px;
  }
  .info {
    position: relative;
    width: 680px;
    height: 300px;
    border: 1px solid #f2f2f2;
    // box-shadow: 3px 3px 3px rgba(3, 0, 0, 0.07);
    border-radius: 6px;
    padding: 10px 20px;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      height: 100px;
      border: 1px dashed #f2f2f2;
      line-height: 23px;
      padding: 5px 10px;
      /*超出的部分隐藏*/
      overflow: hidden;
      /*文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
      /*弹性伸缩盒子模型显示*/
      display: -webkit-box;
      /*限制在一个块元素显示文本的行数*/
      -webkit-line-clamp: 4;
      /*设置或检索伸缩盒对象的子元素排列方式*/
      -webkit-box-orient: vertical;
    }
    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }
    .time {
      margin-top: 5px;
      color: #999;
      display: flex;
      justify-content: flex-start;
    }
    .item-style{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 5px;
      align-items: center;
    }
  }
  .operation {
    display: flex;
    margin-top: 10px;
    margin-right: 150px;
    .operation-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .operation-img{
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
        border-radius: 6px;
      }
    }
    .showEwm{
      display: none;
      position: absolute;
      top:220px;
      left: 215px;
    }
  }
  .btn-content{
    margin-top: 10px;
  }
  .item-sales{
    color: #333 !important;
    line-height: 30px;
    max-height: 30px;
    .sales-text{
      color: #666;
    }
  }
}
</style>
