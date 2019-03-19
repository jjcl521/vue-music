<template>
  <scroll
    class="listview"
    :data="data"
    v-bind:listenScroll="listenScroll"
    v-on:scroll="onScroll"
    :probeType="probeType"
    ref="listview"
  >
    <ul>
      <li
        class="list-group"
        v-for="(group, index) in data"
        :key="index"
        ref="listGroup"
      >
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            class="list-group-item"
            v-on:click="selected(item)"
            v-for="(item, index) in group.items"
            :key="index"
          >
            <img v-lazy="item.img" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      v-on:touchstart="onShortTouchstart"
      v-on:touchmove.prevent="onShortTouchmove"
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in getHotKey"
          :key="index"
          :data-index="index"
          v-bind:class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed">
      <span class="fixed-title">{{ fixedTitle }}</span>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getData } from "common/js/dom";
const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  created() {
    this.listenScroll = true;
    this.probeType = 3;
    this.touch = {};
    this.listHeight = [];
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    getHotKey() {
      return this.data.map(item => item.title.substring(0, 1));
    },
    fixedTitle() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      //顶部
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      //中间位置
      for (let i = 0; i < listHeight.length - 1; i++) {
        let h1 = listHeight[i];
        let h2 = listHeight[i + 1];
        if (!h2 || (-newY >= h1 && -newY < h2)) {
          this.currentIndex = i;
          this.diff = h2 + newY;
          return;
        }
      }
      //底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;

      if (this.fixedTop === fixedTop) return;

      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  components: {
    Scroll
  },
  methods: {
    onShortTouchstart(e) {
      let currentIndex = getData(e.target, "index");
      this.touch = {
        y1: e.touches[0].pageY,
        currentIndex: currentIndex
      };
      this._scrollTo(currentIndex);
    },
    onShortTouchmove(e) {
      this.touch.y2 = e.touches[0].pageY;
      let length = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
      let currentIndex = parseInt(this.touch.currentIndex) + length;
      this._scrollTo(currentIndex);
    },
    onScroll(pos) {
      this.scrollY = pos.y;
    },
    selected(item) {
      this.$emit("selected", item);
    },
    _scrollTo(index) {
      //处理边界情况
      if (!index && index !== 0) {
        return;
      } else if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calcHeight() {
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      list.forEach((item, index) => {
        height += item.clientHeight;
        this.listHeight.push(height);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $color-highlight-background;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
