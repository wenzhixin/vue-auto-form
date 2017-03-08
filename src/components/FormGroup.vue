<template>
<div class="form-group"
  :class="{'has-error': error}"
  :form-group-error="error">
  <slot name="label"></slot>
  <slot></slot>
  <slot name="help"></slot>
</div>
</template>

<script>
export default {
  props: {
    error: String
  }
}
</script>
