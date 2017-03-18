<template>
<el-select
  :name="name"
  :disabled="disabled"
  :placeholder="input.placeholder"
  v-model="currentValue"
  @change="onChange">
  <el-option :value="true" :label="input.trueLabel"/>
  <el-option :value="false" :label="input.falseLabel"/>
</el-select>
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
      currentValue: this.input.defaultValue
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
.el-select {
  display: block !important;
}
</style>
