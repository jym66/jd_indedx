<template>
  <shortcut></shortcut>
  <router-view></router-view>
  <!--  <transition name="fade">-->
  <!--    -->
  <!--  </transition>-->
  <bottom></bottom>
</template>

<script setup>
import shortcut from './components/shortcut.vue'
import bottom from './components/bottom.vue'
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
