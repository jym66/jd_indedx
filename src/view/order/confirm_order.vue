<template>
  <div v-if="!isLoading" class="wrapper">
    <placeholder></placeholder>
    <div class="w">
      <order_header title="提交订单" :timeLine=1></order_header>
      <div>
        <div class="small_title_wrapper address">
          <div class="small_title">
            <h3>
              收货地址
            </h3>
          </div>
          <el-row>
            <div v-for="(item,index) in addressList" :key="index"
                 :class="{address_box:true,address_box_active: index === orderParam.addrId }"
                 @click="orderParam.addrId = index">
              <el-row>
                <div class="name-phone">
                  <el-space :size="50">
                    <span class="name">{{ item.receiver }}</span>
                    <span class="phone">{{ item.mobile }}</span>
                  </el-space>
                </div>
              </el-row>
              <div class="express_address">{{ item.province }} {{ item.city }} {{ item.addr }}</div>
            </div>
          </el-row>
        </div>
        <el-divider></el-divider>
        <div class="pay_mode small_title_wrapper">
          <div class="small_title">
            <h3>支付方式</h3>
          </div>
          <div class="pay">
            在线付款
          </div>
        </div>
        <el-divider></el-divider>
        <div class="express_mode small_title_wrapper">
          <div class="small_title">
            <h3>配送方式</h3>
          </div>
          <div class="express">
            快递配送
          </div>
        </div>
        <el-divider></el-divider>
        <div class="prod_info">
          <div class="prod_info_small_title">商品信息</div>
          <div class="info_title">
            <div style="width: 200px;margin: auto">&nbsp;</div>
            <div class="info_title_inner">商品</div>
            <div class="info_title_inner1">单价</div>
            <div class="info_title_inner1">运费</div>
            <div class="info_title_inner1">数量</div>
            <div class="info_title_inner1">小计</div>
          </div>
          <div v-for="i in order_info" :key="i">
            <order_info v-if="order_info!==null" :info="i"></order_info>
          </div>
        </div>
        <div v-if="detail!==null">
          <div class="submit_bottom">
            <div class="item">
              <div class="item_tittle">
                <span style="color:#e1251b"> {{ detail.shopCartOrders[0].totalCount }}</span>件商品，共计：
              </div>
              <div class="item_content">
                {{ detail.shopCartOrders[0].actualTotal }}
              </div>
            </div>
            <div class="item">
              <div class="item_tittle">
                应付运费：
              </div>
              <div class="item_content">
                ¥{{ detail.shopCartOrders[0].transfee }}
              </div>
            </div>
            <div class="item">
              <div class="item_tittle">
                限时优惠：
              </div>
              <div class="item_content">
                <span style="color: #e1251b">¥0.00</span>
              </div>
            </div>
          </div>
          <div class="detail-box">
            <div class="item">
              <div class="item_tittle">
                应付总额：
              </div>
              <div class="item_content_total_price">
                ¥{{ detail.shopCartOrders[0].actualTotal }}
              </div>
            </div>
            <div class="bottom_address_item" v-if="addressList.length >0">
                  <span class="bottom_address_text"> 寄送至：{{
                      addressList[active_address].province
                    }} {{ addressList[active_address].city }} {{ addressList[active_address].addr }}</span>
              <span
                  class="bottom_address_text"> 收货人：{{
                  addressList[active_address].receiver
                }} {{ addressList[active_address].mobile }}</span>
            </div>
          </div>
        </div>
        <div class="submit_button_wrapper">
          <button class="submit_button" @click="submit_order">提交订单
          </button>
        </div>
      </div>

    </div>

  </div>
  <div v-if="isLoading" v-loading="true" v-loading.fullscreen.lock="true" element-loading-text="正在努力获取数据,请稍后"> 666</div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {confirmOrder, getAddressList, submit} from "@/util/api";
import store from "@/store";
import router from "@/router";
import order_header from "@/view/order/order_header";
import order_info from "@/view/order/order_info";
import placeholder from "@/view/order/placeholder";

export default {
  name: "confirm_order",
  components: {order_header, order_info, placeholder},
  setup() {
    let isLoading = ref(true)
    let pageInfo = reactive({
      isPay: false,
      title: "提交订单",
      timeLine: 1
    })
    let loading = ref(false)
    //数组下标
    let active_address = ref(0)
    let addressList = ref([]);
    let orderParam = reactive({
      "addrId": 0,
      "basketIds": [],
      "couponIds": [],
      "userChangeCoupon": 0
    })
    //服务端返回的信息
    let detail = ref(null)
    let order_info = ref(null)
    let shopId = ref(1)
    //订单号
    let orderNumber = ref(0);
    onMounted(() => {

      getAddressList().then((response) => [
        addressList.value = response.data
      ])

      if (JSON.stringify(store.getSelectInfo()) !== "{}") {
        //存到session里 关闭窗口就删除
        sessionStorage.setItem('prodInfo', JSON.stringify(store.getSelectInfo()))
        sessionStorage.setItem('isCar',JSON.stringify(store.getIsCar()))
      }
      //从本地缓存取出来订单参数
      if (JSON.parse(sessionStorage.getItem('prodInfo')) !== null) {
        if (!JSON.parse(sessionStorage.getItem('isCar'))){
          orderParam['orderItem'] = JSON.parse(sessionStorage.getItem('prodInfo'))
        }else {
          orderParam["basketIds"] = JSON.parse(sessionStorage.getItem('prodInfo'))
        }
        confirmOrder(orderParam).then((response) => {
          detail.value = response.data
          order_info.value = detail.value.shopCartOrders[0].shopCartItemDiscounts[0].shopCartItems
          isLoading.value = false
        })
      } else {
        router.push("/")
      }
    })
    const submit_order = () => {
      loading.value = true
      submit({"orderShopParam": [{"remarks": "", "shopId": shopId.value}]}).then((res) => {
        orderNumber.value = res.data.orderNumbers
        store.setOrderNumber(orderNumber.value)
        sessionStorage.setItem('orderNumber', orderNumber.value)
        loading.value = false
        router.push("/pay")
      })

    }
    return {addressList, active_address, orderParam, detail, pageInfo, submit_order, order_info, loading,isLoading}
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #ffffff;
  padding-bottom: 20px;
}


.small_title_wrapper {
  position: relative;
  margin-top: 30px;
  left: 20px;
}

.small_title {
  margin-bottom: 20px;
  color: black;


}

.address_box {
  width: 250px;
  height: 100px;
  border: 1px solid #eee;
  margin: 10px 20px 20px 20px;
}

.name-phone, .express_address {
  margin: 10px 0 10px 30px;
  display: flex;
  align-items: center;
}

.name, .phone {
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.express_address {
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.address_box_active {
  border: 1px solid #e1251b;
}

.pay, .express {
  border: 1px solid #e1251b;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: black;
}

.prod_info_small_title {
  position: relative;
  left: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #000;
}

.info_title {
  display: flex;
  background-color: #f8f8f8;
  height: 40px;
  font-size: 14px;
  border: 1px solid #eee;
}

.info_title_inner {
  position: relative;
  width: 450px;
  margin: auto auto auto 100px;
}

.info_title_inner1 {
  position: relative;
  width: 220px;
  margin: auto auto auto 100px;
}


.submit_bottom {
  margin-top: 30px;
}

.item {
  display: flex;
  text-align: right;
  justify-content: flex-end;
  margin-right: 20px;
  font-size: 14px;
  color: black;
  margin-bottom: 15px;
  font-weight: 700;
}

.item_tittle {
  width: 180px;
}

.item_content {
  width: 125px;
}

.detail-box {
  padding: 15px 0;
  line-height: 20px;
  text-align: right;
  border-top: 1px solid #eee;
  color: #999;
  background-color: #f9f9f9;
}

.item_content_total_price {
  font-family: verdana, serif;
  font-weight: 700;
  font-size: 18px;
  color: #e1251b;
}

.bottom_address_item {
  position: relative;
}

.bottom_address_text {
  position: relative;
  margin-right: 20px;
  font-size: 13px;
  color: #666666;
}

.submit_button_wrapper {
  display: flex;
  justify-content: flex-end;
}

.submit_button {
  width: 135px;
  height: 38px;
  background: #e1251b;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border-radius: 2px;
  border: 0;
  margin-top: 20px;
}

</style>
