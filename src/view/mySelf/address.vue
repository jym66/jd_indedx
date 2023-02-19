<template>
  <div class="wrapper" v-if="addressList">
    <div class="info">
      <button class="addAddress" @click="add_Address(0)">新增收货地址</button>
      您已经创建 <span class="Address-count">{{ addressList.length }}</span>个收货地址
    </div>
    <div class="AddressList">
      <div class="item" v-for="(i,index) in addressList" :key="index">
        <el-space direction="vertical" :size="5" alignment="flex-start">
          <div class="item-row">
            <el-space :size=20>
              <div class="name">{{ i.receiver }}</div>
              <div class="phone">{{ i.mobile }}</div>
              <div class="default" v-if="i.commonAddr === 1">默认</div>
            </el-space>
          </div>
          <div class="address-detail">
            {{ i.province }} {{ i.city }} {{ i.area }} {{ i.addr }}
          </div>
        </el-space>
        <span class="delete" @click="delAddress(i.addrId,index)" v-if="i.commonAddr !== 1">删除地址</span>
      </div>
    </div>
    <el-dialog class="dialog" v-model="isShowDiaLog" @close="dialog_close">
      <template v-slot:title>
        <div class="dialog-title">
          新增收件人信息
        </div>
      </template>
      <el-form ref="formRef" :model="userAddressModel" :rules="rules">
        <el-form-item label="收件人" prop="receiver">
          <el-input v-model="userAddressModel.receiver"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="userAddressModel.mobile"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="areaId">
          <div class="select">
            <el-select v-model="userAddressModel.provinceId" placeholder="请选择" @change="provinceChange">
              <el-option :label="item.areaName" :value="item.areaId" v-for="item in selectModelProvince"
                         :key="item"></el-option>
            </el-select>
            <el-select v-model="userAddressModel.cityId" placeholder="请选择" @change="CityChange" ref="selectCity">
              <el-option :label="item.areaName" :value="item.areaId" v-for="item in selectModelCity"
                         :key="item"></el-option>
            </el-select>
            <el-select ref="selectArea" v-model="userAddressModel.areaId" placeholder="请选择" @change="AreaChange">
              <el-option :label="item.areaName" :value="item.areaId" v-for="item in selectModelArea"
                         :key="item"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="addr">
          <el-input v-model="userAddressModel.addr"></el-input>
        </el-form-item>
        <div class="saveWrapper">
          <button class="save" @click="submit(formRef)">保存地址信息</button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {addAddress, deleteAdd, getAddressList, getCity} from "@//util/api";


export default {
  name: "address",
  setup() {
    let selectArea = ref(null)
    let selectCity = ref(null)
    let formRef = ref(null)
    let isShowDiaLog = ref(false)
    let addressList = ref([])
    //省
    let selectModelProvince = ref([])
    //市
    let selectModelCity = ref([])
    //区
    let selectModelArea = ref([])
    let userAddressModel = ref({
      "addr": "",
      "addrId": 0,
      "area": "",
      "areaId": '',
      "city": "",
      "cityId": '',
      "mobile": "",
      "postCode": "",
      "province": "",
      "provinceId": '',
      "receiver": ""
    })

    const rules = reactive({
      receiver: [
        {
          required: true,
          message: '请输入收件人信息！！',
          trigger: 'blur',
        },
      ],
      mobile: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur',
        },
      ],
      areaId: [
        {
          required: true,
          message: '请选择完整地址',
          trigger: 'blur',
        },
      ],
      addr: [
        {
          required: true,
          message: '请输入详细地址',
          trigger: 'blur',
        },
      ],
    })
    onMounted(() => {
      getAddressList().then((res) => {
        addressList.value = res.data
      })
    })

    const get_city = (pid) => {
      return getCity({
        pid: pid
      })
    }
    const provinceChange = (val) => {
      //修改省选项就把后两个重置
      selectCity.value.deleteSelected(event)
      selectArea.value.deleteSelected(event)
      //根据id找名字
      selectModelProvince.value.some(value => {
        if (value.areaId === val) {
          userAddressModel.value.province = value.areaName
          return true
        }
      })

      get_city(val).then((res) => {
        selectModelCity.value = res.data
      })
    }

    const CityChange = (val) => {
      if (val === '') return
      //修改城市选项就把区重置
      selectArea.value.deleteSelected(event)
      //根据传进来的val寻找市名字
      selectModelCity.value.some(value => {
        if (value.areaId === val) {
          userAddressModel.value.city = value.areaName
          return true
        }
      })
      get_city(val).then((res) => {
        selectModelArea.value = res.data
      })
    }

    const AreaChange = (val) => {
      selectModelArea.value.some(value => {
        if (value.areaId === val) {
          userAddressModel.value.area = value.areaName
          return true
        }
      })
    }
    const add_Address = (pid) => {
      isShowDiaLog.value = true
      get_city(pid).then((res) => {
        selectModelProvince.value = res.data
      })
    }
    const submit = (formEl) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          addAddress(userAddressModel.value).then((res) => {
            isShowDiaLog.value = false
            getAddressList().then((res) => {
              addressList.value = res.data
            })
          })
        } else {
          console.log("失败")
        }
      })
    }

    const delAddress = (id, index) => {
      //直接从数组里删除减少请求次数
      addressList.value.splice(index, 1)
      deleteAdd(id).then(res => {
        ElMessage({
          message: res.data,
          type: 'success',
          duration: 1500,
          customClass: 'element-error-message-zindex'
        })
      })
    }

    const dialog_close = () => {
      formRef.value.resetFields()
    }
    return {
      addressList,
      isShowDiaLog,
      add_Address,
      formRef,
      userAddressModel,
      selectModelProvince,
      selectModelCity,
      selectModelArea,
      provinceChange,
      CityChange,
      rules,
      submit,
      AreaChange,
      delAddress,
      dialog_close,
      selectCity,
      selectArea
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #ffffff;
  padding-bottom: 20px;
}

.info {
  padding: 10px;
}

.addAddress {
  border-radius: 2px;
  border: 0;
  color: white;
  background-color: #e1251b;
  margin-right: 10px;
  width: 110px;
  height: 30px;
}

.item {
  margin: 20px;
  border: 1px solid #eeeeee;
  padding: 15px 20px;
  /*height: 30px;*/
}

.item-row {
  display: flex;
  align-items: center;
}

.name, .phone {
  font-size: 12px;
  font-weight: 400;
  color: #000
}

.default {
  background-color: #e1251b;
  color: #fff;
  padding: 0 3px;
  border-radius: 2px;
}

.Address-count {
  color: #e1251b;
  margin: 0 2px 0 2px;
}

:deep(.el-dialog) {
  border: 4px solid rgba(0, 0, 0, .05);
  background-color: #ffffff;
  width: 500px;
  /*height: 310px;*/
}

.dialog-title {
  background-color: #f9f9f9;
  padding: 10px;
  height: 14px;
  line-height: 14px;
  color: #999;
  font-size: 14px;
}

:deep(.el-dialog__header) {
  padding: 0;
}

:deep(.el-dialog__headerbtn) {
  position: absolute;
  float: right;
  top: 5px;
  right: 5px;
}

:deep(.el-form-item__label) {
  color: #000;
  padding: 0;
  width: 80px;
  position: relative;
  text-align: left;
}

:deep(.el-input__inner) {
  width: 320px;
  height: 30px;
  border: 1px solid #eeeeee;
  padding: 5px;
  border-radius: 0;
}

.select {
  display: flex;
}

:deep(.el-select input) {
  width: 100px;
  height: 30px;
  margin-right: 10px;
}

.save {
  border: 0;
  width: 100px;
  height: 30px;
  background-color: #e1251b;
  color: #ffffff;
}

.saveWrapper {
  padding: 10px 0 0 20px
}

.delete {
  position: relative;
  float: right;
}
</style>