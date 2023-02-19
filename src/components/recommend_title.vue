<template>
  <div class="w">
    <div class="title_box">
      <h3 class="title">{{ channel_title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channel_title: String
  },
}
</script>

<style scoped>
.title_box {
  width: 210px;
  height: 45px;
  margin: auto;
  position: relative;
  padding: 10px 0 0 0;
}

.title {
  width: 210px;
  height: 45px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 45px;
  color: #333;
  margin: 0 auto;
  overflow: hidden;
}

.title:before {
  left: 0;
  position: absolute;
  content: "";
  height: 20px;
  width: 25px;
  top: 50%;
  background-image: url("../assets/img/sprite.png");
  background-position: 0 0;
  margin-top: -5px;
  background-size: 50px 20px;
}

.title:after {
  right: 0;
  position: absolute;
  content: "";
  height: 20px;
  width: 25px;
  top: 50%;
  background-image: url("../assets/img/sprite.png");
  background-position: -25px 0;
  margin-top: -5px;
  background-size: 50px 20px;
}


</style>