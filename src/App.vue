<template>
<the-header></the-header>
 <router-view v-slot="slotProps">
   <transition name="route">
     <component :is="slotProps.Component" mode="out-in"></component>
   </transition>
 </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: { TheHeader }
  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
  align-content: center;
}

.route-enter-from {
opacity: 0;
transform: translateY(-40px);
}
.route-leave-to {
opacity: 0;
transform: translateY(40px);
}
.route-enter-active{
transition: all 0.3s ease-out;
}
.route-leave-active{
transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 0.1;
  transform: translateY(0);
}

</style>
