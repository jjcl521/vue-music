<template>
  <div class="singer-detail">
    111111
    {{ singer }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      singer: {}
    };
  },
  methods: {
    ...mapGetters({
      getSinger: "singer"
    })
  },
  mounted() {
    this.singer = this.getSinger();
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.singer-detail {
  position fixed
  z-index 999
  top 0
  left 0
  right 0
  bottom 0
  background-color $color-background
}
</style>
