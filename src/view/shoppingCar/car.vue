<template>
  <div class="wrapper">
    <div class="w">

      <order_header title="购物车" timeLine="1"></order_header>
      <div v-if="infos.length ===0">
        <el-empty description="购物车空空的哦~，去看看心仪的商品吧~">
          <button class="toIndex" @click="toIndex">跳转首页</button>
        </el-empty>
      </div>
      <div v-if="infos.length >0">
        <div class="info">
          <div v-if="infos.length > 0">
            <div class="small_title">
              <div class="small_title_text prodName">商品名称</div>
              <div class="small_title_text">单价</div>
              <div class="small_title_text">运费</div>
              <div class="small_title_text">商品数量</div>
              <div class="small_title_text">总价</div>
            </div>
            <order_info v-for="(i,index) in infos" :key="index" :info=i :class={item_active:controller_select[index]}>
              <template v-slot:header>
                <div class="checkboxWrapper" @click="selectItem(index,i['basketId'])">
                  <div :class={checkbox:true,active:controller_select[index]}>
                    <i class="iconfont icon-duihao duihao" v-if="controller_select[index]"></i>
                  </div>
                </div>
              </template>
              <template v-slot:prod_count>
                <el-input-number v-model="i.prodCount"
                                 @change="(currentValue, oldValue)=>changeCar(i,index,currentValue, oldValue)">

                </el-input-number>
              </template>
              <template v-slot:transplant>
                结算时显示
              </template>
            </order_info>
          </div>

        </div>
        <div class="cart_bottom">
          <div class="bottom_left">
            <el-space :size="20">
              <div class="all" @click="select_all" v-if="!isSelectAll">&nbsp;&nbsp;全选</div>
              <div class="all" @click="cancelSelect_all" v-if="isSelectAll">取消全选</div>
              <div class="delprod" @click="deleteShoppingCarSelectItem">删除选中商品</div>
            </el-space>
          </div>
          <div class="bottom_right">
            <el-space :size="30">
              <div>已选
                <span style="color: #e1251b">{{ select.size }}</span>
                件商品
              </div>
              <div class="price_box">
                <div class="total_price">
                  <span>总价：&nbsp;</span>
                  <span class="total_price_text">
                ¥{{ total_price }}
              </span>
                </div>
              </div>
              <button class="submit" @click="confirmOrder">结算</button>
            </el-space>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import order_header from "@//view/order/order_header";
import order_info from "@//view/order/order_info";
import {onMounted, ref, watch} from "vue";
import {changeItem, deleteItem, getCar, getCarPrice} from "@//util/api";
import router from "@//router";
import store from "@//store";

export default {
  name: "car",
  components: {
    order_header,
    order_info
  },

  setup() {
    let total_price = ref(0)
    let infos = ref([])
    let select = ref(new Set())
    //控制选择框
    let isSelectAll = ref(false)
    let controller_select = ref([])
    let selectItem = (index, basketId) => {
      controller_select.value[index] = !controller_select.value[index]
      if (select.value.has(basketId)) {
        select.value.delete(basketId)
      } else {
        select.value.add(basketId)
      }
      isSelectAll.value = !!controller_select.value.every(value => {
        return value === true
      });
      getCarTotalPrice()
    }
    const getCarTotalPrice = () => {
      getCarPrice(Array.from(select.value)).then(res => {
        total_price.value = res.data['totalMoney']
      })
    }
    const cancelSelect_all = () => {
      controller_select.value.forEach((values, index) => {
        controller_select.value[index] = false
      })
      isSelectAll.value = false
      select.value.clear()
    }
    const select_all = () => {
      controller_select.value.forEach((values, index) => {
        controller_select.value[index] = true
        select.value.add(infos.value[index].basketId)
      })
      isSelectAll.value = true
      getCarTotalPrice()
    }
    const changeCar = (info, index, currentValue, oldValue) => {
      let count = currentValue > oldValue ? 1 : -1
      changeItem({
        //一次增加一个
        count: count,
        prodId: info['prodId'],
        skuId: info['skuId'],
        shopId: info['shopId']
      }).then(res => {
        if (controller_select.value[index]) {
          getCarTotalPrice()
        }
      })
    }
    const deleteShoppingCarSelectItem = () => {
      deleteItem(Array.from(select.value)).then(res => {
        getCarInfo()
      })
    }
    const getCarInfo = () => {

      //获取购物车信息
      getCar({}).then(res => {
        //清空
        infos.value = []
        res.data[0]['shopCartItemDiscounts'][0]['shopCartItems'].forEach(value => {
          infos.value.push(value)
          //初始化所有都不选中
          controller_select.value.push(false)
          console.log(value)
        })
      })
    }
    const toIndex = () => {
      router.push('/')
    }

    const confirmOrder = () => {
      if (select.value.size ===0) {
        ElMessage({
          message: '请选择至少一件商品',
          type: 'error',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
        return
      }
      let orderInfos = []
      //  先获取选择项目
      controller_select.value.forEach((value, index) => {
        if (value) {
          orderInfos.push(infos.value[index].basketId)
        }
      })
      orderInfos.forEach(value => console.log(value))
      //放到store里
      store.setSelectInfo(orderInfos)
      //设置从购物车下单
      store.setIsCar(true)
      router.push('/confirmOrder')
    }
    onMounted(() => {
      getCarInfo()
    })

    return {
      infos,
      select,
      selectItem,
      controller_select,
      select_all,
      cancelSelect_all,
      isSelectAll,
      total_price,
      changeCar,
      deleteShoppingCarSelectItem,
      toIndex,
      confirmOrder
    }

  }

}
</script>

<style scoped>
.wrapper {
  background-color: #f9f9f9;
  padding-bottom: 20px;
}

.checkboxWrapper {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;

}

.active {
  background-color: #409eff;
}

.duihao {
  font-size: 14px;
  margin-top: 1px;
  color: white;
}

.item_active {
  background-color: #fffcf8;
}

.info {
  margin-top: 20px;
}

.cart_bottom {
  height: 50px;
  margin-top: 30px;
  align-items: center;
  border: 1px solid #eee;
  display: flex;
}

.bottom_left {
  display: flex;
  flex: 1;
}

.all, .delprod {
  cursor: pointer;
  margin-left: 10px;
}

.delprod:hover {
  color: #e1251b;
}

.bottom_right {
  position: relative;
  display: flex;
}

.total_price {
  line-height: 1px;
}

.total_price_text {
  font-size: 16px;
  color: #e1251b;
  font-family: Verdana, serif;
  font-weight: 700;
  display: inline-block;
  vertical-align: top;
}

.submit {
  border: 0;
  height: 40px;
  width: 100px;
  background-color: #e1251b;
  color: white;
}

.small_title {
  height: 30px;
  background-color: #eee;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
}

.small_title_text {
  margin: auto;
}

.prodName {
  padding-right: 200px;
}

.toIndex {
  border: 0;
  border-radius: 3px;
  width: 100px;
  height: 30px;
  color: #ffffff;
  background-color: #e1251b;
}
</style>