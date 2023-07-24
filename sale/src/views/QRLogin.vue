<template>
  <div class="login-box">
    <div class="login">
      <div class="header">      
        <h1>用户登录</h1>
      </div>
      <div id="login_form">
        <div class="qrcode-container">
        <img :src="qrCodeDataUrl" alt="QR Code" />
      </div>
        <div class="otherlogin">
          <hr>
          <p>其他方式登录</p>
            <a @click="login">
              <img alt="密码登录" src="/login/user.jpg" width="30px">
              <p>密码登录</p>
              
            </a>
            <br>
            <a @click="smsLogin">
              <img alt="短信登录" src="/login/note.jpg" width="30px">
              <p>短信登录</p>
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
import QRCode from 'qrcode';
import router from '@/router'

export default {
  data() {
    return {
      qrCodeDataUrl: '',
      url: 'http://localhost:8083/#/home/front' 
    };
  },
  mounted() {
    this.generateQRCode();
  },
  methods: {
    generateQRCode() {
      QRCode.toDataURL(this.url, { errorCorrectionLevel: 'H' }, (error, dataUrl) => {
        if (error) {
          console.error(error);
        } else {
          this.qrCodeDataUrl = dataUrl;
        }
      });
    },
    smsLogin() {
      router.push('/smsLogin');
    },
    login() {
      router.push('/login');
    },
  },
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
    .qrcode-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
    .qrcode-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
    .qrcode-container img {
      width: 200px;
      height: 200px;
    }

    .otherlogin{
      text-align: center;
      color: #8a8f92;
      margin-bottom: 20px;
    }
    
    .message {
      padding: 10px;
      padding-bottom: 0;
      color: rgb(12, 12, 12);
      border: 1px solid #d8dee2;
      text-align: center;
    }
  }
}

</style>