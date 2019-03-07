<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
import MHeader from "components/m-header/m-header.vue";
import Tab from "components/tab/tab";

export default {
  components: {
    MHeader,
    Tab
  },
  methods: {
   
  }
};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus" >
@import 'common/stylus/variable';

#app {
  color: $color-theme;
}
</style>
