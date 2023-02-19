<template xmlns:el-row="http://www.w3.org/1999/html">
  <div v-if="!detail" v-loading="true" v-loading.fullscreen.lock="true" element-loading-text="正在努力获取数据,请稍后"> 666</div>
  <div class="w aa" v-if="detail">
    <el-row>
      <el-col :span=11>
        <div class="left-box">
          <div class="left-img">
            <img style="width: 450px; height: 400px" :src="detail.pic" v-if="imgs.length === 0" alt=""/>
            <img style="width: 450px; height: 400px" :src=imgs[bottomImgs] v-if="imgs.length > 0" alt=""/>
          </div>
          <div class="left-bottom-box" v-if="imgs.length >0">
            <img style="width: 58px; height: 58px" :src=value v-for="(value,index) in imgs" :key="index"
                 :class="{'left-bottom-img':true,'imgActive':bottomImgs === index}" @mousemove="ImageEvent(index)" alt=""/>
          </div>
        </div>
      </el-col>
      <el-col :span=13>
        <el-space direction="vertical" :size=10 alignment="start">
          <el-row>
            <div class="name">{{ detail.prodName }}</div>
          </el-row>
          <el-row>
            <div class="des">
              {{ detail.brief }}
            </div>
          </el-row>
          <el-row>
            <div class="price_box">
              <el-space direction="vertical" alignment="start" :size="10">
                <div class="price-first">
                  <div class="title">价格</div>
                  <div class="price_content">
                    <span class="big_price">¥ {{ price }}</span>
                  </div>
                  <div class="old_price">
                    ¥{{ detail.oriPrice }}
                  </div>
                  <div class="first-box-right">
                    <span>剩余库存</span>
                    <div class="totalStocks">&nbsp;{{ selectStock }}</div>
                  </div>
                </div>
                <el-row>
                  <div class="coupons">
                    <el-space size="50">
                      <span>领劵</span>
                      <el-space size="20">
                        <el-tag class="ml-2" type="danger"
                                v-for="i in ['满400减50','满1000减300','关注公众号送50优惠券','满999999享2折']" :key="i">{{ i }}
                        </el-tag>
                      </el-space>
                    </el-space>
                  </div>
                </el-row>
                <el-row>
                  <div class="coupons">
                    <el-space size="50">
                      <span>邮费</span>
                      <el-space size="20">
                        <el-tag class="ml-2" type="danger" v-for="i in ['山东包邮','上海包邮','北京包邮','新疆包邮']" :key="i">{{ i }}
                        </el-tag>
                      </el-space>
                    </el-space>
                  </div>
                </el-row>
              </el-space>
            </div>
          </el-row>
          <el-row v-show="detail.skuList.length >0">
            <el-space direction="vertical" :size=10 alignment="start">
              <el-row v-for="(property, propertyIndex) in info" :key="propertyIndex">
                <div class="skuNameAndSku">
                  <p style="font-size: 13px" class="skuName">{{ tagName[propertyIndex] }}</p>
                  <div class="skuBox">
                    <button v-for="(attribute, attributeIndex) in property" :key="attributeIndex"
                            :class="{
                   'btn1':!attribute.isSelect,
                   'active': attribute.isSelect,
                   'disabled':attribute.isDisable,
                  }"
                            @click="selectSku(propertyIndex, attributeIndex)">
                      {{ attribute.text }}
                    </button>
                  </div>
                </div>
              </el-row>
            </el-space>
          </el-row>
          <el-row>
            <el-space :size="20">
              <p style="font-size: 13px">数量</p>
              <div>
                <button class="sub" @click="prodCount = prodCount-1">-</button>
                <input class="count" v-model="prodCount">
                <button class="add" @click="prodCount = prodCount+1">+</button>
              </div>
            </el-space>
          </el-row>
          <el-row>
            <div class="buyBox">
              <el-row>
                <el-space :size="20">
                  <button class="buyNow" @click="buyNow">
              <span style="color: #fff">
              立即购买
            </span>
                  </button>
                  <button class="addShoppingCat" @click="addCar">
              <span style="color: #e1251b">
              加入购物车
            </span>
                  </button>
                  <button class="collect">
              <span style="color: #e1251b">
              收藏商品
            </span>
                  </button>
                </el-space>
              </el-row>
            </div>
          </el-row>
        </el-space>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row>
          <div class="tab">
            <button ref="introduce" :class="{'introduce':true,'introduce_active':activeName==='introduce'}"
                    @click=" activeName= 'introduce'">商品介绍
            </button>
            <button :class="{'commit':true,'introduce_active':activeName==='commit'}"
                    @click="getCommit('commit_click')">商品评论
            </button>
          </div>
        </el-row>
        <el-row>
          <div class="small_title" v-if="activeName==='introduce'">商品介绍</div>
          <div class="small_title" v-if="activeName==='commit'">商品评论</div>
        </el-row>
        <!--        评论视图-->
        <div v-if="activeName==='commit'">
          <el-row>
            <el-space :size="30">
              <el-progress type="dashboard" :percentage="100" color="red" class="progress">
                <template #default="{ percentage }">
                  <div class="percentage-value">{{ percentage }}%</div>
                  <div class="percentage-label">好评率</div>
                </template>
              </el-progress>
              <div>
                <el-space size="10">
                <span v-for="i in tags" :key="i">
                  <el-tag :color="i.color">
                  <span style="color: white;font-weight: 400">
                      {{ i.title }}
                    </span>
                  </el-tag>
                </span>
                </el-space>
              </div>
            </el-space>
          </el-row>
          <el-row>
            <div class="small_title">
              <el-space size="10">
                <span>好评</span>
                <span>中评</span>
                <span>差评</span>
              </el-space>
            </div>
          </el-row>
          <el-row style="position: relative;top: 10px"
                  v-for="(item,index) in commits"
                  :key="item">
            <el-col :span="5">
              <el-space :size="30">
                <el-avatar :size="45"
                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                </el-avatar>
                <span>
                {{ item.nickName }}
              </span>
              </el-space>
            </el-col>
            <el-col :span="19">
              <el-space direction="vertical" alignment="start" :size="15">
                <el-row>
                  <el-rate :model-value="item.score" disabled show-score text-color="#ff9900"></el-rate>
                </el-row>
                <el-row>
                  <el-space direction="vertical" alignment="start">
                    <p style="font-size: 15px">{{ item.content }}</p>
                    <div v-if="item.pics">
                      <el-image v-for="i in item.pics.split(',')" :key="i" :src="i"
                                style="width: 100px;height: 100px"></el-image>
                    </div>
                  </el-space>
                </el-row>
                <el-row>
                  <!--                  店家回复-->
                  <span v-if="item.replyContent" style="font-size: 13px">掌柜回复:&nbsp;{{ item.replyContent }}</span>
                  <span> {{ item.recTime }}</span>

                </el-row>
              </el-space>
            </el-col>
            <el-divider v-if="index !== commits.length-1"></el-divider>
          </el-row>
          <el-pagination :page-count=totalPage v-model:currentPage="currentPage" layout="prev, pager, next"
                         v-if="pageShow">
          </el-pagination>
        </div>
        <div v-if="activeName==='introduce'">
          <div v-html="detail.content"></div>
        </div>
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>
  </div>
</template>

<script>

import {nextTick, onMounted, reactive, ref, watch} from "vue";
// import {ElMessage} from "element-plus";
import {changeItem, prodComm, prodCommPageByProd, prodInfo} from "@/util/api";
import router from "@/router";
import store from "@/store";

export default {
  name: "detail",
  props: {
    prodId: String
  },
  setup(props) {
    //控制分页器渲染 要不然页数不刷新
    let pageShow = ref(false)
    //评论页数
    let totalPage = ref(1)
    //每页数据大小
    let pageSize = ref(10)
    //当前页数
    let currentPage = ref(1)
    //判断评论是否加载 按需加载
    let commitSymbol = ref(false)
    //底部图片索引
    let bottomImgs = ref(0)
    let tags = [
      {
        title: '实惠优选',
        color: '#2d8cf8'
      },
      {
        title: '极致轻薄',
        color: '#19be6b'
      },
      {
        title: '质量没话说',
        color: '#ed3f14'
      },
      {
        title: '比定做还合适',
        color: '#f90'
      },
      {
        title: '完美品质',
        color: '#2d8cf8'
      },
      {
        title: '正品行货',
        color: '#19be6b'
      },
      {
        title: '包装有档次',
        color: '#ed3f14'
      },
      {
        title: '已经买第二个',
        color: '#f90'
      },
    ]
    let activeName = ref('introduce')
    let prodCount = ref(0) // 商品数量
    let detail = ref()
    let price = ref()
    let SkuList = ref()
    let properties = ref([])
    let selected = ref([]) // 当前已选的 attribute 列表
    let selectStock = ref() // 选择规格剩余库存数
    let selectInfo = ref(); // 已选择的商品信息对象直接传到下单页面
    let propertiesCount = 0
    let info = ref([])
    let tagName = []
    //评论数(添加直接用push 缓存)
    let commits = ref([])
    //图片数组（大图片下边的那个图片）
    let imgs = ref([])
    onMounted(() => {
      prodInfo({prodId: props.prodId}).then((response) => {
        //初始化数据
        detail.value = response.data
        SkuList.value = response.data.skuList
        // propsList.value = SkuList.value[0].properties.split(';')
        price.value = response.data.price
        selectStock.value = response.data.totalStocks
        propertiesCount = SkuList.value[0].skuName.trim().split(" ").length
        for (let i = 0; i < propertiesCount; i++) {
          //利用set去重
          let temp = []
          SkuList.value.forEach((value) => {
            //每一项都不等于新加都项 就说明没有重复的
            if (temp.every(item => item.text !== value.skuName.trim().split(" ")[i])) {
              temp.push({
                text: value.skuName.trim().split(" ")[i],
                isDisable: false,
                order: i,
                isSelect: false,
                isForeverDisable: false
              })
            }
          })
          info.value.push(temp)
        }
        if (info.value.length === 1) {
          SkuList.value.forEach(value => {
            info.value[0].forEach(item => {
              console.log(value.skuName, item.text)
              if (value.skuName.trim() === item.text.trim() && value.stocks === 0) {
                item.isDisable = true
                item.isForeverDisable = true
              }
            })
          })
        }
        SkuList.value[0].properties.split(";").forEach(value => tagName.push(value.split(":")[0]))
        for (let i = 0; i < tagName.length; i++) {
          //初始化数组
          selected.value.push(-1)
        }
        if (response.data.imgs !== "") {
          imgs.value = detail.value.imgs.split(",")
        }
      })

    })
    const showPriceAndStock = (prodNames) => {
      SkuList.value.forEach(item => {
        if (item.skuName.trim() === prodNames) {
          selectStock.value = item.stocks
          price.value = item.price
        }
      })
    }
    const reset = () => {
      //  重置状态
      console.log(selected.value.length)
      info.value.forEach(value => {
        value.forEach(item => {
          item.isDisable = false
          item.isForeverDisable = false
        })
      })
    }
    const doExchange = (doubleArrays, pre) => {
      const len = doubleArrays.length;
      if (len >= 2) {
        let i;
        const len1 = doubleArrays[0].length;
        const len2 = doubleArrays[1].length;
        const newLen = len1 * len2;
        const temp = new Array(newLen);
        let index = 0;
        for (i = 0; i < len1; i++) {
          for (let j = 0; j < len2; j++) {
            //排序的数组
            let orderArray = []
            let tempSkuName = ""
            orderArray.push(doubleArrays[0][i])
            orderArray.push(doubleArrays[1][j])
            orderArray.push(pre)
            orderArray.sort((a, b) => a.order < b.order ? -1 : 1)
            //里面存放的是响应式对象
            orderArray.forEach(value => {
              tempSkuName += value.text + " "
            })
            SkuList.value.forEach(value4 => {
              if (value4.skuName === tempSkuName && value4.stocks === 0) {
                orderArray.forEach(value => {
                  value.isDisable = true
                  value.isForeverDisable = true
                })
                tempSkuName = ""
                console.log(tempSkuName, "tempSkuName")
              }
            })
            temp[index] = doubleArrays[0][i].text + " " + doubleArrays[1][j].text;
            console.log(orderArray.join(' '), "orderArray")
            index++;
          }
        }
        const newArray = new Array(len - 1);
        for (i = 2; i < len; i++) {
          newArray[i - 1] = doubleArrays[i];
        }
        newArray[0] = temp;
        return doExchange(newArray);
      } else {
        return doubleArrays[0];
      }
    }
    const selectSku = (index, selectIndex) => {
      info.value[index][selectIndex].isSelect = !info.value[index][selectIndex].isSelect
      if (info.value.length === 1) {
        //重复代码记得抽出来变成函数
        info.value[index].forEach((value, index1) => {
          //禁用除了选中之外的同行按钮
          if (index1 !== selectIndex && value.isForeverDisable === false) {
            value.isDisable = !value.isDisable
          }
        })
        if (info.value[index][selectIndex].isSelect === true) {
          selected.value.splice(index, 1, info.value[index][selectIndex].text)
        } else {
          selected.value.splice(index, 1, -1)
        }
        if (selected.value.length === tagName.length) {
          showPriceAndStock(selected.value.join(" "))
        }
        console.log(selected.value)
        return;
      }
      if (info.value[index][selectIndex].isDisable) {
        // resetInfo()
        console.log("无法点击！！")
        return
      }
      //  index代表的是sku二维数组里的第index个数据
      //  selectIndex代表的是选择了第index数组里的第几个数据
      //创建一个新数组，把除了当前选中行之外的加入进去
      let params = []
      //  第一步 先把同一行的按钮全部禁用
      info.value[index].forEach((value, index1) => {
        //禁用除了选中之外的同行按钮
        if (index1 !== selectIndex && value.isForeverDisable === false) {
          value.isDisable = !value.isDisable
        }
      })
      //插入不同行元素
      info.value.forEach((value, index3) => {
        if (index3 !== index) {
          params.push(info.value[index3])
        }
      })
      //  第二步开始暴力匹配
      // console.log(params)
      if (params.length > 1) {
        doExchange(params, info.value[index][selectIndex])
      } else {
        info.value.forEach((item, index11) => {
          if (index !== index11) {
            item.forEach(value11 => {
              let orderArray = []
              let tempSkuName = ""
              orderArray.push(value11)
              orderArray.push(info.value[index][selectIndex])
              orderArray.sort((a, b) => a.order < b.order ? -1 : 1)
              orderArray.forEach(value22 => {
                tempSkuName += value22.text + " "
              })
              SkuList.value.forEach(value4 => {
                if (value4.skuName === tempSkuName && value4.stocks === 0) {
                  orderArray.forEach(value => {
                    value.isDisable = true
                    value.isForeverDisable = true
                  })
                }
              })
            })
          }
        })
      }
      info.value[index][selectIndex].isDisable = false
      if (info.value[index][selectIndex].isSelect === true) {
        selected.value.splice(index, 1, info.value[index][selectIndex].text)
      } else {
        console.log("取消选中")
        selected.value.splice(index, 1, -1)
      }
      if (selected.value.every(item => item === -1)) {
        reset()
      }
      if (selected.value.length === tagName.length) {
        showPriceAndStock(selected.value.join(" "))
      }
      console.log(selected.value, "selected")
      console.log(selectStock.value)
    }
    const isSelectAll = () => {
      //  是否选择完整规格
      if (selected.value.some(item => item === -1) || selected.value.length < tagName.length) {
        ElMessage.closeAll()
        ElMessage({
          message: '请选择完整规格!',
          type: "error",
        })
        return false
      }
      return true
    }
    const buyNow = () => {
      if (!isSelectAll()) return
      //跳转订单详情页面
      SkuList.value.some(value => {
        console.log(value)
        if (value.skuName.trim() === selected.value.join(" ")) {
          selectInfo.value = {
            prodCount: prodCount.value,
            prodId: detail.value.prodId,
            shopId: detail.value.shopId,
            skuId: value.skuId,
          }
          store.setSelectInfo(selectInfo.value)
          return true
        }
      })
      router.push('/confirmOrder')
    }
    const addCar = () => {
      if (!isSelectAll()) return
      let addCarProd = {}
      SkuList.value.some(value => {
        console.log(value)
        if (value.skuName.trim() === selected.value.join(" ")) {
          addCarProd = {
            basketId: 0,
            count: prodCount.value,
            prodId: detail.value.prodId,
            shopId: detail.value.shopId,
            skuId: value.skuId,
          }
          return true
        }
      })

      changeItem(addCarProd).then(res => {
        ElMessage({
          message: '添加购物车成功',
          type: 'success',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
      })
    }
    const getCommit = (referer) => {
      //只作用在第一页
      if (referer === 'commit_click') {
        activeName.value = 'commit'
        if (commitSymbol.value) {
          return
        }
      }
      prodCommPageByProd({
        prodId: props.prodId,
        evaluate: -1,
        current: currentPage.value,
        size: pageSize.value
      }).then((response) => {
        nextTick(() => {
          pageShow.value = true
        })
        totalPage.value = response.data.pages
        commitSymbol.value = true
        commits.value = response.data.records

      })
    }
    watch([prodCount, selectStock, currentPage], ([newProdCount, newSelectStock, newCurrentPage], [oldProdCount, oldSelectStock, oldCurrentPage]) => {
      console.log(newCurrentPage, '页数切换');
      //购物数量框逻辑
      if (newProdCount < 1) {
        if (selectStock.value === 0) {
          prodCount.value = 0
          return
        }
        prodCount.value = 1
      }

      //newSelectStock 是为了触发watch
      if (newProdCount > selectStock.value || oldProdCount.value > selectStock.value) {
        prodCount.value = selectStock.value
      }
      //  评论页面切换逻辑(先判断是否是页数切换)
      if (currentPage.value !== oldCurrentPage) {
        getCommit('watch')
      }

    })
    const ImageEvent = (index) => {
      console.log(1)
      console.log(bottomImgs)
      // console.log(imgs.value)
      bottomImgs.value = index

    }
    return {
      ImageEvent,
      // canAttributeSelect,
      properties,
      // handleClickAttribute,
      detail,
      price,
      selectStock,
      buyNow,
      prodCount,
      activeName,
      tags,
      commitSymbol,
      commits,
      getCommit,
      totalPage,
      currentPage,
      pageShow,
      pageSize,
      addCar,
      selectSku,
      info, tagName, imgs, bottomImgs
    }
  },
}
</script>

<style scoped>


.name {
  margin-top: 10px;
  font-size: 20px;
  line-height: 28px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
}


.price_box {
  background-color: #f9f9f9;
  padding: 10px 0 10px 15px;
}

.price_content {
  display: flex;
  line-height: 30px;
  font-size: 18px;
  margin-left: 30px;
}

.big_price {
  color: #e1215b;
  font-size: 25px;
  line-height: 19px;
}

.old_price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 10px;


}

.totalStocks {
  font-weight: 700;
  width: 30px;
}

.active {
  /*width: 100px;*/
  /*height: 32px;*/
  border-radius: 3px;
  background-color: #579ff8;
  border: 1px solid rgb(160, 207, 255);
  color: white;
  margin: 0 10px 10px 2px;
  padding: 10px 20px 10px 20px;
}

.disabled {
  opacity: 0.5;
  border-color: #e0e0e0;
  color: #999999;
  cursor: not-allowed;
  pointer-events: none;
}

.btn1 {
  border-radius: 3px;
  background-color: #edf5fe;
  border: 1px solid rgb(160, 207, 255);
  color: #579ff8;
  margin: 0 10px 10px 2px;
  padding: 10px 20px 10px 20px;
}

.btn1:hover {
  background-color: #73aff9;
  color: white;
}

.buyBox {
  position: relative;
}

.buyNow {
  width: 164px;
  height: 48px;
  background-color: #cf3a2b;
  border: 0;
}

.addShoppingCat {
  width: 164px;
  height: 48px;
  background-color: #ffdedf;
  border: 1px solid #cf3a2b;
}

.collect {
  width: 164px;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid #ddd;
}

.add, .sub {
  width: 30px;
  height: 30px;
  background-color: #e9e9e9;
  border: 0;
  color: #999;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
}

.count {
  border: 0;
  width: 60px;
  height: 30px;
  outline: none;
  text-align: center;
  font-weight: 700;
}

.commit, .introduce {
  width: 100px;
  border: 0;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  font-weight: 700;
  color: black;
  background-color: #f9f9f9;
  box-shadow: none;

}


.tab {
  width: 100%;
  background: #f9f9f9;
  border: 1px solid;
  border-color: #eee #eee #e1251b;
  margin-top: 50px;
}

.introduce_active {
  background-color: #e1251b;
  color: white;
}

.small_title {
  position: relative;
  padding-left: 10px;
  width: 100%;
  color: #666;
  line-height: 30px;
  background: #f9f9f9;
  border: 1px solid #eee;
  margin-top: 20px;
  font-size: 15px;
  font-weight: 700;
}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.progress {
  position: relative;
  margin-top: 10px;
  left: 10px;
}

:deep(.el-rate__icon) {
  font-size: 25px;
}

:deep(.el-pagination) {
  position: relative;
  float: right;
}

.price-first {
  display: flex;

  /*background-color: red;*/
}

.first-box-right {
  display: flex;
  padding-left: 130px;
  padding-right: 170px;
}

.skuBox {
  display: flex;
  width: 500px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.skuName {
  line-height: 13px;
  margin: 15px 13px 0 0;
}

.skuNameAndSku {
  display: flex;
}

.left-img {
  margin-top: 10px;
  margin-bottom: 10px;
}

.left-bottom-box {
  width: 465px;
  display: flex;
  justify-content: space-around;
}

.left-bottom-img {
  margin-right: 13px;
  border: 2px solid #fff;;
}

.imgActive {
  border: 2px solid #e1251b;
}
</style>
