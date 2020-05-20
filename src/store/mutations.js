import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  //mustations卫衣的目的就是修改state中的状态
    //mutations种得每个方法尽可能只完成一件事
    [ADD_COUNTER](state, payload) {
      payload.count++
    },
    [ADD_TO_CART](state, payload) {
      payload.isChecked = true
      state.cartList.push(payload)
    }
}