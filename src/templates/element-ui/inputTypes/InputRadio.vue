<template>
<div>
  <el-radio
    :name="name"
    :label="false"
    :disabled="disabled"
    v-model="currentValue"
    @change="onChange">
    {{input.falseLabel}}
  </el-radio>
  <el-radio
    :name="name"
    :label="true"
    :disabled="disabled"
    v-model="currentValue"
    @change="onChange">
    {{input.trueLabel}}
  </el-radio>
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
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.value)
    }
  },
  watch: {
    value (value) {
      this.currentValue = this.value
    }
  }
}
</script>
