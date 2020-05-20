import Toast from './Toast' 
import Vue from 'vue'

const obj = {}

obj.install = function (vue) {

  // console.log(Toast.$el)
  // document.body.appendChild()
  // 1.创建组件构造器
  const toastconstruct = Vue.extend(Toast)

  //2.new 的方式，根据组件构造器，创建一个组件对象
  const toast = new toastconstruct()

  // 3.将组件对象手动挂载到某个元素
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  vue.prototype.$toast = toast;
}

export default obj