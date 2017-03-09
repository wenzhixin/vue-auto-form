<template>
<input
  class="el-input__inner"
  type="date"
  :name="name"
  :placeholder="input.placeholder"
  :min="input.min"
  :max="input.max"
  :value="value"
  :disabled="disabled"
  @input="onChange"/>
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
    onChange (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>
