<template>
  <div class="category">
    <nav-bar class="navbar">
      <span slot="center">商品分类</span>
    </nav-bar>
    <div class="content">
      <category-list class="category-list" :category-list="categoryList" @sortClick="itemClick" />
      <div class="content-right">
        <tab-control class="tabcontrol"  v-show="isShow" :titles='["综合","新品","销量"]' @tabClick="tabClick" ref="tabControl1"></tab-control>
        <scroll class="scroll2" @scroll="contentScroll" :probeType="3">
          <category-sort :category-sort="showSort" @imageLoad="imageLoad"></category-sort>
          <tab-control :titles='["综合","新品","销量"]' @tabClick="tabClick" ref="tabControl2"></tab-control>
          <goods-list :goods="showGoodsList"></goods-list>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {tabControlMinxin} from 'common/mixin.js'

import {getCategoryList, getCategorySort, getCategories} from 'network/category'

import CategorySort from './childComps/CategorySort'
import CategoryList from './childComps/CategoryList'

export default {
  name: 'Category',
  data() {
    return {
      categoryList: [],
      categorySort: [],
      currentIndex: -1,
      goods:[],
      categoryDetail: {},
      taboffsetTop: null,
      isShow: false
    }
  },
  mixins: [tabControlMinxin],
  components: {
    CategoryList,
    NavBar,
    CategorySort,
    Scroll,
    TabControl,
    GoodsList
  },
  created() {
    this._getCategoryList()
  },
  computed: {
    showSort() {
      if( this.currentIndex == -1) return {}
      return this.categoryDetail[this.currentIndex].subCategories
    },
    showGoodsList() {
      if( this.currentIndex == -1) return []
      return this.categoryDetail[this.currentIndex].showGoodsList[this.currentType]
    }
  },
  mounted() {
  },
  beforeUpdate() {
  },
  methods: {
    imageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    _getCategoryList() {
      getCategoryList().then(res => {
        this.categoryList = res.data.data.category.list
        for(let i = 0; i < this.categoryList.length; i++){
          this.categoryDetail[i] = {
            subCategories: {},
            showGoodsList: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this._getCategorySort(0)
      })
    },
    _getCategorySort(index) {
      this.currentIndex = index
      
      const maitKey = this.categoryList[index].maitKey
      getCategorySort(maitKey).then(res => {
        this.categoryDetail[index].subCategories = res.data.data
        this.categoryDetail = {...this.categoryDetail}
        this._getCategories('pop')
        this._getCategories('new')
        this._getCategories('sell')
      })
    },
    _getCategories(type){
      const miniWallkey = this.categoryList[this.currentIndex].miniWallkey
      getCategories(miniWallkey, type).then(res => {
        this.categoryDetail[this.currentIndex].showGoodsList[type] = res.data
        this.categoryDetail = {...this.categoryDetail}
      }) 
    },
    itemClick(index) {
     this._getCategorySort(index)
    },
    contentScroll(position){
      this.isShow = (-position.y > this.taboffsetTop)
    }
  }
}
</script>

<style scroped>
  .navbar {
    background: var(--color-tint);
    color: #fff;
  }
  .content{
    display: flex;
    flex: 1;
    height: 100vh;
    overflow: hidden;
  }
  .tabcontrol{
    position: relative;
  }
  .content-right{
    width: 70%;
  }
  .scroll2{
    height: calc(100% - 49px - 44px);
  }
</style>