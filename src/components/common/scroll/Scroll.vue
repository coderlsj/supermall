<template>
  <div ref="wrapper" class="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建监听对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType:this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动位置
    this.scroll.on('scroll', (position) => {
      this.$emit("scroll", position)
    })
    // 3.监听上拉事件
    if(this.pullUpLoad)
    {
      this.scroll.on("pullingUp", ()=> {
        this.$emit('pullUp')
      })
    }
  },
  computed: {
    getScrollY() {
      return this.scroll.y
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
  }
}
</script>

<style scoped>
/* .wrapper{
  position: absolute;
  top: 0;
  left: 0;
} */
</style>