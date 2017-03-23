<template>
<div class="el-form-item"
  :class="{'is-error': error}"
  :form-group-error="error">
  <div class="el-input">
    <slot name="label"></slot>
    <label class="el-form-item__label el-col-6" v-if="showLabel"/>
    <div class="el-form-item__content" :class="{'el-col-18': !isArray}">
      <slot></slot>
      <slot name="help"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    error: String,
    input: Object
  },
  computed: {
    showLabel () {
      return !this.input ||
        this.input.type === Boolean &&
        (!this.input.inputType || this.input.inputType === 'checkbox')
    },
    isArray () {
      return this.input && this.input.parent &&
        this.input.parent.type === Array
    }
  }
}
</script>
