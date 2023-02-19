<template>
  <div class="root">
    <p>商品多规格选择示例2.0</p>
    <div v-for="(property, propertyIndex) in properties" :key="propertyIndex">
      <p>{{ property.name }}</p>
      <div class="sku-box-area">
        <template v-for="(attribute, attributeIndex) in property.attributes" :key="attributeIndex">
          <div

              :class="[
              'sku-box',
              'sku-text',
              attribute.isActive ? 'active' : '',
              attribute.isDisabled ? 'disabled' : '',
            ]"
              @click="handleClickAttribute(propertyIndex, attributeIndex)">
            {{ attribute.value }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkuSelector2",
  components: {},
  computed: {},
  data() {
    return {
      properties: [], // property 列表
      skuList: [], // sku 列表
      matrix: [], // 邻接矩阵存储无向图
      vertexList: [], // 顶点数组
      selected: [], // 当前已选的 attribute 列表
    };
  },
  mounted() {
    this.properties = [
      {
        name: '版本',
        attributes: [
          {value: '换修无忧版', isActive: false, isDisabled: false},
          {value: '原厂延保版', isActive: false, isDisabled: false},
          {value: '公开版', isActive: false, isDisabled: false}
        ]
      },
      {
        name: '颜色',
        attributes: [
          {value: '深空灰色', isActive: false, isDisabled: false},
          {value: '银色', isActive: false, isDisabled: false},
          {value: '金色', isActive: false, isDisabled: false}
        ]
      },
      {
        name: '内存',
        attributes: [
          {value: '64GB', isActive: false, isDisabled: false},
          {value: '256GB', isActive: false, isDisabled: false},
          {value: '512GB', isActive: false, isDisabled: false}
        ]
      }
    ]
    this.skuList = [{attributes: ['换修无忧版', '深空灰色', '64GB']},
      {attributes: ['公开版', '银色', '64GB']},
      {attributes: ['换修无忧版', '银色', '64GB']},
      {attributes: ['原厂延保版', '银色', '64GB']},
      {attributes: ['公开版', '金色', '256GB']},

    ]


    this.initEmptyAdjMatrix();
    this.setAdjMatrixValue();
  },
  methods: {
    // 当点击某个 attribute 时，如：黑色
    handleClickAttribute(propertyIndex, attributeIndex) {
      const attr = this.properties[propertyIndex].attributes[attributeIndex];
      // 若选项置灰，直接返回，表现为点击无响应
      if (attr.isDisabled) {
        return;
      }

      // 重置每个 attribute 的 isActive 状态
      const isActive = !attr.isActive;
      this.properties[propertyIndex].attributes[attributeIndex].isActive =
          isActive;
      if (isActive) {
        this.properties[propertyIndex].attributes.forEach((attr, index) => {
          if (index !== attributeIndex) {
            attr.isActive = false;
          }
        });
      }

      // 维护当前已选的 attribute 列表
      this.selected = [];
      this.properties.forEach((prop) => {
        prop.attributes.forEach((attr) => {
          if (attr.isActive) {
            this.selected.push(attr.value);
          }
        });
      });

      // 重置每个 attribute 的 isDisabled 状态
      this.properties.forEach((prop) => {
        prop.attributes.forEach((attr) => {
          attr.isDisabled = !this.canAttributeSelect(attr);
        });
      });
    },

    // 构造初始空邻接矩阵存储无向图
    initEmptyAdjMatrix() {
      this.properties.forEach((prop) => {
        prop.attributes.forEach((attr) => {
          this.vertexList.push(attr.value);
        });
      });
      for (let i = 0; i < this.vertexList.length; i++) {
        this.matrix[i] = new Array(this.vertexList.length).fill(0);
      }
    },

    // 根据 skuList 和 properties 设置邻接矩阵的值
    setAdjMatrixValue() {
      this.skuList.forEach((sku) => {
        this.associateAttributes(sku.attributes, sku.id);
      });
      this.properties.forEach((prop) => {
        this.associateAttributes(prop.attributes, '1');
      });
    },

    // 将 attributes 属性组中的属性在无向图中联系起来
    associateAttributes(attributes, skuId) {
      attributes.forEach((attr1) => {
        attributes.forEach((attr2) => {
          // 因 properties 与 skuList 数据结构不一致，需作处理
          if (attr1 !== attr2 || attr1.value !== attr2.value) {
            if (attr1.value && attr2.value) {
              attr1 = attr1.value;
              attr2 = attr2.value;
            }
            const index1 = this.vertexList.indexOf(attr1);
            const index2 = this.vertexList.indexOf(attr2);
            if (index1 > -1 && index2 > -1) {
              if (this.matrix[index1][index2]) {
                this.matrix[index1][index2].add(skuId);
              } else {
                this.matrix[index1][index2] = new Set([skuId]);
              }
            }
          }
        });
      });
    },

    // 判断当前 attribute 是否可选，返回 true 表示可选，返回 false 表示不可选，选项置灰
    canAttributeSelect(attribute) {
      if (!this.selected || !this.selected.length || attribute.isActive) {
        return true;
      }
      let res = [];
      this.selected.forEach((value) => {
        const index1 = this.vertexList.indexOf(value);
        const index2 = this.vertexList.indexOf(attribute.value);
        res.push(this.matrix[index1][index2]);
      });
      console.log(attribute.value, '->', res);
      if (res.some((item) => (item === 0))) {
        return false;
      } else if (res.some((item) => (item.has('1')))) {
        return true;
      } else {
        const first = res[0];
        const others = res.slice(1);
        return Array.from(first).some((skuId) => (others.every((item) => (item.has(skuId)))));
      }
    },
  },
};
</script>

<style>
.root {
  width: 350px;
  padding: 24px;
}

.sku-box-area {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
}

.sku-box {
  border: 1px solid #cccccc;
  border-radius: 6px;
  margin-right: 12px;
  padding: 8px 10px;
  margin-bottom: 10px;
}

.sku-text {
  font-size: 16px;
  line-height: 16px;
  color: #666666;
}

.active {
  border-color: #ff6600;
  color: #ff6600;
}

.disabled {
  opacity: 0.5;
  border-color: #e0e0e0;
  color: #999999;
}
</style>

