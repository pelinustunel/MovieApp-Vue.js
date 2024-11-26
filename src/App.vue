<script setup></script>

<script>
import AppNavigation from "./components/AppNavigation.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppNavigation,
    AppFooter,
  },
};
</script>
<template>
  <div id="id">
    <AppNavigation />
  </div>
  <div class="container">
    <router-view />
  </div>
  <AppFooter />
</template>
<style>
* {
  margin: 0;
  padding: 0;
  background-color: #1c1c1c;
  font-family: 'Poppins', sans-serif;
}
a{
  text-decoration: none;
}
</style>
