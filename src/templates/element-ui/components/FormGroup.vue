<template>
<div class="el-form-item" :class="{'is-error': error}">
  <div class="el-input">
    <slot></slot>
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
