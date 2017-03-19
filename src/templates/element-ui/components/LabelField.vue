<template>
<label class="el-form-item__label" :style="labelStyle">
  {{input.label}}
</label>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object
  },
  computed: {
    form () {
      let parent = this.$parent
      while (parent.$options._componentTag !== 'auto-form') {
        parent = parent.$parent
      }
      return parent
    },
    labelStyle () {
      const template = this.form.getTemplate()
      if (template.indexOf('horizontal') === -1) {
        return {
          float: 'none',
          display: 'block',
          textAlign: 'left'
        }
      }
    }
  }
}
</script>
