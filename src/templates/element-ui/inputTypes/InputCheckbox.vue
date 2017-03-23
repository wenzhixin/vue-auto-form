<template>
<el-checkbox
  :name="name"
  :disabled="disabled"
  v-model="currentValue"
  @change="onChange">
  {{input.label}}
</el-checkbox>
</template>

<script>
export default {
  props: {
    value: {},
    name: String,
    input: Object,
    disabled: Boolean
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.checked)
    }
  },
  watch: {
    value (value) {
      this.currentValue = this.value
    }
  }
}
</script>
