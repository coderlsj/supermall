<template>
  <div class="check-button" :class="{check: isChecked}" @click="itemClick">
    <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    itemClick() {
      this.$emit("checkChange")
    }
  }
}
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>