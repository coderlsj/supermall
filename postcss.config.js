module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度没对应的是我们设计稿的宽度
      viewportHright : 667,//视窗的告负，对应的是我们设计稿的高度
      unitPrecision: 5, //指定'px'转换成视窗单位值的小数位数
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'],//指定不需要转换的类
      minPixeValue: 1, //小于或等于'1px'不转换为视窗单位
      mediaQuery: false //允许在媒体查询中转换'px
    }
  }
}

//1.在js中使用正则:/正则相关规则/
//2.exclude中春芳的元素必须是正则表达式
//3.按照排除的文件写对应的正则
//正则的规则
//1.^abc：表示匹配的内容必须以abc开头
//2.abc$: 表示匹配的内容以abc结尾