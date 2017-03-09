<template>
<select
  class="form-control"
  :name="name"
  :disabled="disabled"
  @change="onChange">
  <option value>
    {{input.placeholder}}
  </option>
  <option value="true" :selected="input.defaultValue === true">
    {{input.trueLabel}}
  </option>
  <option value="false" :selected="input.defaultValue === false">
    {{input.falseLabel}}
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
      let value
      if (e.target.value === 'true') {
        value = true
      } else if (e.target.value === 'false') {
        value = false
      }
      this.$emit('change', value)
    }
  }
}
</script>
