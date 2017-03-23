<template>
<el-input
  type="textarea"
  :name="name"
  :placeholder="input.placeholder"
  :maxlength="input.max"
  :minlength="input.min"
  :rows="input.rows"
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
