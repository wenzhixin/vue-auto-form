<template>
<el-select
  :name="name"
  :disabled="disabled"
  :placeholder="input.placeholder"
  multiple
  v-model="currentValue"
  @change="onChange">
  <el-option v-for="(item, i) in input.values"
    :key="i"
    :value="item.value"
    :label="item.label"/>
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
    onChange (values) {
      this.$emit('change', values.map(value => {
        if (this.input.arrayType === Number) {
          return +value
        }
        return value
      }))
    }
  }
}
</script>

<style scoped>
.el-select {
  display: block !important;
}
</style>
