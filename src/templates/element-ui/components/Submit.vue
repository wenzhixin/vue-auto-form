<template>
<button type="submit" class="el-button el-button--primary">
  {{label}}
</button>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>
