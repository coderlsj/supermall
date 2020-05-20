<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topIamges"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop :shops="shops" />
      <detail-good-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-good-info>
      <detail-params-info :item-params="itemParams" ref="params"></detail-params-info>
      <detail-comment-info :item-comment="itemComment" ref="comment"></detail-comment-info>
      <goods-list :goods="goodslist" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShow" />

    <toast :message="message" :is-show="isShow"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from './childComps/DetailShop'
import DetailGoodInfo from './childComps/DetailGoodInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import { getDetail, getRecommend, Goods, Shop} from 'network/detail'
import {debounce} from 'common/utils.js'
import {itemListListener, backTopMinxin} from 'common/mixin.js'

import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'

import {mapActions} from 'vuex'
export default {
  name: 'detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    DetailGoodInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  data() {
    return { 
      iid: null,
      topIamges: [],
      goods: {},
      shops: {},
      detailInfo: {},
      itemParams: {},
      itemComment: {},
      goodslist:[],
      themeTopYs: [],
      currentIndex: null,
      themeTopYsLoad: null,
      message: '',
      isShow: false
    }
  },
  mounted() {
    
  },
  mixins: [itemListListener, backTopMinxin],
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  created() {
    //1.保存获取iid
    this.iid = this.$route.params.iid

    //2.获取数据
    getDetail(this.iid).then(res => {
      const result = res.data.result;
      this.topIamges = res.data.result.itemInfo.topImages
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      this.shops = new Shop(result.shopInfo)
      this.detailInfo = result.detailInfo
      this.itemParams = result.itemParams
      if(result.rate.list)
      {
        this.itemComment = result.rate.list[0]
      }

      //1.第一次获取值不对，因为dom没有挂载，数据没有渲染


      //第二次获取值不对，图片未计算在内
      // this.$nextTick(() => {
      //   //则根据最新的数据，对应的Dom是已经被渲染出来
      //   //但是图片还没有加载完毕
      //   //offsetTop值不对，有可能是因为图片未加载完
      //   this.themeTopYs = []

      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
    })
    getRecommend ().then(res => {
      this.goodslist = res.data.data.list
    })

    //第三次用debounce封装
    this.themeTopYsLoad = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
  },
  updated() {
    // this.themeTopYs = []

    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
  methods: {
    ...mapActions(['addCart']),
    //写法一：再detail-good-list中加载次数，当等于图片数组长度时再传递方法
    // imageLoad() {
    //   this.scroll.refresh()
    // }
    //写法二：使用防抖函数，这是需要在混入中添加newRefresh
    imageLoad() {
      this.newRefresh();
      this.themeTopYsLoad()
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      this.isShow = (-position.y > 1000)

      const Y = -position.y; 
      const length = this.themeTopYs.length
      //2.进行对比
      for(let i = 0;i < length; i++){
        if(this.currentIndex != i 
        && (i< length-1 && Y >= this.themeTopYs[i] && Y < this.themeTopYs[i + 1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      } 
    },
    addToCart() {
      const product = {}
      product.image = this.topIamges[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // this.$store.commit('addCart', product)
      this.addCart(product).then(res => {
        this.$toast.show(res, 2000)
      })
      // this.addCart(product).then(res => {
      //   this.isShow = true
      //   this.message = res

      //   setTimeout(() => {
      //     this.isShow = false
      //     this.message = ''
      //   },1000)
      // })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style scoped>
 #detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
} 

.detail-nav{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  /* height: calc(100% - 44px); */
  overflow: hidden; 
  position: absolute;
  top: 44px;
  bottom: 49px; 
  left: 0;
  right: 0;
}
</style>