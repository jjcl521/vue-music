<template>
  <div class="singer">
    <list-view v-on:selected="selected" :data="Singers"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { getPinYin } from "api/pinyin";
import ListView from "base/listview/listview";
import { mapMutations, mapGetters } from "vuex";
import * as types from "src/store/mutation-type";
const HOT_NAME = "热门";
const HOT_LENGTH = 10;
export default {
  data() {
    return {
      Singers: []
    };
  },
  components: {
    "list-view": ListView
  },
  mounted() {
    getSingerList().then(r => {
      this.Singers = this._groupSinger(r.data.singerlist);
    });
  },
  methods: {
    selected(singer) {
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    _groupSinger(singerList) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      singerList.forEach((item, index) => {
        let key = getPinYin(item.singer_name, "", true, true);
        if (index < HOT_LENGTH) {
          map.hot.items.push({
            id: item.singer_id,
            name: item.singer_name,
            img: item.singer_pic
          });
        }
        if (!(key in map)) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push({
          id: item.singer_id,
          name: item.singer_name,
          img: item.singer_pic
        });
      });

      let ret = [];
      for (let key in map) {
        let value = map[key];
        if (value.title.match("[a-zA-Z]")) {
          ret.push(value);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt() - b.title.charCodeAt();
      });
      ret.unshift(map.hot);
      return ret;
    },
    ...mapMutations({
      setSinger: types.SET_SINGER
    }),
    ...mapGetters({
      getSinger: "singer"
    })
  }
};
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
