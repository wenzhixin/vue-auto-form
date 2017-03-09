<template>
<textarea
  class="form-control"
  :name="name"
  :placeholder="input.placeholder"
  :maxlength="input.max"
  :rows="input.rows"
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
