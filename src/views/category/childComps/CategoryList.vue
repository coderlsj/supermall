<template>
  <scroll class="scroll1">
    <div class="category-list">
      <div class="category-item" 
      v-for="(item, index) in categoryList" 
      :key="index" 
      :class="{active: currentIndex === index}"
      @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'CategoryList',
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      }
    },
  },
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("sortClick", index)
    }
  }
}
</script>

<style scoped>
  .scroll1 {
    height: calc(100% - 49px - 44px);
    background-color: #f6f6f6;
    width: 30%;
    text-align: center;
    overflow: hidden;
  }
  .active {
    background: #fff;
    color: var(--color-high-text)
  }
  .category-item {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
</style>