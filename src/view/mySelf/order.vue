<template>
  <div v-if="isLoading" v-loading="isLoading" v-loading.fullscreen.lock="true" element-loading-text="正在努力获取数据,请稍后"> 666</div>

  <div class="main-title">
    <div class="small-title">
      <el-row>
        <el-space :size=20>
          <div class="ordertoPay" v-for="(item,index) in Navs" :key="index" @click=getOrder(index)>{{
              item.title
            }}
          </div>
        </el-space>
      </el-row>
    </div>
    <div class="main-table" v-if="!isLoading">
      <el-row>
        <el-col :span="24">
          <div class="table-info">
            <div v-for="(item,index) in Navs" :key="item">
              <div v-if="activeTab === index">
                <el-space direction="vertical">
                  <div v-if="orderList.length===0" class="empty-box">
                    <el-row>
                      <i class="empty-icon"></i>
                      <div class="tips-info">
                        <h5>当前没有{{ Navs[index].title }}订单哦~</h5>
                      </div>
                    </el-row>
                  </div>
                  <div v-for="i in orderList" :key="i">
                    <div>
                      <orderTable :info=i>
                        <template v-slot:header-right>
                          <div class="header-right" v-if="item.right" @click="deleteOrder(i.orderNumber)">{{
                              item.right
                            }}
                          </div>
                        </template>
                        <template v-slot:opt>
                          <button class="opt" @click=item.click(i.orderNumber)>{{ Navs[index].opt }}</button>
                        </template>
                      </orderTable>
                    </div>
                  </div>
                  <el-pagination :page-count=pageCont v-model:currentPage="currentPage" layout="prev, pager, next"
                                 hide-on-single-page></el-pagination>
                </el-space>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
    let isLoading = ref(true)
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
        // isLoading = false
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
    const comments = (e) => {
      //  点击立即评价直接把订单号写入sessionStorage
      sessionStorage.setItem("orderNum", e)
      //  跳转评价页面
      router.push('/comments')
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
        opt: '立即评价',
        right: '删除',
        click: comments
      },
    ]
    let sileMenu = [
      {
        title: '订单中心',
        child: [
          '我的订单',
          '我的收藏',
          '评价晒单',
        ]
      },
      {
        title: '账户管理',
        child: [
          '账户信息',
          '收货地址',
          '修改密码',
        ]
      }
    ]
    onMounted(() => {
      myOrder({current: currentPage.value, size: pageSize.value, status: 0}).then(res => {
        orderList.value = res.data.records
        pageCont.value = res.data.pages
        isLoading.value = false
      })
    })
    const getOrder = (index) => {
      console.log("isLoading1")
      isLoading.value = true
      activeTab.value = index
      myOrder({
            current: currentPage.value,
            size: pageSize.value,
            status: index
          }
      ).then(res => {
        console.log("isLoading")
        isLoading.value = false
        orderList.value = res.data.records
        pageCont.value = res.data.pages
      })
    }
    const deleteOrder = (orderNumber) => {
      deleteOrders(orderNumber).then((res) => {
        getOrder(activeTab.value)
      })
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
      activeTab, orderList, Navs, getOrder, sileMenu, deleteOrder, currentPage, pageCont, comments,isLoading
    }
  }
}
</script>

<style scoped>


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
}

.main {
  background-color: #ffffff;
  margin: auto;
}

.small-title {
  padding: 20px 0 20px 20px;
}

table {
  border-collapse: collapse;
}

.table-info {
  padding-left: 20px;
}

.ordertoPay {
  cursor: pointer;
}

.empty-box {
  position: relative;
  width: 400px;
  margin: 110px auto 170px 370px;
  height: 136px;
}

.empty-icon {
  display: block;
  width: 150px;
  height: 150px;
  overflow: hidden;
  vertical-align: middle;
  background: url("https://misc.360buyimg.com/user/myjd/ordercenter/css/i/empty-icon05.png") no-repeat;
}

h5 {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
}

.tips-info {
  margin-top: 70px;
}

.header-right {
  position: relative;
  float: right;
  top: 5px;
  right: 10px;
  text-align: center;
}

.opt {
  padding: 5px 10px 5px 10px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
  color: #000;
}

.opt:hover {
  border: 1px solid #e1251b;
  color: #e1251b;
}
</style>
