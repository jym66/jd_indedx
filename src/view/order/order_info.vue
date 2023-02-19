<template>
  <div class="prod_info_inner">
    <div class="shop_msg">
      <slot name="header">
        <div>
          <a>店铺：{{ info.shopName }} </a>
        </div>
        <div>
          <span class="ziying">自营</span>
        </div>
      </slot>
    </div>
    <div class="goods_box">
      <div class="imgBox">
        <el-image style="width: 100%;height: 100%" :src=info.pic></el-image>
      </div>
      <div class="prodName">
        {{ info.prodName }}
      </div>
      <div class="price">
        ¥{{ info.price }}
      </div>
      <div class="transplant ">
        <slot name="transplant">
          ¥{{ info.transfee }}
        </slot>

      </div>
      <div class="prod_count ">
       <slot name="prod_count">
         {{ info.prodCount }}
       </slot>
      </div>
      <div class="total_price ">
        ¥ {{ info.productTotalAmount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      shopName: String,
      pic: String,
      prodName: String,
      price: String,
      transfee: String,
      prodCount: String,
      productTotalAmount: String,

    }
  },
  name: "order_info"
}
</script>

<style scoped>
.imgBox {
  width: 80px;
  height: 80px;
  margin: 20px 10px 20px 20px;
}


.prodName {
  width: 300px;
  margin: auto 20px auto 30px;
}

.price, .transplant {
  position: relative;
  width: 220px;
  margin: auto;
  left: 81px;
}

.prod_count, .total_price {
  position: relative;
  width: 220px;
  left: 90px;
  margin: auto;
}

.total_price {
  color: #e1251b;
  font-weight: 600;
}

.shop_msg {
  display: flex;
  height: 30px;
  border-bottom: 1px solid #eee;
  background-color: #f8f8f8;
  line-height: 30px;
}

.ziying {
  background: #e1251b;
  color: #fff;
  padding: 1px 3px;
  display: inline-block;
  height: 14px;
  line-height: 14px;
  border-radius: 2px;
  margin-left: 5px;
  margin-top: 7px;
  vertical-align: top;
}

.prod_info_inner {
  position: relative;
  top: 20px;
  border: 1px solid #eee;
  margin-bottom: 30px;
}

.goods_box {
  display: flex;
  justify-content: flex-start;
}

.shop_msg a {
  font-size: 14px;
  margin-right: 5px;
  margin-left: 10px;
}
</style>