<template>
  <div class="title">
    <el-row>
      <el-col :span="15">
        <div class="order_title">{{ title }}</div>
      </el-col>
      <el-col :span="9">
        <el-steps :space="200" :active="timeLine" finish-status="success">
          <el-step title="选择购买商品"></el-step>
          <el-step title="确认订单信息"></el-step>
          <el-step title="支付完成订单"></el-step>
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "order_header",
  props: {
    title: String,
    timeLine: Number
  }
}
</script>

<style scoped>
.title {
  width: 100%;
  margin-top: 10px;
  border-bottom: 2px solid #e1251b;
}

.order_title {
  position: relative;
  font-size: 20px;
  font-weight: 600;
  bottom: 10px;
  margin: 10px 20px 0 20px
}
</style>