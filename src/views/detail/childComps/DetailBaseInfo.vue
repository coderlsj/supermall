<template>
  <div v-if="Object.keys(goods).length != 0">
    <div class="title-info">
      <div>{{goods.title}}</div>
    </div>
    <div class="price-info">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns-info">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services-info">
      <span class="services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.title-info{
  color: var(--color-text);
  font-size: 16px;
  font-weight: bold;
  padding: 10px 4px;
  letter-spacing: 1px;
  color: #333;
}

/* .price-info{
  position: relative;
} */
.price-info span{
  margin-right: 5px;
}

.price-info .newPrice{
  color: var(--color-high-text);
  font-size: 20px;
}

.price-info .oldPrice{
  font-size: 12px;
  text-decoration: line-through;
}

.price-info .discount{
  background-color: var(--color-high-text);
  color: white;
  font-size: 12px;
  display: inline-block;
  position: relative;;
  top: -7px;
  border-radius: 10px;
  padding: 3px;
}
.columns-info{
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
  font-size: 12px;
  display: flex;
  justify-content:space-between;
}

.services-info {
  height: 60px;
  line-height:60px;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}
.services-item img{
  width:13px;
  position: relative;
  top: 2px;
}
.services-item span{
  font-size: 13px;
  color: #333;
}
</style>