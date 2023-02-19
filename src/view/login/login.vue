<template>
  <div class="loginBannerWrapper">
    <div class="w loginBanner">
      <div class="login_form">
        <div class="tips_wrapper">
          <div class="tips_inner">
            <div class="cont_wrapper">
              <i class="iconfont icon-ico-tips"></i>
              <p>飞燕不会以任何理由要求您转账汇款,谨防诈骗</p>
            </div>
          </div>
        </div>
        <div class="login_tabs">
          <h3>账户登录</h3>
        </div>
        <div class="login_box">
          <div class="login_h"></div>
          <div class="form">
            <el-form ref='loginRef' :rules="rules" :model="ruleForm">
              <!--              用户名-->
              <el-form-item prop="principal">
                <div class="user_input">
                  <div class="user_input_label">
                    <i class="iconfont icon-user"></i>
                  </div>
                  <el-input v-model="ruleForm.principal" type="text" placeholder="邮箱/用户名/登录手机"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="credentials">
                <div class="passwd_input">
                  <div class="passwd_input_label">
                    <i class="iconfont icon-mima"></i>
                  </div>
                  <el-input v-model="ruleForm.credentials" type="password" placeholder="密码"></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login_button">
          <button class="login_button_submit" @click="login(loginRef)">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
        </div>
        <div class="register" @click="reg">立即注册</div>
      </div>
    </div>
  </div>
</template>

<script>

import {getCurrentInstance, reactive, ref} from "vue";
import router from "@/router";
import store from "@/store";
import {loginApi} from "@/util/api";

export default {
  props: {
    query: String
  },
  setup(props) {
    //线上用法 解构appContext
    const {appContext} = getCurrentInstance();
    const loginRef = ref(null)
    const ruleForm = reactive({
      principal: '',
      credentials: '',

    })
    const rules = reactive({
      principal: [
        {
          required: true,
          message: '邮箱/用户名/登录手机',
          trigger: 'blur',
        }],
      credentials: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }],
    })
    let shareState = store
    const login = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          loginApi({
            principal: ruleForm.principal,
            credentials: ruleForm.credentials
          }).then((response) => {
            console.log('------设置localStorage---------');
            // appContext.config.globalProperties.$cookie.setCookie('Authorization', response.data.token_type + response.data.access_token)
            // appContext.config.globalProperties.$cookie.setCookie('refresh_token', response.data.refresh_token)
            // appContext.config.globalProperties.$cookie.setCookie('nickName', response.data.nickName)
            localStorage.setItem('Authorization', response.data.token_type + response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('nickName', response.data.nickName)
            shareState.setNickName(response.data.nickName)
            console.log('---------跳转首页-----------');
            // 设置登陆状态
            store.setAuth(true)
            router.push(props.query ? props.query : '/')
          }).catch((error) => {
            console.log('错误', error);
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    const reg = ()=>{
      router.push("/reg")
    }
    return {login, rules, ruleForm, loginRef,reg}
  },
  name: "login"
}
</script>

<style scoped>
.loginBannerWrapper {
  height: 476px;
  background-color: #3f4667;
}

.loginBanner {
  height: 100%;
  width: 100%;
  background: url("http://996gg.xyz/edddaa621482c7f4cc9fb65812ce64e3.webp");
  background-size: 100% 100%;
  /*margin: auto;*/
}

.login_form {
  position: relative;
  top: 20px;
  width: 364px;
  height: 399px;
  overflow: visible;
  background: #fff;
  margin: auto;
}

.tips_wrapper {
  background: #fff8f0;
  width: 100%;
  padding: 10px 0 10px 0;
  text-align: center;
}

.tips_inner p {
  vertical-align: middle;
  color: #999;
  font-size: 12px;
  display: inline-block;
}

.login_tabs {
  /*width: 256px;*/
  height: 54px;
  line-height: 54px;
  font-size: 18px;
  text-align: center;
  border-bottom: 1px solid #f4f4f4;
  background: #fff;
  display: block;
  color: #e4393c;
}

.login_box {
  width: 306px;
  padding: 20px;
  margin: auto;

}

.login_h {
  min-height: 23px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.login_button {
  border: 1px solid #cb2a2d;
  margin: 0 auto;
  width: 304px;
}

.login_button_submit {
  width: 100%;
  border: 1px solid #e85356;
  display: block;
  background: #e4393c;
  height: 31px;
  line-height: 31px;
  color: #fff;
  font-size: 20px;
  text-align: center;
}

.login_button_submit:hover {

}

.icon-ico-tips {
  display: inline-block;
  margin-top: 2px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  vertical-align: middle;
  margin-right: 6px;
  font-size: 20px;
}

.user_input, .passwd_input {
  border: 1px solid #bdbdbd;
  height: 40px;
  width: 306px;
  display: flex;

}

.user_input_label, .passwd_input_label {
  height: 40px;
  width: 45px;
  text-align: center;
  border-right: 1px solid #bdbdbd;
}

.icon-mima, .icon-user {
  font-size: 20px;
  line-height: 38px;

}

:deep(.el-input__inner) {
  position: relative;
  height: 100%;
  margin: 0;
  width: 100%;
  outline: none;
  border: 0;
  padding: 0 0 0 7px;
  overflow: hidden;
  -webkit-user-select: text !important;
  border-radius: 0;
  --el-input-border: none;
  --el-input-hover-border: none;
  --el-input-focus-border: none;
  --el-input-transparent-border: none;
  --el-input-border-color: none;
  --el-input-border-radius: none;
  --el-input-bg-color: none;
  --el-input-icon-color: none;
  --el-input-placeholder-color: none;
  --el-input-hover-border-color: none;
  --el-input-clear-hover-color: none;
  --el-input-focus-border-color: none;
}


:deep(.el-button > span) {
  position: relative;
  text-align: center;
  line-height: 31px;
  height: 31px;
  bottom: 10px;
}

.el-button :hover, .el-button :focus {
  background-color: #e4393c;
}
.register{
  position: relative;
  float: right;
  margin: 20px;
  font-size: 14px;
}
.register:hover{
  color: #e1251b;
  cursor: pointer;
}
</style>
