<template>
  <div id="app">
    <the-header></the-header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view class="min-h-screen z-10" />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: {
    TheHeader
  }
  // created() {
  //   this.$store.dispatch("getVacanciesList");
  //   // this.$store.dispatch("test");
  // }
};
</script>

<style lang="scss">
#app {
  padding-bottom: 200px;
}
</style>
