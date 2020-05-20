<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="addSelect">
        <i class="icon " :class="{select: isSelect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item  bar-right">
        <div class="cart" @click="addCart">加入购物车</div>
        <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data() {
    return {
      isSelect: false
    }
  },
  methods: {
    addSelect() {
      console.log("addSelect")
      this.isSelect = !this.isSelect
    },
    addCart() {
      this.$emit("addCart")
    }
  }
}
</script>

<style scroped>
.bottom-bar{
  position: fixed;
  height: 49px;
  background-color: #fff;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 9;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display:flex;
}
.bar-item>div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  background: url('~assets/images/detail/detail_bottom.png') 0 0/100%;
  margin: 5px auto 3px;
}
.bar-left .service {
  background-position: 0 -52px;
}

.bar-left .shop {
  background-position: 0 -97px;
  
}

.bar-left .select {
  background-position: 0 -25px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

</style>