<template>
  <div class="wrapper">
    <div class="table_box">
      <div class="table_title">
        <span class="table_title_text">订单号：123</span>
      </div>
      <div class="table_content">
        <div class="col_auto_center col1">
          <div class="image_box">
            <el-image src="https://img.mall4j.com/2019/04/de0edd2aaf2d4d3c8b6c3fdfde738805.jpg"></el-image>
          </div>
          <div class="prod_name">商品名称</div>
        </div>
        <div class="col_auto_center col2">
          <span>x1</span>
        </div>
        <div class="col_auto_center col3">
          <span class="onePrice">1499.00</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col4">
          <span class="total_price">总价</span>
          <span class="payMode">微信支付</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">
          <span class="orderState">取消</span>
          <span class="orderDetail">订单详情</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">添加收藏</div>
      </div>
    </div>
    <div class="table_box">
      <div class="table_title">
        <span class="table_title_text">订单号：123</span>
      </div>
      <div class="table_content">
        <div class="col_auto_center col1">
          <div class="image_box">
            <el-image src="https://img.mall4j.com/2019/04/de0edd2aaf2d4d3c8b6c3fdfde738805.jpg"></el-image>
          </div>
          <div class="prod_name">商品名称</div>
        </div>
        <div class="col_auto_center col2">
          <span>x1</span>
        </div>
        <div class="col_auto_center col3">
          <span class="onePrice">1499</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col4">
          <span class="total_price">总价</span>
          <span class="payMode">微信支付</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">
          <span class="orderState">取消</span>
          <span class="orderDetail">订单详情</span>
        </div>
        <div class="divider"></div>
        <div class="col_auto_center col5">添加收藏</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test"
}
</script>

<style scoped>
.wrapper {
  background-color: white;
  height: 1000px;
  width: 900px;
  margin: auto;
}

.table_box {
  width: 800px;
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

.table_content {
  display: flex;
  height: 100px;
}

.col_auto_center{
  margin: auto;

}
.divider{
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
.orderState,.payMode,.total_price,.orderDetail,.onePrice{
  display: block;
  text-align: center;
  margin-bottom: 2px;
}
.onePrice{
  width: 50px;
}
</style>