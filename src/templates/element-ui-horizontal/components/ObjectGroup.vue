<template>
<div :class="{'el-form-item': showLable}">
  <label class="el-form-item__label el-col-6" v-if="showLable">
    {{input.label}}
  </label>
  <div class="el-form-item__content" :class="{'el-col-18': showLable}">
    <div class="el-card box-card">
      <div class="el-card__body">
        <slot v-for="(input, name_) in input.$"
          :input="input" :name_="name + '.' + name_"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object,
    showLable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 22px;
}
</style>
