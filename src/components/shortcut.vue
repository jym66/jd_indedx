<template>
  <div class="shortcut">
    <div class="w">
      <ul class="fl">
        <li>
          <i class="iconfont icon-location"></i>
          <router-link to="/">首页</router-link>
        </li>
      </ul>
      <ul class="fr">
        <li>
          <router-link to='/login' class=color-red>你好&nbsp;,{{ shareState.getNickName() }}</router-link>
        </li>
        <li class="spacer"></li>
        <li>
          <router-link to='javascript:void(0)'>网站导航</router-link>
        </li>
        <li class="spacer"></li>

        <li>
          <router-link to='/self/order'>我的订单</router-link>
        </li>
        <li class="spacer"></li>

        <li>
          <router-link to='/self/account'>我的飞燕</router-link>
        </li>
        <li class="spacer"></li>

        <li>
          <router-link to='/car'>购物车</router-link>
        </li>
        <li class="spacer"></li>
        <li>
          <a @click="logout" v-if="shareState.getAuth()">退出登陆</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance} from "vue";
import store from "@/store";
import {logOutApi} from "@/util/api";
import router from "@/router";

export default {
  name: 'shortcut',
  setup() {
    const {appContext} = getCurrentInstance();
    let shareState = store
    const logout = () => {
      console.log('退出登录调用');
      logOutApi().then(() => {
        // appContext.config.globalProperties.$cookie.clearCookie('nickName')
        // appContext.config.globalProperties.$cookie.clearCookie('Authorization')
        // appContext.config.globalProperties.$cookie.clearCookie('refresh_token')
        localStorage.clear()
        console.log('localStorage清除');
        store.setNickName()
        store.setAuth(false)
        router.push({path: '/'})
      })

    }

    return {logout, shareState}
  }
}
</script>
<style scoped>
.shortcut {
  background: #e3e4e5;
  height: 30px;
  border-bottom: 1px solid #ddd;
  line-height: 30px;
}

.w {
  width: 990px;
  margin: auto;
}

.fr li {
  float: left;
  text-align: center;
}

.fr li a {
  padding: 0 8px 0 8px;

}

.spacer {
  width: 1px;
  height: 10px;
  background: #ccc;
  margin: 11px 5px 0;
  overflow: hidden;
}

.fl li {
  display: flex;
}

.fl li i {
  padding-right: 1px;
}

.iconfont {
  color: #f10215;
}

</style>
