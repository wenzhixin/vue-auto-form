<template>
<label class="col-sm-3 control-label">{{input.label}}</label>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object
  }
}
</script>
