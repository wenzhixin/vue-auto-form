<template>
<select
  class="form-control"
  multiple
  :name="name"
  :disabled="disabled"
  @change="onChange">
  <option v-for="(item, i) in input.values"
    :key="i"
    :value="item.value"
    :selected="input.defaultValue.indexOf(item.value) > -1">
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
      const options = [].slice.call(e.target.selectedOptions)
      this.$emit('change', options.map(item => {
        if (this.input.arrayType === Number) {
          return +item.value
        }
        return item.value
      }))
    }
  }
}
</script>
