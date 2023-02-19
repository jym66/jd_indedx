<template>
  <search :hotWords="hotWords" :navItem="navItem"></search>
  <centerNav></centerNav>
  <card></card>
  <recommend_title channel_title="为你推荐"></recommend_title>
  <div class="w recommend_card_Wrapper">
    <ul>
      <div class="recommend_card" v-for="i in cardInfo" :key="i">
        <li @click="prodIdDetail(i.prodId)">
          <recommend_card :title="i.prodName" :imgUrl="i.pic" :price="i.price" :url="i.url"></recommend_card>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import search from '@/components/search.vue'
import centerNav from './centerNav.vue'
import card from './cardView.vue'
import recommend_title from '@/components/recommend_title.vue'
import recommend_card from '@/components/recommend_card.vue'
import {onMounted, ref} from "vue";
import {lastedProdPage} from "@/util/api";
import router from "@/router";

let hotWords = ['满199减100', '元旦大促', '美妆新选', '服饰清仓', '3C特惠', '爆品满减', '新年囤货']
let navItem = ['PLUS会员', '品牌闪购', '拍卖', '飞燕家电', '飞燕超市', '飞燕生鲜', '飞燕国际', '飞燕云']
let cardInfo = ref([
  // {
  //   "shopId": null,
  //   "shopName": "mall4j小店1",
  //   "prodId": 18,
  //   "prodName": "Apple iPhone XS Max 移动联通电信4G手机 ",
  //   "price": 1.01,
  //   "content": null,
  //   "oriPrice": null,
  //   "totalStocks": null,
  //   "brief": "6.5英寸大屏，支持双卡。",
  //   "pic": "https://img.mall4j.com/2019/04/eaa8c9bd3e7b41eaa310adbde10b6401.jpg",
  //   "imgs": null,
  //   "categoryId": null,
  //   "skuList": null,
  //   "transport": null
  // }
])
onMounted(() => {
  console.log('开始获取每日推荐');
  lastedProdPage({
    current: 1,
    size: 10
  }).then(response => {
    cardInfo.value = response.data.records
    console.log('每日推荐获取成功');
  })
})
const prodIdDetail = (prodId) => {
  router.push({
    path: '/goodsDetail',
    query: {
      prodId: prodId
    }
  })
}
</script>

<style scoped>
.recommend_card_Wrapper {
  display: flex;
}

.recommend_card {
  margin-right: 8px;
  margin-bottom: 10px;
  float: left;
}
</style>
