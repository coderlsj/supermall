<template>
  <div v-if="Object.keys(itemParams).length != 0" class="params-info">
    <table class="params-table" v-for="(tables, index) in itemParams.rule.tables" :key="index">
      <tr v-for="(tr, index) in tables" :key="index">
        <td v-for="(td, index) in tr" :key="index">{{td}}</td>
      </tr>
    </table>
     <table class="info-param">
      <tr v-for="(info, index) in itemParams.info.set" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="itemParams.info.images">
      <img :src="itemParams.info.images[0]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    itemParams: {
      type: Object
    }
  }
}
</script>

<style scoped>
  .params-info {
    padding:  20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    border-top: 5px solid #f2f5f8;
  }
  .params-info table{
    width: 100%;
    border-collapse: collapse;
  }
  .params-info table tr {
    height: 42px;
  }
  .params-info table tr td {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  
  .info-param {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .info-param-key {
    width: 95px;
  }

  .param-value {
    color: #eb4868;
  }

  .info-img img {
    width: 100%;
  }
</style>