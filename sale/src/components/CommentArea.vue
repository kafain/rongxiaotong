<template>
    <div class="CommentArea">
        <el-input type="textarea" v-model="content" :rows="5"></el-input>
        <div style="margin-top:20px;display: flex;flex-direction: row;justify-content: flex-end">
        <el-button type="success" @click="handleComment">添加评论</el-button>
        </div>
        <div class="comment-container">
        <div class="comment-num">评论共{{commentArray.length||0}}条</div>
        <div class="comment-item" v-for="(item,index) in commentArray" :key="index">
            <div>{{item.content}}</div>
            <div class="comment-tips">
            <div style="margin-right:40px;">评论人：<span class="color6">{{item.ownName}}</span></div>
            <div>评论时间：<span class="color6">{{item.createTime|formatTimer2}}</span></div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import {selectComment,addComment} from "../api/order"

    export default {
      data(){
        return{
          updateInfo:{},
          content:'',
          commentArray:[]
        }
      },
      filters: {
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
        },
        formatTimer2: function(value) {
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
          return y + "-" + MM + "-" + d + " "+h+":"+m;
        }
      },
      methods:{
        // 查询评论
        getCommentData(){
          selectComment({
            orderId: this.$route.query.orderId
          }).then(res => {
            this.commentArray = res.data
          }).catch(err=>{
            console.log(err)
          })
        },
        handleComment(){
          if(this.content===''){
            this.$message.error('评论内容不能为空！')
            return
          }
          if(localStorage.getItem('token')){
            addComment({
              orderId: this.$route.query.orderId,
              content: this.content
            }).then(res=>{
              this.content=''
              this.$message.success('评论成功！')
              this.getCommentData()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.$message.error('请先登录')
          }
        }
      },
      mounted(){
        this.getCommentData()
      }
    }
</script>
    
    <style lang="less" scoped>
    .CommentArea{
        width: 1100px;
        margin: 20px auto;
        padding: 20px;
        .comment-container{
            clear: both;
            margin-top: 10px;
            .comment-num{
                font-weight: bold;
            }
            .comment-item{
                border-bottom: 1px solid #f2f2f2;
                padding: 10px 20px;
                margin: 20px 0;
                word-break: break-all;
                .comment-tips{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    .color6{
                    color: #666;
                    }
                }
            }
        }
    }
</style>
