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
          <label for="username">账号</label>
          <input
            type="text"
            class="form-control"
            id="username"
            name="username"
            placeholder="请输入用户名"
            v-model="acount"
          />
        </div>
        <div class="form-group">
          <label for="">密码</label>

          <input
            type="password"
            class="form-control"
            id=""
            name="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="checkbox">
          <label> <input type="checkbox" />记住密码 </label>
          <a class="forgot-password-link" @click="forgotPassword">忘记密码</a>
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
        <div class="otherlogin">
          <hr><p>其他方式登录</p>
          <div>
            <a @click="smsLogin">
              <img alt="短信登录" src="/login/note.jpg" width="30px" >
            <p>短信登录</p>
          </a>
          </div>
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

import { userLogin } from "../api/user";
import router from '@/router'
export default {
  name: "Login",
  
  data() {
    return {
      acount: "",
      password: "",
      inputCode: "",
      captchaCode: '',
    };
  },
  mounted() {
    this.drawCaptcha();
  },
  methods: {
    loginBtn() {
      userLogin({
        username: this.acount,
        password: this.password,
      })
        .then((res) => {
          if (this.acount == "") {
            alert("账号不能为空");
            return;
          } else if (this.password == "") {
            alert("密码不能为空");
            return;
          } else if (this.inputCode.toLowerCase() === this.captchaCode.toLowerCase()) {
            if (res.flag == true) {
              // 在Vuex中存储token
              this.$store.commit("setToken", res.data);

              this.$router.push("/home").catch((err) => err);
              window.location.reload();
            } else {
              alert(res.message);
            }
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
    },
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
    forgotPassword() {
      router.push('/passwordforget');
    },
    smsLogin() {
      router.push('/smsLogin');
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
      margin-bottom: 0px;
      border: 1px solid #d8dee2;
      border-radius: 5px;
      background-color: #fff;
    }
    .message {
      padding: 10px;
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
  }
}
</style>
