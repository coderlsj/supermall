<template>
  <div class="category-sort">
      <div class="sort-item" v-for="(item, index) in categorySort.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>  
</template>

<script>
export default {
  name: 'CategorySort',
  props: {
    categorySort: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit("imageLoad")
    }
  }
}
</script>

<style scoped>
 .category-sort {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   text-align: center;
 }
 .sort-item {
   /* width: 30%; */
   font-size: 12px;
   margin-top: 10px;
 }
 .sort-item img {
   width: 70px;
 }
 .sort-item a div {
   line-height: 30px;
 }
</style>>
