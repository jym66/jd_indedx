<template>
  <div class="table_wrapper">
    <div class="table_box">
      <div class="table_title">
        <slot name="header-right">

        </slot>
        <span class="table_title_text">
<!--          标题插槽-->
          <slot name="header">订单号：{{ info.orderNumber }}</slot>
        </span>
      </div>
      <div class="table_content">
        <div class="col_auto_center col1">
          <div class="image_box">
            <el-image :src=info.orderItemDtos[0].pic></el-image>
          </div>
          <div class="prod_name_box">
            <span class="prod_name">
              {{ info.orderItemDtos[0].prodName }}
            </span>
            <span class="skuInfo" v-if="info.orderItemDtos[0].skuName">规格: {{ info.orderItemDtos[0].skuName }}</span>
          </div>

        </div>
        <div class="col_auto_center col2">
          <span>x{{ info.orderItemDtos[0].prodCount }}</span>
        </div>
        <div class="col_auto_center col3">
          <span class="onePrice">¥{{ info.orderItemDtos[0].price }}</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col4">
          <span class="total_price">¥{{ info.actualTotal }}</span>
          <span class="payMode">微信支付</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">
          <span class="orderState">{{ status_text[info.status] }}</span>
          <span class="orderDetail">订单详情</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">
<!--          操作插槽 根据标签渲染不同的操作-->
          <slot name="opt">添加收藏</slot></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    info: {
      orderItemDtos: [
        {
          pic: String,
          prodName: String,
          skuName: String,
          price: String,
          prodCount: String
        }
      ],
      orderNumber: String,
      actualTotal: String,
      status: String
    }

  },
  name: "orderTable",
  setup() {
    let status_text = {
      1: '待付款',
      2: '待发货',
      3: '待收货',
      4: '待评价',
      5: '已完成',
      6: '失败'
    }
    return {status_text,}
  }
}
</script>

<style scoped>

.table_wrapper {
  margin: 10px auto auto auto;
  width: 1000px
}

.table_box {
  border: 1px solid #eee;
  margin: auto;
}

.table_title {
  background-color: #f9f9f9;
}

.table_title_text {
  position: relative;
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  margin: 5px auto 5px 10px;
}

.prod_name_box {
  width: 300px;
}

.table_content {
  display: flex;
  height: 100px;
}

.col_auto_center {
  margin: auto;

}

.divider {
  height: 100%;
  border-right: 1px solid #eee;
}

.col1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image_box {
  height: 70px;
  width: 70px;
  margin-right: 20px;
}

.col2 {
  text-align: center;
}

.orderState, .payMode, .total_price, .orderDetail, .onePrice {
  display: block;
  text-align: center;
  margin-bottom: 2px;
}
.prod_name{
  display: block;
  text-align: start;
  margin-bottom: 2px;
}
.skuInfo{
  display: inline-block;
  margin-top: 2px;
  color: #e1251b;
}
.onePrice {
  width: 50px;
}

</style>
