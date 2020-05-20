<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" @tabClick="tabClick" :titles='["流行", "新款", "精选"]' ref="tabControl1" v-show="isFixed"></tab-control>
    <scroller ref="scroll" class="contain" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullUp='loadMore' >
      <home-swiper @swiperImageLoad="swiperImageLoad" :banners="banners"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="" @tabClick="tabClick" :titles='["流行", "新款", "精选"]' ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods" ></goods-list>
    </scroller>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl' 
import GoodsList from 'components/content/goods/GoodsList'
import Scroller from 'components/common/scroll/Scroll'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata} from 'network/home.js'
import {getHomeGoods} from 'network/home.js'

import {debounce} from 'common/utils.js'
import {itemListListener, backTopMinxin} from 'common/mixin.js'


export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0, 
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  components: {
    Scroller,  
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    //1.图片加载完的事件监听
   
  },
  mixins: [itemListListener, backTopMinxin]
,  activated() {
    console.log(this.saveY)
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存Y值
    this.saveY = this.$refs.scroll.getScrollY
    console.log(this.saveY)
    //取消监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    /**
     * 事件监听的方法
     */
    
    tabClick(index) {
      switch (index) {
        case 0: 
          this.currentType = 'pop'
          break
        case 1: 
          this.currentType = 'new'
          console.log(index);
          break
        case 2: 
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    swiperImageLoad() {
      //获取tabContrl的offsetTop(组件没有offsetTop属性)
      //所有组件都有一个属性$el:用于获取组件元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
       getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // this.goods[type].contact(res.data.data.list)
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page + 1
      })
    },
   
    contentScroll(position) {
      //1.决定BackTop是否显示
      this.isShow = (-position.y > 1000)

      //2.决定吸顶属性
      this.isFixed = (-position.y > this.tabOffsetTop)
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /*使用原生滚动时*/
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
#home{
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
}
.tab-control{
  position: relative;
  z-index: 9;
}
.center {
  font-size: 16px;
}


.contain{
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  position:absolute;
}
/* .contain{
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>