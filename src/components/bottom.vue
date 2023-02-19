<template>
  <div class="bottomWrapper">
    <div class="footer_service">
      <div class="w">
        <ul>
          <li v-for="(item) in service" :key="item">
            <h5 :class=item._class>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </li>
        </ul>
      </div>
    </div>
    <el-divider class="divider"></el-divider>

    <div class="footer_help">
      <div class="help_nav" v-for="item in help" :key="item">
        <ul>
          <li v-for="i in item" :key="i">
            <!--            ish5是判断是否用<h5>显示-->
            <h5 v-if="i.ish5">{{ i.text }}</h5>
            <a v-else href="javascript:void(0)">{{ i.text }}</a>
          </li>
        </ul>
      </div>
      <div class="help_nav2 fr">
        <h5>飞燕自营覆盖区县</h5>
        <p>飞燕已向全国2661个区县提供自营配送服务，支持货到付款、POS机刷卡和售后上门服务。</p>
      </div>
    </div>
    <el-divider class="w divider"></el-divider>

    <div class="w about">
      <ul>
        <li v-for="item in about" :key="item"><a href="javascript:void(0)">{{ item }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup() {
    let service = ref([
      {title: '多', content: '品类齐全，轻松购物', _class: 'service_duo'},
      {title: '快', content: '多仓直发，极速配送', _class: 'service_hao'},
      {title: '好', content: '正品行货，精致服务', _class: 'service_duo'},
      {title: '省', content: '天天低价，畅选无忧', _class: 'service_sheng'}
    ])
    let help = ref([
      [{id: 1, text: '购物指南', ish5: true},
        {id: 1, text: '购物流程', ish5: false},
        {id: 1, text: '会员介绍', ish5: false},
        {id: 1, text: '购物指南', ish5: false},
        {id: 1, text: '生活旅行', ish5: false},
        {id: 1, text: '常见问题', ish5: false},
        {id: 1, text: '大家电', ish5: false},
        {id: 1, text: '联系客服', ish5: false},],
      [
        {id: 1, text: '配送方式', ish5: true},
        {id: 1, text: '上门自提', ish5: false},
        {id: 1, text: '211限时达', ish5: false},
        {id: 1, text: '配送服务查询', ish5: false},
        {id: 1, text: '配送费收取标准', ish5: false},
        {id: 1, text: '海外配送', ish5: false},
      ],
      [
        {id: 1, text: '支付方式', ish5: true},
        {id: 1, text: '货到付款', ish5: false},
        {id: 1, text: '在线支付', ish5: false},
        {id: 1, text: '分期转账', ish5: false},
        {id: 1, text: '公司转账', ish5: false},
      ],
      [
        {id: 1, text: '售后政策', ish5: true},
        {id: 1, text: '价格保护', ish5: false},
        {id: 1, text: '退款说明', ish5: false},
        {id: 1, text: '返修/退换货', ish5: false},
        {id: 1, text: '取消订单', ish5: false},
      ],
      [
        {id: 1, text: '特色服务', ish5: true},
        {id: 1, text: '夺宝岛', ish5: false},
        {id: 1, text: 'DIY装机', ish5: false},
        {id: 1, text: '延保服务', ish5: false},
        {id: 1, text: '飞燕E卡', ish5: false},
        {id: 1, text: '飞燕通信', ish5: false},
        {id: 1, text: '京鱼座智能', ish5: false},
      ],
    ])
    let about = ref([
      '关于我们',
      '联系我们',
      '联系客服',
      '合作招商',
      '商家帮助',
      '营销中心',
      '手机飞燕',
      '友情链接',
      '销售联盟',
      '飞燕社区',
      '风险监测',
      '隐私政策',
      '飞燕公益',
      'English Site',
      'Media & IR'
    ])
    return {service, help, about}
  }
}
</script>

<style scoped>
.bottomWrapper {
  margin-bottom: 50px;
}

.footer_service {
  /*border-bottom: 1px solid #dedede;*/
  padding: 30px 0;
}

.w ul {
  display: flex;
  justify-content: space-around;
}

.w ul li {
  display: flex;
  margin: 10px 10px;
}

.w ul li p {
  font-weight: 700;
  font-size: 18px;
  line-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 8px;
}

.w ul li h5 {
  padding: 0 0 0 2px;
}

.service_duo {
  width: 36px;
  height: 42px;
  background: url("../assets/img/service.png") no-repeat 0 0;
  background-size: 113px 87px;
  text-indent: -999px;
  overflow: hidden;
}

.service_kuai {
  width: 36px;
  height: 42px;
  background: url("../assets/img/service.png") no-repeat -38.5px 0;;
  background-size: 113px 87px;
  text-indent: -999px;
  overflow: hidden;
}

.service_hao {
  width: 36px;
  height: 42px;
  background: url("../assets/img/service.png") no-repeat -77px 0;
  background-size: 113px 87px;
  text-indent: -999px;
  overflow: hidden;
}

.service_sheng {
  left: 0;
  width: 36px;
  height: 42px;
  background: url("../assets/img/service.png") no-repeat 0 -44.5px;
  background-size: 113px 87px;
  text-indent: -999px;
  overflow: hidden;
}

.footer_help {
  display: flex;
  width: 1194px;
  margin: auto;
  justify-content: space-around;
  /*border-bottom: 1px solid #dedede;*/
}

.help_nav {
}

.footer_help ul {
  line-height: 22px;
}

.help_nav2 {
  width: 200px;
  height: 150px;
  line-height: 20px;
}

.help_nav2 h5 {
  margin-top: 10px;
  text-align: center;
}

.about ul {
  display: flex;
  justify-content: center;
}


</style>
