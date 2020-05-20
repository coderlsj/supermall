<template>
  <div class="bottom-bar">
    <div class="checkall">
      <check-button 
      :is-checked="isSelectAll" 
      class="check-button"
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{totalCount}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(s => s.isChecked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    }, 
    totalCount() {
      return this.cartList.filter(s => s.isChecked).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(s => !s.isChecked).length)
      if(this.cartList.length === 0) return false
      return !(this.cartList.find(item => !item.isChecked))
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll){
        this.cartList.map(s => s.isChecked = false)
      }
      else{
        this.cartList.forEach(s => s.isChecked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll){
        this.$toast.show("请选择购买商品", 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.checkall {
  margin-left: 10px;
  display: flex;
  align-items: center;
 }
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.checkall span {
  margin-left: 5px;
}
.price {
  margin-left: 30px;
}
.calculate {
  position: absolute;
  right: 0px;
  text-align: center;
  background: orangered;
  color: #fff;
  width: 92px;
}
</style>