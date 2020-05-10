<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  @import '../../../assets/css/base.css';
  
  #tab-bar {
    display: flex;
    background: #f6f6f6;

    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
  }
  
</style>