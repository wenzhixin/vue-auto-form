<template>
<div class="form-group" :class="{'has-error': error}">
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    error: String
  }
}
</script>
