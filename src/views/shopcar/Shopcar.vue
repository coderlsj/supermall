<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <scroll class="contain">
      <cart-list />
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import {mapGetters} from 'vuex'

export default {
  name: 'Shopcar',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
}
</script>

<style scoped>

.cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.contain {
  width: 100%;
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}

</style>