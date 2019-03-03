<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index">
            <a v-bind:href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>


<script>
import Slider from 'base/slider/slider'
import { getRecommend } from 'api/recommend'
import { Success } from 'api/config'

export default {
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then(r => {
        if (r.code === Success) {
          this.recommends = r.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }

}
</script>
