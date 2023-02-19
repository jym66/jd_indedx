<template>
  <div class="wrapper">
    <div class="goods_img">
      <a href="javascript:void(0)">
        <img :src=info.pic alt="">
      </a>
    </div>
    <div class="goods_price">
      <strong>
        <em>¥</em>
        <i>{{ info.price }}</i>
      </strong>
    </div>
    <div class="goods_name">
      <a href="javascript:void(0)">
        <em>{{ info.prodName }}</em>
      </a>
    </div>
    <div class="goods_commit">
      <strong>
        <a href="javascript:void(0)">{{ info.prodCommNumber }}+</a>
        条评价
      </strong>
    </div>
    <div class="goods_shop">
      <span>
        <a href="javascript:void(0)">mall4j的小店</a>

      </span>
    </div>
    <div class="p_icons">
      <i class="iconfont icon-ziying"></i>
      <i class="iconfont icon-tianmaobaoyouqia"></i>
      <i class="iconfont icon-tianmao-zengyunfeixian"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodBox',
  props: {
    info: {
      prodId: String,
      pic: String,
      prodName: String,
      price: String,
      prodCommNumber: String, //评论
      positiveRating: String, //好评率
      praiseNumber: String, // 好评数量
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 220px;
  background-color: white;
  padding: 38px 9px 10px;
  transition: border-color .1s ease;
  border: 1px solid white;
}

.wrapper:hover {
  border: 1px solid #ccc;
  box-shadow: 0 0 15px #ccc;
}

.goods_img {
  color: #666;
  list-style: none;
  overflow: hidden;
  height: 220px;
  padding: 0;
  margin: 0 0 5px;
}

.goods_img img {
  width: 220px;
  height: 220px;
}

.goods_price {
  color: #666;
  list-style: none;
  padding: 0;
  position: relative;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  width: 100%;
  margin: 0 0 8px;
}

.goods_price strong {
  float: left;
  margin-right: 10px;
  color: #e4393c;
  font-size: 20px;
  font-weight: 400;
}

.goods_name {
  height: 40px;
  margin-bottom: 8px;
  overflow: hidden;
}

.goods_name em {
  display: inline;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}

.goods_commit {
  width: 100%;
  height: 18px;
  margin-top: -3px;
  margin-bottom: 9px;
  overflow: hidden;
}

.goods_commit strong {
  color: #a7a7a7;
  font-weight: 400;
}

.goods_commit strong a {
  color: #646fb0;
  font-weight: 700;
}

.goods_shop {
  line-height: 18px;
  height: 18px;
  overflow: hidden;
  margin-top: -3px;
  margin-bottom: 9px;
}

.goods_shop a {
  display: inline-block;
  max-width: 122px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}


.icon-tianmaobaoyouqia, .icon-ziying, .icon-tianmao-zengyunfeixian {
  height: 20px;
  border: 1px solid #e23a3a;
  background-color: red;
  color: white;
  font-size: 20px;
  margin-right: 10px;
}

</style>