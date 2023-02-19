<template>
  <placeholder></placeholder>
  <div class="box">
    <div class="w regForm">
      <el-form :model="regInfo" ref="form" :rules="rules">
        <el-form-item prop="userMail">
          <div class="inputWrapper">
            <el-input v-model="regInfo.userMail" placeholder="用户名"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
         <div class="inputWrapper">
           <el-input v-model="regInfo.password" type="password" placeholder="密码"></el-input>
         </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <button class="reg" @click="reg(form)">注册</button>
    </div>
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import placeholder from "@//view/order/placeholder";
import {register} from "@//util/api";
import router from "@//router";
export default {
  name: "register",
  components: {
    placeholder
  },
  setup() {
    let form = ref(null)
    const reg = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          register(regInfo).then(res=>{
            setTimeout( ()=>router.push('login'),2000)
            ElMessage({
              message: "注册成功，正在跳转登陆页面！",
              type: 'success',
              duration: 1500,
              customClass: 'element-error-message-zindex'
            })

          })
        }
      })
    }
    const regInfo = reactive({
      userMail: '',
      password: ''
    })
    const rules = reactive({
      userMail: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }
      ]
    })
    return {regInfo, form, rules, reg}
  }
}
</script>

<style scoped>
.box {
  background-color: white;
  padding: 20px;
}

.regForm {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}


input {
  border: 0;
  outline: none;
  height: 50px;
  width: 300px;
  left: 20px;
}

.reg {
  margin: auto;
  border: 0;
  background-color: #e1251b;
  width: 350px;
  height: 40px;
  color: white;
  font-weight: 700;
  font-size: 14px;
}

.btn {
  position: relative;
  display: flex;
  justify-content: center;
}
.inputWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 50px;
  border: 1px solid rgb(204, 204, 204);
}
:deep(.el-input__inner){
  height: 50px;
  border: 0;
  outline: none;
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

</style>
