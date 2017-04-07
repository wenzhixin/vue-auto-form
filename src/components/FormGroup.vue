<template>
<div class="form-group"
  :class="{'has-error': error}"
  :form-group-error="error">
  <slot name="label"></slot>
  <div class="input-group" v-if="input.unit">
    <slot></slot>
    <span class="input-group-addon">{{input.unit}}</span>
  </div>
  <slot v-else></slot>
  <slot name="help"></slot>
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
