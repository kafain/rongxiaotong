<template>
    <div class="FeedbackPage">
        <div class="logo-content">
            <div style="display:flex;flex-direction:row;justify-content:flex-start;align-items:center;">
            <img src="../assets/img/logo.png" style="height:50px;" alt="" />
            <div class="logo-text">
                <div>融销通</div>
                <div style="font-size:12px;margin-top:5px;color: #666;">
                农产品融销一体平台
                </div>
            </div>
            </div>
        </div>
        <h3 class="title">意见反馈</h3>
        <h4 class="wenzi">请输入您对融销通平台的问题反馈或建议吧～</h4>
        <el-input type="textarea" placeholder="请输入您的反馈和建议" v-model="advice" :rows="5"></el-input>
        <div class="telephone">
            联系电话
            <span class="annotate">解决过程中方便我们与你联系</span>
        </div>
        <el-input placeholder="请输入手机号" class="number" v-model="telephonenumber"></el-input>
        <div style="margin-top:20px;display: flex;flex-direction: row">
            <el-button type="success" @click="submitFeedback">提交</el-button>
        </div>
    </div>
</template>
<script>
import {addFeedback} from "../api/feedback"
export default{
    data(){
        return{
            advice:'',
            telephonenumber:''
        }
    },
    methods:{
        submitFeedback(){
            if(this.content===''){
                this.$message.error('反馈和建议不能为空！')
                return
            }
            if(this.telephonenumber===''){
                this.$message.error('联系方式不能为空！')
                return
            }
            if(this.content===''&&this.telephonenumber===''){
                this.$message.error('反馈和联系方式都不能为空！')
            }
            if(localStorage.getItem('token')){
                addFeedback({
                    advice: this.advice,
                    telephonenumber:this.telephonenumber
                }).then(res=>{
                    this.advice=''
                    this.telephonenumber=''
                    this.$message.success('反馈成功！')
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$message.error('请先登录')
            }
        }
    },
}
</script>
<style>
.FeedbackPage{
    margin-left: 150px;
    margin-right: 150px;
    margin-top: 0px;
    margin-bottom: 0px;
    .logo-content{
        color: #035D1C;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 20px;
        .logo-text{
            margin-left: 10px;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
    .title{
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        font-weight: bold; 
    }
    .wenzi{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .telephone{
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        .annotate{
            color: #999;
            font-size: 14px;
        }
    }
    .number{
        width: 200px;
    }
}
</style>