<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showIamge" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showIamge () {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    //跳转到详情页
    itemClick() {
      const iid = this.goodsItem.item_id || this.goodsItem.iid
      this.$router.push('/detail/' + iid)
    }
  }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
    margin-bottom: 2px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    text-align: center;
    left: 0;
    right: 0;
    margin-top: 2px;
    overflow: hidden;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;/*文本溢出时，用省略号 */
    white-space: nowrap;/*文本不换行，直到遇到<br> */
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position:absolute;
    top: -1px;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url('~assets/images/common/collect.svg') 0 0/14px 14px;
  }
</style>