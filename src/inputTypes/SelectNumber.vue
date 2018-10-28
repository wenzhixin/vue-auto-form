<template>
<select
  class="form-control"
  :name="name"
  :disabled="disabled"
  @change="onChange">
  <option value>
    {{input.placeholder}}
  </option>
  <option v-for="(item, i) in input.values"
    :key="i"
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
