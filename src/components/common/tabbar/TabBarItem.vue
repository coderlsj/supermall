<template>
    <!-- 所有的item展示的内容一样 -->
    <div class="tab-bar-item" v-on:click="itemClick">
      <div v-if="!isActive">
        <slot name="item-icon"></slot>  
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
      <!-- <img src="../../assets/img/tabbar/home.png">
      <div>首页</div> -->
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color : this.activeColor} : {}
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick(){
      if(this.$route.path != this.path){
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>