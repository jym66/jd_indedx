<template>
  <placeholder></placeholder>
  <div class="w" v-if="isShow">
    <div class="top-box">
      <div class="title">商品评分</div>
      <el-rate size="large" v-model="commentInfo.score"></el-rate>
      <span class="text">{{ commentInfo.score }}分</span>
    </div>
    <div class="centerBox">
      <div class="left-box">
        <div class="ImageBox">
          <img :src=orderDetail.orderItemDtos[0].pic
               alt="" style="height: 100px;width: 100px">
        </div>
        <div class="prodName">{{ orderDetail.orderItemDtos[0].prodName }}</div>
        <div class="prodPrice">¥ {{ orderDetail.orderItemDtos[0].price }}</div>
      </div>
      <div class="divider"></div>
      <div class="right-box">
        <div class="right-box-top">
          <div class="pingjia">评价晒单</div>
          <div class="f-textarea">
            <textarea placeholder="分享体验心得，给万千想买的人一个参考!" v-model="commentInfo.content"></textarea>
          </div>
        </div>
        <div class="upload">
          <el-upload
              action="upload/"
              list-type="picture-card"
              :on-success="success"
              :on-error="error"
              :file-list="fileList">
            <template #default>
              <div class="upload-png-text">
                上传图片
              </div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <button class="submit" @click="submit">发表评论</button>
    </div>
  </div>
  <div v-if="!isShow" v-loading="true" v-loading.fullscreen.lock="true" element-loading-text="正在努力获取数据,请稍后"> 666</div>
</template>

<script>
import placeholder from "@//view/order/placeholder";
import {onMounted, reactive, ref} from "vue";
import {orderDetailApi, prodComm} from "@//util/api";

export default {
  name: "comment",
  components: {
    placeholder
  },
  setup() {
    let isShow = ref(false)
    let orderDetail = ref()
    let result = []
    let commentInfo = reactive({
      content: "",
      evaluate: 0,
      isAnonymous: 0,
      orderItemId: "",
      pics: "",
      prodId: "",
      score: 0
    })
    onMounted(() => {
      let orderNum = sessionStorage.getItem("orderNum")
      console.log(orderNum)
      if (orderNum === null) {
        console.log("参数错误！！")
        // isShow.value = false
        return
      }
      orderDetailApi({
        orderNumber: orderNum
      }).then(res => {
        isShow.value = true
        orderDetail.value = res.data
        commentInfo.prodId = orderDetail.value.orderItemDtos[0].prodId
        commentInfo.orderItemId = sessionStorage.getItem("orderNum")

      })
    })
    let fileList = ref([])
    const success = (res) => {
      fileList.value.push({
        name: res,
        url: "http://996gg.xyz/" + res
      })
      result.push("http://996gg.xyz/" + res)
      commentInfo.pics = result.join(",")
      console.log(result.join(","))
    }
    const error = () => {
      ElMessage({
        message: "上传失败请重试",
        type: 'error',
        duration: 1500,
        customClass: 'element-error-message-zindex'
      })
    }
    const submit = () => {
      if (commentInfo.score === 0) {
        ElMessage({
          message: "请给商品评分哦！",
          type: 'error',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
        return
      }
      if (commentInfo.content === "") {
        ElMessage({
          message: "请填写商品评价哦!",
          type: 'error',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
        return;
      }
      prodComm(commentInfo).then(res => {
        ElMessage({
          message: "评论成功!",
          type: 'success',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
      })
      // console.log(commentInfo)
    }
    return {commentInfo, success, fileList, isShow, orderDetail, error, submit}
  }

}
</script>

<style scoped>
.title {
  padding-right: 10px;
  font-size: 18px;
  font-weight: 700;
  color: black;
}

.top-box {
  display: flex;
  height: 110px;
  background-color: #ffffff;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

:deep(.el-rate__icon) {
  font-size: 35px;
}

.text {
  color: red;
  font-size: 15px;
  padding-left: 10px;
}

.centerBox {
  display: flex;
  height: 345px;
  background-color: #ffffff;
}

.left-box {
  display: flex;
  width: 345px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.divider {
  height: 100%;
  border: 1px solid #f5f5f5;
}

.prodName, .prodPrice {
  margin-top: 10px;
  font-size: 14px;
}

.prodName {
  width: 280px;
}

.prodPrice {
  font-family: verdana, serif;
  color: #e1251b;
}

.right-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
}

.right-box-top {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pingjia {
  flex: 1;
  position: relative;
  margin-bottom: 120px;
  margin-left: 50px;
  font-size: 15px;
  font-weight: 600;
}

.f-textarea {
  height: 120px;
  width: 500px;
  padding-bottom: 20px;
  margin-left: 20px;
  border: 1px solid #e0e0e0;
}

textarea {
  outline: none;
  text-shadow: none;
  resize: none;
  width: 95%;
  height: 100%;
  border: medium none;
  margin: 10px;
}

:deep(.el-upload--picture-card) {
  width: 50px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c0ccda;
}

:deep(.el-upload-list__item) {
  width: 50px;
  height: 50px;
  border-radius: 0;
  border: 1px solid #c0ccda;

}

.upload {
  display: flex;
  /*border: 1px solid red;*/
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-left: 130px;
}

.img-item {
  width: 50px;
  height: 50px;
}


.bottom-box {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  background-color: #ffffff;
  /*height: 70px;*/
}

.submit {
  width: 220px;
  height: 48px;
  line-height: 48px;
  padding: 0;
  font-size: 18px;
  margin: 10px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  border-radius: 3px;
  background-color: #df3033;
  border: 0;
}

.upload-png-text {
  font-size: 17px;
  color: black;
}
</style>
