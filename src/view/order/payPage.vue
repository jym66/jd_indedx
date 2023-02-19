<template>
  <div class="wrapper">
    <placeholder></placeholder>
    <div class="w">
      <order_header title="支付订单" :time-line=time_line></order_header>
      <div class="payBox">
        <el-result icon="success" :sub-title=tips></el-result>
      </div>
      <div class="choose_pay_mode">
        <el-space>
          <div v-for="(item,index) in choose_pay" :key="index"
               :class="{item:true,choose_pay_box:true,active_box:index===active}"
               @click="active=index">
            <div class="img">
              <el-image :src=item.imgUrl></el-image>
            </div>
            <span>{{ item.title }}</span>
          </div>

        </el-space>

      </div>
      <button class="payNow" @click="pay_now" v-loading.fullscreen.lock="loading" element-loading-text="正在连接支付网关" element-loading-background="rgba(0, 0, 0, 0.8)">立即付款</button>
    </div>

  </div>

</template>

<script>
import placeholder from "@/view/order/placeholder";
import order_header from "@/view/order/order_header";
import {ref} from "vue";
import {pay} from "@/util/api";
import {ElMessage} from "element-plus";

export default {
  components: {
    placeholder,
    order_header
  },
  name: "payPage",
  setup() {
    let tips = ref("订单提交成功，请尽快付款!")
    let loading = ref(false)
    let choose_pay =
        [
          {
            imgUrl: "https://pc.mall4j.com/_nuxt/img/payment-aliPay.5fbe3ee.png",
            title: "支付宝"
          },
          {
            imgUrl: "https://pc.mall4j.com/_nuxt/img/payment-wechatPay.2ea5c82.png",
            title: "微信支付"
          }
        ]

    let active = ref(0)
    let time_line = ref(2)
    const pay_now = () => {

      pay({"orderNumbers": sessionStorage.getItem('orderNumber')}).then((response) => {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          ElMessage({
            message: '支付成功！',
            type: 'success',
          })
          tips.value = "您已成功付款，感谢您的惠顾！"
          time_line.value = 3
        }, 2000)
      })
    }
    return {active, choose_pay, time_line, pay_now, loading, tips}
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #ffffff;
  padding-bottom: 20px;
}

.payBox {
  background-color: #f9f9f9;
  margin-top: 20px;
}

.choose_pay_mode {
  display: flex;
  margin-top: 30px;
}

.item {
  width: 200px;
  height: 60px;
  border: 1px solid #e0e0e0;
}

.active_box {
  border: 1px solid #e1251b;
}

.img {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}

.choose_pay_box {
  line-height: 60px;
  margin-left: 20px;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: black;
}

.payNow {
  border: 0;
  width: 200px;
  height: 50px;
  margin: 20px;
  color: white;
  background-color: #e1251b;
  font-weight: 700;
  font-size: 16px;
}
</style>
