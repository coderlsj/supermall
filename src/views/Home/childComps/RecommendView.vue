<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
.recommend-item{
  flex: 1;
  flex-wrap: wrap;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>