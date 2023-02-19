<template>
<div class="wrapper" v-if="userInfo">
  <div class="main">
    <div class="item">
      <div class="title">会员头像：</div>
      <div class="content">
        <el-avatar :size=50 :src=userInfo.pic></el-avatar>
      </div>
    </div>
    <div class="item">
      <div class="title">用户名：</div>
      <div class="content">{{userInfo.nickName}}</div>
    </div>
    <div class="item">
      <div class="title">会员昵称：</div>
      <div class="content">
        <input type="text" v-model="userInfo.nickName">
      </div>
    </div>
    <div class="item">
      <div class="title">会员性别：</div>
      <div class="content">
        <el-radio v-model="userInfo.sex"  label='M'>男</el-radio>
        <el-radio v-model="userInfo.sex"  label='F'>女</el-radio></div>
    </div>
    <div class="item">
      <div class="title">会员生日：</div>
      <div class="content">
        2022-1-31
      </div>
    </div>
    <div class="item">
      <div class="title">最后登陆IP：</div>
      <div class="content">
        {{userInfo.userLastip }}
      </div>
    </div>
    <button class="saveUser" @click="save">保存用户信息</button>
  </div>

</div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {getUserInfoApi, setInfo, updatePwd} from "@//util/api";

export default {
  name: "accont",
  setup(){
    let userInfo = ref(null)
    onMounted(()=>{
      getUserInfoApi().then((res)=>{
        userInfo.value = res.data
      })
    })
    const save = () => {
      setInfo({
        nickName:userInfo.value.nickName,
        sex:userInfo.value.sex
      }).then((res)=>{
        console.log(res.data);
      })
    }


    return{userInfo,save}
  }
}
</script>

<style scoped>
.wrapper{
  background-color: #ffffff;
}

.main{
  border: 2px solid #eee;
  padding: 20px 0 100px 100px;
}
.item{
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.title{
  width: 80px;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
}
.content{
  position: relative;
  margin-left: 30px;
  font-size: 14px;
  font-weight: 400;
  /*color: #000;*/
}
input{
  outline: none;
  border: 1px solid #eeeeee;
  width: 300px;
  height: 30px;
  padding: 0 10px;
  font-size: 12px;
  box-sizing: border-box;
}
.saveUser{
  border: 0;
  height: 30px;
  width: 120px;
  background-color: #e1251b;
  color: #fff;
  border-radius: 2px;
  padding: 5px 15px;
  margin-left: 20px;
}
</style>