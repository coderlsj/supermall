import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  addCart(context, payload){
    return new Promise((resolve, reject) =>{
      let product = context.state.cartList.find(item => item.iid == payload.iid)
      if(product){
        context.commit(ADD_COUNTER, product)
        resolve("当前商品数量+1")
      }else{
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve("添加新商品")
      }
    })
    
  }
}