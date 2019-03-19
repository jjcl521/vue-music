<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" v-bind:data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in recommends" :key="index">
              <a v-bind:href="item.linkUrl">
                <img v-on:load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img
                  width="60"
                  height="60"
                  v-lazy="_getImgUrl(item.data.albummid)"
                />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.data.songname"></h2>
                <p class="desc" v-html="item.data.albumdesc"></p>
              </div>
            </li>
          </ul>
        </div>
        <Loading v-show="discList.length == 0"></Loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "base/scroll/scroll";
import Slider from "base/slider/slider";
import Loading from "base/loading/loading";
import { getRecommend, getRecommendList } from "api/recommend";
import { Success } from "api/config";

export default {
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getRecommendList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(r => {
        if (r.code === Success) {
          this.recommends = r.data.slider;
        }
      });
    },
    _getRecommendList() {
      getRecommendList().then(r => {
        this.discList = r;
      });
    },
    _getImgUrl(albummid) {
      return `https://y.gtimg.cn/music/photo_new/T002R90x90M000${albummid}.jpg?max_age=2592000`;
    },
    loadImage() {
      if (!this.loaded) {
        this.$refs.scroll.refresh();
        this.loaded = true;
      }
    }
  },
  components: {
    Slider,
    scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
