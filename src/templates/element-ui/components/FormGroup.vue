<template>
<div class="el-form-item"
  :class="{'is-error': error}"
  :form-group-error="error">
  <div class="el-input">
    <slot name="label"></slot>
    <slot></slot>
    <slot name="help"></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    error: String
  }
}
</script>
