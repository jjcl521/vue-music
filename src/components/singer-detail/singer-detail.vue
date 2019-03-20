<template>
  <music-list></music-list>
</template>

<script>
import { mapGetters } from "vuex";
import { getSinger } from "api/singer";
import { createSong } from "common/js/song";
import MusicList from "base/music-list/music-list"
export default {
  data() {
    return {
      singer: {},
      songs: []
    };
  },
  methods: {
    ...mapGetters({
      getSinger: "singer"
    })
  },
  mounted() {},
  created() {
    this.singer = this.getSinger();
    if (!this.singer.mid)
      this.$router.push({
        path: "/singer"
      });
    getSinger(this.singer.mid).then(lst => {
      lst.forEach(item => {
        this.songs.push(createSong(item.musicData));
      });
      console.info(this.songs);
    });
  },
  components:{
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-background;
}
</style>
