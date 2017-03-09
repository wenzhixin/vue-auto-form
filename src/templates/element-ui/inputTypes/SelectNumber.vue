<template>
<select
  class="el-input__inner"
  :name="name"
  :disabled="disabled"
  @change="onChange">
  <option value>
    {{input.placeholder}}
  </option>
  <option v-for="item in input.values"
    :value="item.value"
    :selected="item.value === input.defaultValue">
    {{item.label}}
  </option>
</select>
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
      this.$emit('change', e.target.value === ''
        ? '' : +e.target.value)
    }
  }
}
</script>
