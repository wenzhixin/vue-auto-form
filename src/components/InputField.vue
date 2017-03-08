<template>
  <div
    ref="input"
    :is="type"
    :value="currentValue"
    :name="name"
    :disabled="disabled"
    :input="formatInput(input)"
    @change="onChange"/>
</template>

<script>
import moment from 'moment'
import Schema from '../schema'
import bootstrap3 from '../inputTypes'
import bootstrap3_horizontal from '../templates/bootstrap3-horizontal/inputTypes'
import element from '../templates/element-ui/inputTypes'
import { closest, getType } from '../utils'

const Components = {
  bootstrap3,
  bootstrap3_horizontal,
  element
}

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  props: {
    name: String,
    input: Object
  },
  data() {
    return {
      currentValue: ''
    }
  },
  mounted() {
    this.updateDefaultValue(this.input)
  },
  destroyed() {
    delete this.form.formModel[this.name]
  },
  computed: {
    form() {
      let parent = this.$parent
      while (parent.$options._componentTag !== 'auto-form') {
        parent = parent.$parent
      }
      return parent
    },
    type() {
      let type = getType(this.input)
      return type ? this.getComponent(type) : undefined
    },
    disabled() {
      if (!this.input.disableType) {
        return false
      }
      return this.input.disableType === this.form.type
    }
  },
  methods: {
    onChange(val) {
      this.form.formModel[this.name] = val
      this.form.validateInput(this.name, val, this.input)
    },
    getComponent(name) {
      let template = this.form.getTemplate()
      if (Components[template] && Components[template][name]) {
        return Components[template][name]
      }
      return Components.bootstrap3[name]
    },
    updateDefaultValue(val) {
      this.currentValue = this.formatValue(val.defaultValue)
      this.form.formModel[this.name] = this.currentValue
    },
    formatInput(val) {
      let input = _.cloneDeep(val)
      if (input.type === Date) {
        input.min = this.formatValue(input.min)
        input.max = this.formatValue(input.max)
      }
      return input
    },
    formatValue(val) {
      if (val && this.input.type === Date) {
        return moment(val).format(DATE_FORMAT)
      }
      return val
    }
  },
  watch: {
    input(val) {
      this.updateDefaultValue(val)
    }
  }
}
</script>
