<template>
    <div class="login-box">
      <div class="login">
        <div class="header">
          <!-- <a href="/">
          <img src="/public/img/logo3.png" alt="" />
        </a> -->
          <h1>用户登录</h1>
        </div>
        <div id="login_form">
          <div class="form-group">
            <label for="username">手机号</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              placeholder="请输入手机号"
              v-model="phone"
            />
          </div>
          <div class="form-group">
            <label for="">短信验证码</label>
  
            <input
              type="text"
              class="form-control"
              id="verificationCode"
              name="verificationCode"
              placeholder="请输入验证码"
              v-model="verificationCode"
            />
            <a @click="sendMsg" class="send-code-button">获取验证码</a>
          </div>
          
          <div class="captcha-container">
            <canvas ref="captchaCanvas" @click="refreshCaptcha" width="120" height="40"></canvas>
            <div>
              <input type="text" v-model="inputCode"  placeholder="请输入验证码" class="input-container" />
            </div>
            
          </div>
          <button class="btn btn-success btn-block" @click="loginBtn">
            登录
          </button>
          <p>{{ message }}</p>
          <div class="otherlogin">
            <hr><p>其他方式登录</p>
            <a @click="login">
              <img alt="密码登录" src="/login/user.jpg" width="30px">
              <p>密码登录</p>
              
            </a>
            <br>
            <a @click="QRLogin">
              <img alt="二维码登录" src="/login/QR.jpg" width="30px">
              <p>二维码登录</p>
            
            </a>
          </div>
          <div class="message">
            <p>没有账号? <router-link to="/register">立即注册</router-link></p>
          </div>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  
 
  import{sendVerificationCode,checkPhoneNumberExists} from '../api/user'
  import { userLogin } from "../api/user";
  import router from '@/router'
  export default {
    name: "SmsLogin",
    
    data() {
      return {
        phone: '',
        verificationCode: '',
        message: '',
        inputCode: "",
        captchaCode: '',
      };
    },
    mounted() {
      this.drawCaptcha();
    },
    methods: {
        sendVerificationCode() {
        // 调用后端API检查手机号是否存在于数据库中
        checkPhoneNumberExists({ phone: this.phone })
            .then(response => {
            if (response.data.exists) {
                // 手机号存在，发送请求到后端获取验证码
                this.sendVerificationRequest();
            } else {
                // 手机号不存在，输出提示信息
                this.message = "用户不存在";
            }
            })
            .catch(error => {
            // 处理错误情况
            this.message = "请求发送验证码失败，请重试。";
            });
    },
        sendMsg(){
        sendVerificationCode(
        // 发送请求到后端获取验证码
        { phone: this.phone })
            .then(response => {
              if (this.phone == "") {
                  alert("手机号不能为空");
                  return;
              }
            this.message = "验证码已发送，请注意查收。";
            })
            .catch(error => {
            this.message = "请求发送验证码失败，S请重试。";
            });
        },
        loginBtn(){
            userLogin({
                phone: this.phone,
                verificationCode: this.verificationCode,
            })
                .then((res) => {
                if (this.phone == "") {
                    alert("手机号不能为空");
                    return;
                } else if (this.verificationCode == "") {
                    alert("验证码不能为空");
                    return;
                } else if (this.inputCode.toLowerCase() === this.captchaCode.toLowerCase()) {
                    
                    this.$router.push("/home").catch((err) => err);
                    window.location.reload();
                    
                } else if(this.inputCode.toLowerCase()==""){
                        alert("请输入验证码！");
                }else {
                    alert("验证码错误！");
                    this.drawCaptcha();
                    this.inputCode = "";
                }
                })
                .catch((err) => {
                console.log(err);
                });
           

        } ,
    
      refreshCaptcha() {
        this.drawCaptcha();
      },
      drawCaptcha() {
        const canvas = this.$refs.captchaCanvas;
        const ctx = canvas.getContext("2d");
  
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // 绘制随机验证码
        const code = this.generateRandomCode();
  
        // 保存验证码
        this.captchaCode = code;
  
        // 绘制验证码文本
        const textX = 10;
        const textY = canvas.height / 2;
        ctx.font = "24px Arial";
        ctx.textBaseline = "middle";
        ctx.fillText(code, textX, textY);
  
        // 绘制干扰线和噪点
        for (let i = 0; i < 6; i++) {
          ctx.strokeStyle = this.generateRandomColor();
          ctx.beginPath();
          ctx.moveTo(
            this.generateRandomNumber(0, canvas.width),
            this.generateRandomNumber(0, canvas.height)
          );
          ctx.lineTo(
            this.generateRandomNumber(0, canvas.width),
            this.generateRandomNumber(0, canvas.height)
          );
          ctx.stroke();
        }
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = this.generateRandomColor();
          ctx.beginPath();
          ctx.arc(
            this.generateRandomNumber(0, canvas.width),
            this.generateRandomNumber(0, canvas.height),
            1,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      },
      generateRandomCode() {
        // 生成随机验证码
        const codeLength = 4;
        let code = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < codeLength; i++) {
          const randomIndex = this.generateRandomNumber(0, characters.length - 1);
          code += characters[randomIndex];
        }
        return code;
      },
      generateRandomNumber(min, max) {
        // 生成指定范围内的随机整数
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      generateRandomColor() {
        // 生成随机颜色
        const r = this.generateRandomNumber(0, 255);
        const g = this.generateRandomNumber(0, 255);
        const b = this.generateRandomNumber(0, 255);
        return `rgb(${r},${g},${b})`;
      },
      login() {
        router.push('/login');
      },
      QRLogin() {
      router.push('/QRLogin');
      }
    },
    created() {},
  };
  </script>
  
  <style lang="less" scoped>
  @import url("../../node_modules/bootstrap/dist/css/bootstrap.css");
  
  .login-box {
    box-sizing: border-box;
    // width: 1897px;
    height: 100%;
    padding-top: 150px;
    background: url("../assets/img/rice.png");
    background-size: 1897px 920px;
    .login {
      width: 340px;
      margin: 0 auto;
      color: #333;
      .header {
        height: 40px;
        text-align: center;
        h1 {
          font-size: 26px;
          margin: 0;
          color: white;
        }
      }
      #login_form {
        padding: 20px;
        margin-bottom: 15px;
        border: 1px solid #d8dee2;
        border-radius: 5px;
        background-color: #fff;
      }
      .message {
        padding: 1px;
        padding-bottom: 0;
        color: rgb(12, 12, 12);
        border: 1px solid #d8dee2;
        text-align: center;
      }
      .checkbox {
        display: flex;
        align-items: center;
      }
  
      .forgot-password-link {
        margin-left: 10px;
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        margin-left: 150px;
      }
      .captcha-container {
        display: flex;
        justify-content: flex-start;
        align-items:center;
        margin-bottom: 15px;
      }
  
      .input-container {
        display: flex;
        width:100px;
        height: 40px;
        color: rgb(11, 11, 12);
        border: 1px solid #d8dee2;
        align-items:center;
        margin-left: 30px;
        border-radius: 5px;
        text-align: center;
      }
      
      .otherlogin{
        text-align: center;
        color: #8a8f92;
        margin-bottom: 20px;
      }
      .send-code-button {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
        margin-left: 220px;
    }

        p {
            text-align: center;
            margin-top: 10px;
        }
    }
  }
  </style>
  