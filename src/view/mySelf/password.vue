<template>
  <div>
    <input v-model="password">
    <button @click="upPwd">提交</button>
  </div>
</template>

<script>
import {updatePwd} from "@//util/api";
import {ref} from "vue";

export default {
  name: "password",
  setup(){
    let password = ref(null)
    const upPwd =()=>{
      updatePwd({
        userMail:'123',
        password: password.value
      })
    }
    return {upPwd,password}
  }
}
</script>

<style scoped>
</style>