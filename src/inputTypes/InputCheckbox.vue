<template>
<div class="checkbox">
  <label>
    <input
      type="checkbox"
      :name="name"
      :checked="value"
      :disabled="disabled"
      @change="onChange"/>
    {{input.label}}
  </label>
</div>
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
      this.$emit('change', e.target.checked)
    }
  }
}
</script>
