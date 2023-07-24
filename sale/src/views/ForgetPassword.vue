<template>
  <div class="forgot-password">
    <h1>忘记密码</h1>

    <div class="form-group">
      <label for="phone">手机号：</label>
      <input v-model="phone" type="text" id="phone" name="phone" class="input-field">
      
    </div>

    <div class="form-group">
      <label for="verificationCode">验证码：</label>
      <input v-model="verificationCode" type="text" id="verificationCode" name="verificationCode" class="input-field">
      <button @click="sendMsg" class="send-code-button">获取验证码</button>
    </div>
    <div class="form-group">
      <label for="newPassword">新密码：</label>
      <input v-model="newPassword" type="password" id="newPassword" name="newPassword" class="input-field">
    </div>
    <button @click="resetPassword" class="reset-button">重置密码</button>

    <p>{{ message }}</p>
    
    
  </div>
</template>

<script>

import{sendVerificationCode,resetPassword,checkPhoneNumberExists} from '../api/user'


export default {
  data() {
    return {
      phone: '',
      verificationCode: '',
      newPassword: '',
      message: ''
    }
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
          this.message = "请求发送验证码失败，请重试。";
        });
      },
    resetPassword() {
      resetPassword(
      // 发送请求到后端重置密码
      { phone: this.phone, verificationCode: this.verificationCode, newPassword: this.newPassword })
        .then(response => {
          if (this.phone == "") {
            alert("手机号不能为空");
            return;
          }
          else if (this.verificationCode == "") {
            alert("验证码不能为空");
            return;
          }
          else if(this.newPassword==""){
            alert("请输入新密码");
          }
          alert("密码重置成功，返回登录界面")
          this.$router.push("/login").catch((err) => err);
        })
        .catch(error => {
          alert("密码重置失败，请重试。");
        });
    },
  }
}
</script>

<style scoped>
.forgot-password {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.send-code-button {
  padding: 5px 10px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}


.reset-button {
  padding: 10px 20px;
  background-color: #009688;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  
}

p {
  text-align: center;
}
</style>