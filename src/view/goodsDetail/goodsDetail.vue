<template xmlns="http://www.w3.org/1999/html">
  <div class="Wrapper">
    <detail :prodId="query"></detail>
  </div>
</template>

<script>
import detail from "@/view/goodsDetail/detail";
export default {
  components:{
    detail
  },
  props:{
    query: String
  },
}
// let props = defineProps({
//   query: String
// })

</script>

<style scoped>
.Wrapper {
  background-color: #fff;
}
</style>