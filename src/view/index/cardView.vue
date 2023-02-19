<template>
  <div class="w">
    <div class="seckill">
      <div class="seckill_container">
        <a class="seckill_countdown" href="#">
          <div class="seckill_title">每日疯抢</div>
          <div>
            <div class="seckill_desc">
              <strong>18:00</strong>点场 距结束
              <div class="timmer">
                <span class="hour t">{{ time["h"] }}</span>
                <strong>:</strong>
                <span class="minute t">{{ time["m"] }}</span>
                <strong>:</strong>
                <span class="second t">{{ time["s"] }}</span>
              </div>
            </div>
          </div>
        </a>
        <div class="slider_list">
          <el-carousel v-if="seckill_info.length>0" indicator-position="none" height="260px" :autoplay="false">
            <el-carousel-item v-for="info in seckill_info" :key="info">
              <a href="javascript:void(0)" v-for="info in seckill_info" :key="info" class="slider_list_item_Wrapper"
                 @click="prodIdDetail(info.prodId)">
                <div class="slider_list_item">
                  <div class="seckill_image">
                    <img :src=info.pic :alt=info.prodName :title=info.prodName>
                  </div>
                  <h6 class="seckill-item__name">{{ info.prodName }}</h6>
                  <div class="seckill_item_price">
                    <i class="price_origin">¥</i>
                    <span class="price_origin">{{ info.price }}</span>
                  </div>
                </div>
              </a>

            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="seckill_brand">
          <div>
            <el-carousel height="260px" indicator-position="none" arrow="never">
              <el-carousel-item v-for="item in seckill_banner_info" :key="item">
                <a href="javascript:void(0)">
                  <div class="item_image">
                    <div>
                      <img :src=item.imgUrl :alt=item.name :title=item.name>
                    </div>
                  </div>
                  <div class="item_info">
                    <p class="item_info_title">Apple秒杀专场</p>
                    <p class="item_info_promo">Apple爆品巨惠</p>
                    <div class="item_info_button">
                      品类秒杀
                      <i class="icon-jiantouyou iconfont" style="font-size: 6px"></i>
                    </div>
                  </div>
                </a>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import {moreBuyProdList} from "@/util/api";
import router from "@/router";

export default {
  setup() {
    //是否计算时间
    let isComputedTime = ref(true)
    let diffTime = ref(0)
    let hour = ref(1)
    let minute = ref(1)
    let second = ref(1)
    let interval = ref(null)
    let seckill_info = ref([])
    let seckill_banner_info = ref([
      {
        name: 'RedmiBook Pro 15增强版 轻薄本(i5-11320H 16G 512G 锐炬Xe 3.2K 90Hz超视网膜全面屏) 红米小米笔记本电脑',
        imgUrl: "https://img10.360buyimg.com/seckillcms/s260x260_jfs/t1/149432/3/17447/123392/5fd03843E9f8f6964/1b2a485e7439a1e8.jpg.webp",
      },
      {
        name: 'RedmiBook Pro 15增强版 轻薄本(i5-11320H 16G 512G 锐炬Xe 3.2K 90Hz超视网膜全面屏) 红米小米笔记本电脑',
        imgUrl: "https://img12.360buyimg.com/seckillcms/s260x260_jfs/t1/189700/12/570/319846/608a83ebE407667dd/94960070c713d856.jpg.webp",
      }
    ])
    const timer = (() => {
      interval.value = setInterval(() => {
        diffTime.value = (new Date(1641440720000)) - (new Date());
      }, 1000)
    })
    timer()
    const time = computed(() => {
      if (isComputedTime.value) {
        return {
          h: Math.floor(diffTime.value / 1000 / 60 / 60 % 24) > 9 ? Math.floor(diffTime.value / 1000 / 60 / 60 % 24) : '0' + Math.floor(diffTime.value / 1000 / 60 / 60 % 24),
          m: Math.floor(diffTime.value / 1000 / 60 % 60) > 9 ? Math.floor(diffTime.value / 1000 / 60 % 60) : '0' + Math.floor(diffTime.value / 1000 / 60 % 60),
          s: Math.floor(diffTime.value / 1000 % 60) > 9 ? Math.floor(diffTime.value / 1000 % 60) : '0' + Math.floor(diffTime.value / 1000 % 60)
        }
      }
      return {h: '00', m: '00', s: '00'}
    })
    const prodIdDetail = (prodId) => {
      router.push({
        path: '/goodsDetail',
        query: {
          prodId: prodId
        }
      })
    }
    onMounted(() => {
      console.log('开始获取每日疯抢')
      moreBuyProdList({
        current: 1,
        size: 12
      }).then(response => {
        seckill_info.value = response.data.records
        console.log('每日疯抢获取成功');
        console.log(seckill_info.value);
      })
    })
    watch(diffTime, (newDate) => {

      if (newDate <= 0) {
        isComputedTime.value = false
        // second.value = minute.value = hour.value = 999
        clearInterval(interval.value)
      }
    })
    return {diffTime, hour, minute, second, seckill_info, interval, time, seckill_banner_info, prodIdDetail}
  },
}
</script>

<style scoped>
.seckill_countdown {
  display: inline-block;
  width: 190px;
  height: 260px;
  margin-top: 20px;
  background: #e83632 url("../../assets/img/scekill.png");
  background-size: contain;
}

.seckill_container {
  display: flex;
}

.slider_list {
  /*display: flex;*/
  width: 800px;
  height: 260px;
  margin-top: 20px;
  /*margin-left: 10px;*/
  background-color: white;
}

.slider_list a {
  float: left;
  width: 200px;
  height: 260px;
}

.slider_list_item {
  width: 201px;
  height: 260px;
}

.slider_list a img {
  width: 100%;
  height: 100%;
}

.item_image div {

  width: 120px;
  height: 120px;
  margin: 20px auto auto;
}

.item_image div img {
  width: 100%;
  height: 100%;
}

.seckill_image {
  width: 140px;
  height: 140px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.seckill_title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin-top: 31px;
  font-weight: 700;
  color: #fff;
}

.seckill_desc {
  margin-top: 90px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.seckill_desc strong {
  font-size: 18px;
  padding-right: 2px;
  margin-top: -1px;
  vertical-align: middle;
  display: inline-block;
}

.timmer {
  width: 130px;
  height: 30px;
  display: flex;
  margin: auto;
  padding-top: 10px;
  justify-content: space-around;
}

.t {
  font-weight: 700;
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: #2f3430;
  color: white;
  font-size: 20px;
  overflow: hidden;
}

.seckill-item__name {
  width: 160px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 13px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.slider_list_item_Wrapper {
  display: flex;
  justify-content: space-around;
}

.slider_list_item_Wrapper::after {
  content: "";
  display: block;
  float: right;
  top: 50%;
  width: 1px;
  height: 200px;
  background: linear-gradient(180deg, white, #eeeeee, white);
}


.seckill_item_price {
  background: #fff;
  text-align: center;
  color: #e1251b;
  font-size: 12px;
  font-weight: 700;
  line-height: 40px;
}

.seckill_brand {
  background-color: #fff;
  width: 200px;
  height: 260px;
  margin-top: 20px;
}

.item_info {
  margin: 20px 0 0 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .5), rgba(220, 224, 236, .5));
}

.item_info_title {
  color: #666;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
}

.item_info_promo {
  color: #333;
  font-size: 14px;
  text-align: center;
}

.item_info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item_info_button {
  text-align: center;
  color: #e1251b;
  border-radius: 14px;
  width: 82px;
  height: 24px;
  box-sizing: border-box;
  display: inline-block;
  line-height: 22px;
  font-weight: 700;
  padding: 0 0 0 4px;
  border: 1px solid #e1251b;
  margin: 10px 0 0 0;
  transition: background-color .2s ease;
}

.item_info_button:hover {
  background-color: red;
  color: white;

}
</style>