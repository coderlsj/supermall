<template>
  <div v-if="Object.keys(detailInfo).length != 0" class="good-info">
    <div class="title  clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="key">{{detailInfo.detailImage[0].key}}</div>
    <div class="goods-list">
       <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" :key="index" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodInfo',
  props: {
    detailInfo: {
      type: Object,
    }
  },
  data() {
    return{
      imagesLength: 0,
      counter: 0
    }
  },
  methods: {
    // imageLoad() {
    //   if(++this.counter == this.imagesLength){
    //     this.$emit("imageLoad")
    //   }
    // }
    imageLoad() {
      this.$emit("imageLoad")
    }
  },
  watch: {
    datailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>

.good-info {
  padding: 20px 0;
  bottom: 5px solid #f2f5f8;
}

.title {
  padding:0 15px;
}

.title .start, .title .end {
  width: 90px;
  height: 1px;
  background-color: #333;
  position: relative;
}

.title .start{
  float: left;
}

.title .end {
  float: right;
}
.title .start::before, .title .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 0;
  background-color: #333;
}
.title .end::after {
  right: 0;
}
.title .desc {
  font-size: 12px;
  padding: 15px 0;
}

.key {
  font-size: 14px;
  margin: 10px 0 10px 15px;
}

.goods-list img {
  width: 100%;
}

</style>