<template>
<div>
  <div class="radio">
    <label>
      <input
        type="radio"
        value="false"
        :name="name"
        :checked="value"
        :disabled="disabled"
        @change="onChange"/>
      {{input.falseLabel}}
    </label>
  </div>
  <div class="radio">
    <label>
      <input
        type="radio"
        value="true"
        :name="name"
        :checked="value"
        :disabled="disabled"
        @change="onChange"/>
      {{input.trueLabel}}
    </label>
  </div>
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
      this.$emit('change', e.target.value)
    }
  }
}
</script>
