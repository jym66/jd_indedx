<template>
  <div class="boxWrapper">
    <div class="w box">
      <div id="logo">
        <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F24%2F20200624221633_jlymd.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655090427&t=f2390645df6503842ea8f00ddd2eb6da"
            alt="" style="height: 100%;width: 100%">
      </div>
      <!--导航-->
      <div class="header_nav">
        <!--  搜索部分-->
        <div class="search_wrapper">
          <div class="search">
            <input v-model="keyWord" type="text" :placeholder=defaultKeyWord>
            <button @click="search">
              <i class="iconfont icon-search"></i>
            </button>

          </div>
          <div class="shoppingCarWrapper">
            <div class="iconfont icon-gouwuchekong"></div>
            <div class="shoppingCar" @click="$router.push('/car')"><a >我的购物车</a></div>
          </div>
        </div>
        <!--        #热词部分-->
        <div class="hotWords_wrapper">
          <div class="hotWords">
            <ul>
              <li v-for="hotWord in hotWords" :key="hotWord"><a href="#">{{ hotWord }}</a></li>
            </ul>
          </div>
        </div>
        <!--        导航栏信息-->
        <div class="navItems_wrapper">
          <div class="navItems">
            <ul>
              <li><a href="#" class="color-red">秒杀</a></li>
              <li><a href="#" class="color-red">优惠券</a></li>

              <li v-for=" nav in navItem" :key="nav">
                <a href="#">{{ nav }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, reactive, ref, inject, watch} from "vue";
import router from "@/router";


export default {
  props: {
    hotWords: Array,
    navItem: Array
  },
  setup() {
    let defaultKeyWord = ref('iphone13')
    let keyWord = ref('')
    const search = () => {

      // let searchUrl = '/goodList?q=' + (keyWord.value !== '' ? keyWord.value : defaultKeyWord.value)
      // console.log(searchUrl)
      router.push({
        path: '/goodList',
        query: {
          q: keyWord.value !== '' ? keyWord.value : defaultKeyWord.value
        }
      })
    }
    return {keyWord, search, defaultKeyWord}
  }
}
</script>

<style scoped>
.boxWrapper {
  background-color: #fff;
  height: 140px;
  border-bottom: 1px solid #ddd;
}

.box {
  display: flex;
}

#logo {
  margin-top: 20px;
  width: 150px;
  height: 100px;
  display: block;
  overflow: hidden;
}

.header_nav {
  width: 100%;
}

.search_wrapper {
  display: flex;
  justify-content: center;
}

.search {
  margin-top: 25px;
  border: 2px solid #e2231a;
  height: 32px;
  width: 486px;
  display: flex;

}

.search input {
  margin: 0;
  width: 367px;
  height: 26px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 26px;
  padding: 2px 44px 2px 17px;
  outline: none;
}

.search button {
  cursor: pointer;
  width: 58px;
  border: none;
  background-color: #c81623;
}

.shoppingCarWrapper:hover {
  border-color: #e1251b;
}

.shoppingCarWrapper {
  float: right;
  background-color: #fff;
  margin-top: 25px;
  margin-left: 30px;
  width: 130px;
  height: 34px;
  border: 1px solid #e3e4e5;
}

.shoppingCar {
  margin: auto;
  line-height: 34px;
}

.shoppingCar a {
  color: #e1251b;
  margin-right: 11px;
}

.hotWords_wrapper {
  width: 450px;
  left: 220px;
}

.hotWords {
  display: flex;
  justify-content: flex-start;
}

.hotWords ul {
  display: flex;
  margin: 15px 0 0 186px;
}

.hotWords ul li a {
  white-space: nowrap;
  margin-right: 10px;
}

.navItems {
  height: 50px;
}

.navItems ul {
  display: flex;
  line-height: 50px;
  font-size: 17px;
  bottom: 0;
  margin-left: 150px;
  margin-top: 5px;
}

.navItems ul li {
  padding-right: 20px;
}

.color-red {
  font-weight: 700;
}

.shoppingCarWrapper {
  display: flex;
  justify-content: space-around;
}

.icon-gouwuchekong {
  padding: 5px 0 4px 25px;
  color: #e1251b;
}

.icon-search {
  color: #ffffff;
  line-height: 32px;
  font-size: 20px;
  font-weight: 700;
}
</style>
