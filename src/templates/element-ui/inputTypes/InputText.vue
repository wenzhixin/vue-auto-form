<template>
<el-input
  :type="input.inputType || 'text'"
  :name="name"
  :placeholder="input.placeholder"
  :maxlength="input.max"
  :minlength="input.min"
  :value="value"
  :disabled="disabled"
  @change="onChange"/>
</template>

<script>
export default {
  props: {
    value: {},
    name: String,
    input: Object,
    disabled: Boolean
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
