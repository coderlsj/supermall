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

export const tabControlMinxin = {
  data() {
    return {
      currentType: 'pop',
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      if(this.$refs !== {})
      {
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
      }
    }
  }
}
  