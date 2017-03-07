<template>
<div class="el-card box-card">
  <div class="el-card__header">{{input.label}}</div>
  <div class="el-card__body">
    <slot v-for="(input, name_) in input.$"
      :input="input" :name_="name + '.' + name_"/>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 22px;
}
</style>
