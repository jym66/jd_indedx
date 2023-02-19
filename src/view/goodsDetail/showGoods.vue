<template>
  <div class="w">
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img" :class="{background:video_play}">
          <ul class="play_close" v-show="video_play">
            <li>
              <span class="iconfont icon-video_close" @click="video_Close"></span>
            </li>
          </ul>
          <ul class="play_btn" v-show="!video_play">
            <li>
              <span class="iconfont icon-videoplay" @click="playVideo"></span>
            </li>
          </ul>
          <img :src="goodsInfo.goodsImg[small_img_index]" alt="" v-show="!video_play">
          <video
              ref="video"
              autoplay v-show="video_play"></video>
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in goodsInfo.goodsImg" :key="index"
               @mousemove="()=>small_img_index = index">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">校园配送</span> {{ goodsInfo.title }}</p>
        </div>
        <div class="item-detail-tag">
          <span v-for="(item,index) in goodsInfo.tags" :key="index">【{{ item }}】</span>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">京&nbsp;东&nbsp;价</span>
                <span class="item-price">￥{{ computed_price }}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">优&nbsp;惠&nbsp;券</span>
                <span class="item-price-full-cut" v-for="(item,index) in goodsInfo.discount"
                      :key="index">{{ item }}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span class="item-price-full-cut" v-for="(item,index) in goodsInfo.promotion"
                      :key="index">{{ item }}</span>
              </p>
            </div>
          </div>
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>累计评价</p>
              <p>
                <span class="item-remarks-num">{{ goodsInfo.remarksNum }} 条</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 选择参数 -->
        <div class="item-select" v-for="(items, index) in goodsInfo.skusRaw" :key="index">
          <div class="item-select-title">
            <span>{{ items.paramValue }} </span>
          </div>
          <div class="item-select-column">
            <div class="item-select-row">
              <ul>
                <li :class='{"item-select-box":true,"item-select-box-active":2}'
                    v-for="(item, index1) in items.valueList"
                    :key="index1"
                    @click="addSelect_array(index,index1)">
                  <div class="item-select-intro">
                    <p>{{ item.valueValue }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <div class="input_Wrapper">
              <input v-model="addCarStyle.count">
              <div style="overflow: hidden">
                <button class="addButton" @click="addCarStyle.count+=1">+</button>
                <button class="subButton" @click="addCarStyle.count-=1" :class="{'notSub':!addCarStyle.sub}">-</button>
              </div>
            </div>
            <button class="addCar">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {computed, reactive, ref, watch} from "vue";

let video_play = ref(false)
//获取video元素  固定写法
let video = ref(null)
//侧边商品图片的索引
let small_img_index = ref(0)
//选择参数数组，存储选中下标
let select_array = ref([[] * 2])
// 商品详情
let goodsInfo = {
  video: '',
  //基础价格
  price: 990,
  //侧边图片
  goodsImg: [
    'https://img13.360buyimg.com/n1/s450x450_jfs/t1/197505/3/8623/73614/6141198dE32cc4e7a/b2afed31a1ab2ed0.jpg',
    'https://img13.360buyimg.com/n1/s450x450_jfs/t1/92536/4/19734/52479/6141198dE592c55d5/f7e636aad5684781.jpg',
    'https://img13.360buyimg.com/n1/s450x450_jfs/t1/76629/6/17142/91922/6141198dEc47af443/af548c00366792d2.jpg',
    'https://img13.360buyimg.com/n1/s450x450_jfs/t1/112631/24/18706/84952/6141198dE35fa276c/2ef80398e3ffede6.jpg'
  ],
  title: 'Apple iPhone 13 (A2634) 256GB 星光色 支持移动联通电信5G 双卡双待手机',
  tags: [
    '领券减300元', '即刻领券至高优惠300元，9号20点至10号可用！选购[快充套装]加9元得20W快充头！选购[1年期AC+版]限时抢服务5折券', '领券减300元', '领券减300元', '即刻领券至高优惠300元，9号20点至10号可用！选购[快充套装]加9元得20W快充头！选购[1年期AC+版]限时抢服务5折券', '领券减300元'
  ],
  //优惠标签
  discount: ['满148减10', '满218减20', '满288减30'],
  //促销标签
  promotion: ['跨店满减', '多买优惠'],
  //评论数
  remarksNum: 101,
  //选择参数
  skusRaw: [{
    "paramId": "6977",
    "paramValue": "成色",
    "valueList": [{
      "valueId": "1081969",
      "valueValue": "全新"
    }, {
      "valueId": "1080699",
      "valueValue": "仅拆封"
    }]
  }, {
    "paramId": "6975",
    "paramValue": "颜色",
    "valueList": [{
      "valueId": "730003",
      "valueValue": "深空灰色"
    }, {
      "valueId": "730004",
      "valueValue": "银色"
    }, {
      "valueId": "730005",
      "valueValue": "金色"
    }]
  }, {
    "paramId": "7335",
    "paramValue": "配置",
    "valueList": [{
      "valueId": "710004",
      "valueValue": "64G"
    }, {
      "valueId": "710006",
      "valueValue": "256G"
    }]
  },],
}
let addCarStyle = reactive({
  add: true,
  sub: false,
  count: 1
})

watch(addCarStyle, (newCount) => {
  if (typeof newCount.count !== 'number' || newCount.count <= 1) {
    addCarStyle.count = 1
    addCarStyle.sub = false
  } else {
    addCarStyle.count = newCount.count
    addCarStyle.sub = true
  }
})
const playVideo = () => {
  video_play.value = true
  video.value.src = "https://jvod.300hu.com/vod/product/1ccaef7d-f0da-4462-8194-88b2b403ba60/b7386381556e452f8273c987f004a42b.mp4?source=2&h265=h265/18799/b35d8af7192d4d7e98f34019ee6ea4b1.mp4"
  video.value.play()
}
const video_Close = () => {
  video_play.value = false
  video.value.pause()
  video.value.currentTime = 0
}

//计算选择参数之后的价格
const computed_price = computed(() => {
  console.log('computed');
  if (select_array.value.length === 1) {
    return goodsInfo.price
  }
  let sum = 0
  select_array.value.forEach((i, index, array) => {
    array.forEach(() => {
      sum = goodsInfo.skusRaw[index].detail[1].price
    })
  })
  return sum
})

const addSelect_array = (index, index1) => {
  //index 第几个参数
  //index1 参数里的第几个选项
  console.log(index, index1);
  select_array.value[index].push(index1)
}
</script>

<style scoped>

.item-detail-show {
  margin: 15px auto;
  display: flex;
  background-color: #fff;
  justify-content: center;
}

.item-detail-left {
  width: 350px;
  margin-right: 30px;
}

.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0 0 8px #ccc;
  cursor: pointer;
}

.item-detail-big-img img {
  width: 100%;
}

.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0 0 8px #ccc;
  cursor: pointer;
}

.item-detail-img-small img {
  width: 100%;
}

/*商品选购详情*/
.item-detail-right {
  width: 554px;
  display: flex;
  flex-direction: column;
}

.item-detail-title p {
  color: #666;
  font-size: 20px;
}

.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}

/*商品标签*/
.item-detail-tag {
  width: inherit;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #e4393c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
}

.item-price-left {
  display: flex;
  flex-direction: column;
}

.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
}

.item-price-row {
  margin: 5px 0;
}

.item-price {
  color: #e4393c;
  font-size: 23px;
  cursor: pointer;
}

.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}

.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc;
}

.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}

.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}

.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px;
  white-space: nowrap;
}

.item-select-column {
  display: flex;
  flex-direction: column;
}


.item-select-row ul {
  margin-bottom: 8px;
}


.item-select-box {
  display: flex;
  flex-direction: row;
  float: left;
  align-items: center;
}

.item-select-img {
  width: 36px;
}

.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}

.item-select-box:hover {
  border: 1px solid #e3393c;
}

.item-select-box-active {
  border: 1px solid #e3393c;
}

.item-select-img img {
  width: 100%;
}

.item-select-intro p {
  margin: 0px;
  padding: 5px;
}

.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer;
}

.item-select-class:hover {
  border: 0.5px solid #e3393c;
}

.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
}

.add-buy-car {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
}

.input_Wrapper {
  display: flex;
  border: 1px solid #ccc;
}


.input_Wrapper input {
  position: relative;
  border: 0;
  text-align: center;
  /*height: 42px;*/
  width: 40px;
  outline: none;
  margin-bottom: 10px;
}

.input_Wrapper div {
  display: flex;
  flex-direction: column;
}

.addButton, .subButton {
  /*position: absolute;*/
  display: inline-block;
  width: 15px;
  text-align: center;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  background: #f1f1f1;
  color: #666;
  border: 1px solid #ccc;
}

.addCar {
  width: 142px;
  height: 46px;
  border: 0;
  font-size: 18px;
  background-color: #df3033;
  font-weight: 700;
  color: #fff;
  margin-left: 15px;;
}

.notSub {
  cursor: not-allowed;
}

video {
  width: 100%;
  height: 100%;
}

.background {
  background: black;
}

.play_btn {
  position: absolute;
  display: flex;
  justify-content: center;
  z-index: 5;
  width: 350px;
  text-align: center;
  margin-top: 260px;
}

.icon-videoplay {
  font-size: 50px;
  color: #afafaf;
}

.play_close {
  position: absolute;
  display: flex;
  width: 320px;
  margin-top: 10px;
  justify-content: right;
  z-index: 5;
}

.icon-video_close {
  position: absolute;
  color: #ce0707;
  font-weight: 700;
}

</style>