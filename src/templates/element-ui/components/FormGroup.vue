<template>
<div class="el-form-item"
  :class="{'is-error': error}"
  :form-group-error="error">
  <div class="el-input">
    <slot name="label"></slot>
    <div class="el-input-group" v-if="input.unit">
      <slot></slot>
      <span class="el-input-group-addon">{{input.unit}}</span>
    </div>
    <slot v-else></slot>
    <slot name="help"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    error: String,
    input: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.el-input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.el-input-group input,
.el-input-group select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.el-input-group-addon {
  padding: 6px 12px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
}
</style>
