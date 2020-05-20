<template>
  <div class="item-list">
    <div class="item-button">
      <check-button @checkChange="checkChange" :is-checked="product.isChecked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="title">{{product.title}}</div>
      <div class="desc">商品描述：{{product.desc}}</div>
      <div class="bottom">
        <div class="price left">￥{{product.price}}</div>
        <div class="count right">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'CartListItem',
  data() {
    return {
      
    }
  },
  props: {
    product: Object
  },
  components: {
    CheckButton
  },
  methods: {
    checkChange() {
      this.product.isChecked = !this.product.isChecked  
    }
  }
}
</script>

<style scoped>
.item-list {
  width: 100%;
  padding: 5px;
  font-size: 0;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.item-button {
  width: 13%;
  display: flex;
  justify-content:center;
  align-items: center;
}
.item-img{
  padding:5px;
}
.item-list .item-img img {
  width: 80px; 
  height: 100px;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  position: relative;
  padding: 5px 10px;
  overflow: hidden;
}
.item-info .title, .item-info .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-info .desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.item-info .bottom {
  position:absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
}
 
.item-list .price {
  color: orangered;
}
</style>