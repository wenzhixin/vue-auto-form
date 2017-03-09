<template>
<div :class="{'form-group': !isArray, 'has-error': error}"
  :form-group-error="error">
  <slot name="label"></slot>
  <label class="col-sm-3 control-label" v-if="showLabel"/>
  <div :class="{'col-sm-9': !isArray}">
    <slot></slot>
    <slot name="help"></slot>
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
