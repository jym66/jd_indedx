<template>
  <!--  顶层广告牌-->
  <placeholder></placeholder>
  <div class="wrapper">
    <div class="w">
      <el-container>
        <el-aside width="100px">
          <div class="aside">
            <div v-for="item in sileMenu" :key="item">
              <el-space direction="vertical" :size=10>
                <h5>{{ item.title }}</h5>
                <div v-for="i in item.child" :key="i">
                  <button class="link" @click = to(i.url,i.title)>{{i.title}}</button>
                </div>
              </el-space>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-header>
            <div class="top-title">
              <div class="top-title-text">
                <h3>{{ title }}</h3>
              </div>
            </div>
          </el-header>
          <el-main>
            <div class="main">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {deleteOrders, myOrder, receiptOrder} from "@//util/api";
import orderTable from "@//view/order/orderTable";
import placeholder from "@//view/order/placeholder";
import router from "@//router";
export default {
  components: {
    orderTable,
    placeholder
  },
  setup() {
    let currentPage = ref(1);
    let pageSize = ref(5)
    let pageCont = ref(0);
    let activeTab = ref(0);
    let orderList = ref([])
    const receipt = (orderNumber) => {
      receiptOrder(orderNumber).then(() => {
        ElMessage({
          message: '收货成功！',
          type: 'success',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
        getOrder(activeTab.value)
      })
    }
    const tips = () => {
      ElMessage({
        message: '提醒成功,卖家将尽快发货',
        type: 'success',
        duration: 1500,
        customClass: 'element-error-message-zindex'
      })
    }
    let Navs = [
      {
        title: '全部订单',
        opt: '添加收藏',
        right: null,
        click: undefined
      },
      {
        title: '待付款',
        opt: '立即付款',
        right: null,
        click: undefined
      },
      {
        title: '待发货',
        opt: '提醒发货',
        right: null,
        click: tips
      },
      {
        title: '待收货',
        opt: '确认收货',
        right: null,
        click: receipt
      },
      {
        title: '待评价',
        opt: '立即评价',
        right: null,
        click: undefined
      },
      {
        title: '成功',
        opt: '再次购买',
        right: '删除',
        click: undefined
      },
    ]
    let title = ref("我的订单")
    let sileMenu = [
      {
        title: '订单中心',
        child: [
          {
            title: '我的订单',
            url: 'order'
          },
          {
            title: '我的收藏',
            url: 'order'
          }, {
            title: '评价晒单',
            url: 'order'
          },
        ]
      },
      {
        title: '账户管理',
        child: [
          {
            title: '账户信息',
            url: 'account'
          },
          {
            title: '收货地址',
            url: 'address'
          },
          {
            title: '修改密码',
            url: 'password'
          },
        ]
      }
    ]
    onMounted(() => {
      myOrder({current: currentPage.value, size: pageSize.value, status: 0}).then(res => {
        orderList.value = res.data.records
        pageCont.value = res.data.pages
      })
    })
    const getOrder = (index) => {
      activeTab.value = index
      myOrder({
            current: currentPage.value,
            size: pageSize.value,
            status: index
          }
      ).then(res => {
        orderList.value = res.data.records
        pageCont.value = res.data.pages
      })
    }
    const deleteOrder = (orderNumber) => {
      deleteOrders(orderNumber).then((res) => {
        getOrder(activeTab.value)
      })
    }
    const to = (link,titles)=>{
      router.push('/self/'+link)
      title.value = titles;
    }
    watch([currentPage, activeTab], ([newCurrentPage, newActiveTab], [oldPage, oldTab]) => {
      console.log(activeTab, newActiveTab)
      if (newActiveTab !== oldTab) {
        //说明切换标签了
        activeTab.value = newActiveTab
        currentPage.value = 1
      }
      if (oldPage !== newCurrentPage) {
        getOrder(activeTab.value)
      }
    })
    return {
      activeTab, orderList, Navs, getOrder, sileMenu, deleteOrder, currentPage, pageCont,title,to
    }
  }
}
</script>

<style scoped>

.wrapper{
  background-color: #f5f5f5;
}
.top-title {
  background-color: #ffffff;
  margin-bottom: 20px;
}


.top-title-text {
  width: 90px;
  position: relative;
  left: 20px;
  color: #666;
  text-align: left;
  line-height: 60px;
  margin-top: 10px;
}
.aside{
  margin-top: 10px;
}

.main {
  background-color: #ffffff;
  margin: 15px auto auto;
}


h5 {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
}
.link{
  border: 0;
  background-color: transparent;
  padding: 5px;
  color: #666;
}
.link:hover{
  color: #e4393c;
}
</style>