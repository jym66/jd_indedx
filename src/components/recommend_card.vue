<template>
  <div class="item_wrapper">
    <router-link to="/">
      <div class="item">
        <div class="item_img">
          <img :src=imgUrl>
        </div>
        <div class="item_info">
          <p class="item_name">{{ title }}</p>
          <div class="price">
            <i>¥</i>
            <span class="price_txt">{{ price }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgUrl: String,
    price: Number,
    url: String
  }
}
</script>

<style scoped>
.item_wrapper {
  width: 230px;
  height: 300px;
  background-color: #ffffff;
}

.item {
  width: 230px;
  height: 320px;
}

.item_img {
  width: 150px;
  height: 150px;
  margin: auto;
  padding-top: 30px;
  padding-bottom: 20px;
}

img {
  width: 100%;
  height: 100%;
}

.item_info {
  height: 65px;
  width: 230px;
  line-height: 24px;
  color: #e1251b;
  margin: auto;
}

.item_name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 48px;
  width: 190px;
  text-align: left;
  font-size: 14px;
  color: #666;
  margin: auto;
  padding-bottom: 3px;

}

.price {
  position: relative;
  margin-top: 1px;
  left: 15px;
}

.price_txt {
  font-size: 20px;
  font-weight: 700;

}
</style>