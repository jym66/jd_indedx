<template>
  <div class="box" style="background-color: #ffffff">
    <GoodsListNav></GoodsListNav>
    <div class="container">
      <!-- 商品标签导航 -->
      <GoodsClassNav></GoodsClassNav>
      <!--    商品展示容器-->
      <div class="good_box">
        <div class="as-box">
          <div class="item-as-title">
            <span>商品精选</span>
            <span>广告</span>
          </div>
          <div class="item-as" v-for="(item,index) in asItems" :key="index" >
            <div class="item-as-img">
              <img :src="item.img" alt="">
            </div>
            <div class="item-as-price">
              <span>
                <span class="seckill-price text-danger">{{ item.price }}</span>
              </span>
            </div>
            <div class="item-as-intro">
              <span>{{ item.intro }}</span>
            </div>
            <div class="item-as-selled">
              已有<span>{{ item.num }}</span>人评价
            </div>
          </div>
        </div>
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li v-for="(i,index) in goodsTool" :key="i">

                <span :class="{'goods-list-tool-active': isAction[index]}" @click="sortList(info,i.en,index)">
                  <i :class="{'iconfont':true,'icon-long-arrow-up':!goodsTool[index].order,'icon-long-arrow-down':goodsTool[index].order}"></i>
                  {{ i.title }}
                </span>
              </li>
            </ul>
          </div>
          <div class="goodsBoxWrapper" v-for="i in info" :key="i" @click="prodIdDetail(i.prodId)">
            <goodsBox :info="i"></goodsBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsListNav from './goodListNav';
import GoodsClassNav from './goodClassNav';
import goodsBox from './goodsBox'
export default {
  components:{
    GoodsListNav,
    goodsBox,
    GoodsClassNav,
  }
}
</script>

<script setup>

import {onMounted, reactive, ref} from "vue";
import {searchProdPage} from "@/util/api";
import router from "@//router";
const props = defineProps({
  query: String
})
console.log(props.query);
let isAction = ref([true, false, false])
let goodsTool = reactive([
  {title: '综合', en: 'commitCount', order: true},
  {title: '评论数', en: 'commitCount', order: true},
  {title: '价格', en: 'price', order: true}
])
let info = ref()
const sortList = (list, key, index) => {
  isAction.value = [false, false, false]
  isAction.value[index] = true
  if (goodsTool[index].order) {
    goodsTool[index].order = !goodsTool[index].order
    return list.sort((a, b) => {
      return a[key] - b[key]
    })
  } else {
    goodsTool[index].order = !goodsTool[index].order
    return list.sort((a, b) => {
      return b[key] - a[key]
    })
  }
}
const prodIdDetail = (prodId) => {
  router.push({
    path: '/goodsDetail',
    query: {
      prodId: prodId
    }
  })
}
onMounted(() => {
  searchProdPage({
    prodName: props.query,
    current: 1
  }).then((response) => {
    info.value = response.data.records
  })
})
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}

.text-danger {
  color: #A94442;
}

.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}

.good_box {
  display: flex;
}

/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}

.item-as-title {
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}

.item-as-title span:first-child {
  margin-left: 20px;
}

.item-as-title span:last-child {
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}

.item-as {
  width: 160px;
  margin: 18px auto;
}

.item-as-img {
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.item-as-price span {
  font-size: 18px;
}

.item-as-intro {
  margin-top: 5px;
  font-size: 12px;
}

.item-as-selled {
  margin-top: 5px;
  font-size: 12px;
}

.item-as-selled span {
  color: #005AA0;
}

/* ---------------侧边广告栏结束------------------- */
/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}

.goods-list-tool {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}

.goods-list-tool ul {
  padding-left: 15px;
  list-style: none;
}

.goods-list-tool li {
  cursor: pointer;
  float: left;
}

.goods-list-tool span {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}

.goods-list-tool span:hover {
  border: 1px solid #E4393C;
}

.goods-list-tool i:hover {
  color: #E4393C;
}

.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}


.goods-show-num span {
  color: #005AA0;
  font-weight: bold;
}

.goodsBoxWrapper {
  position: relative;
  left: 10px;
  margin: 10px 2px 2px 2px;
  float: left;
  display: flex;
  justify-content: space-between;
}

.icon-long-arrow-up, .icon-long-arrow-down {
  font-weight: 900;
}
</style>
