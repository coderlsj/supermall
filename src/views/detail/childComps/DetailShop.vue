<template>
  <div class="shop-info">
    <div class="shopinfo-logo">
      <img :src="shops.logo" alt="">
      <span class="title">{{shops.name}}</span>
    </div>
    <div class="shopinfo-content">
      <div class="shopinfo-item left">
        <div class="sells">
          <div class="sells-count">{{shops.Sells | showCount }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="goodscount">
          <div class="goods-count">{{shops.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shopinfo-item right">
        <table>
          <tr v-for="(item, index) in shops.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' : item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more' : item.isBetter}"><span>{{item.better ? '高' : '低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailShop',
  props: {
    shops: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showCount(value) {
      if(value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>
.shop-info {
  border-bottom: 2px solid rgba(100, 100, 100, .1);
  border-top: 4px solid rgba(100, 100, 100, .1);
}
.shopinfo-logo {
  margin-left: 10px;

  margin-top: 10px;
  line-height: 45px;
  display: flex;
  align-items: center;
}
.shopinfo-logo img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.shopinfo-logo .title{
  margin-left: 10px;
  vertical-align: center;
}
.shopinfo-content {
  display: flex;
  align-items: center;
  color: #333;
  margin-top: 15px;
}

.shopinfo-item {
  flex: 1;
}

.left {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sells-count, .goods-count {
  font-size: 18px;
}

.sells-text, .goods-text{
  margin-top:  10px;
  font-size: 12px;
}

.right {
  font-size: 12px;
  color: #333;
}

.right table {
  margin-left: 30px;
  width: 120px;
}

.right table td{
  padding: 5px 0;
}

.right .score{
  color: #5ea732;
}

.right .score-better{
  color: #f13e3a;
}

.right .better span {
  background-color:#5ea732;
  color: #fff;
  text-align: center;
}
.right .better-more span {
  background-color: #f13e3a;
}

.shop-bottom
{
  line-height: 40px;
}

.enter-shop {
  margin: 10px auto;
  width: 40%;
  border-radius: 5px;;
  background-color: rgb(200, 200, 200);
  text-align: center;
}
</style>