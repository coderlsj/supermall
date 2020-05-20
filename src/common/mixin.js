import {debounce} from './utils.js'
export const itemListListener = {
  data() {
    return {
      itemImageListener: null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 1)

    this.itemImageListener = () => {
      this.newRefresh()
    }
    
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}

import backTop from 'components/content/backTop/BackTop'
export const backTopMinxin = {
  components: {
    backTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
  }
}