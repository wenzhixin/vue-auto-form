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
import element from '../templates/element-ui/inputTypes'
import { closest } from '../utils'

const Components = {
  bootstrap3,
  element
}

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  props: {
    name: String,
    input: Object,
    modelType: String
  },
  data() {
    return {
      currentValue: ''
    }
  },
  mounted() {
    this.updateDefaultValue(this.input)
  },
  beforeDestroy() {
    try {
      if (this.modelType === 'array') {
        this.form.model[this.name].splice(this.getIndex(), 1)
      }
    } catch (e) {}
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
      let type = Schema.getType(this.input)
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
    getIndex() {
      let el = closest(this.$el, '[data-index]')
      return el && el.getAttribute('data-index')
    },
    onChange(val) {
      if (this.modelType === 'array' && this.getIndex()) {
        this.form.model[this.name][this.getIndex()] = val
        this.form.validateInput(this.name, this.getIndex())
      } else {
        this.form.model[this.name] = val
        this.form.validateInput(this.name)
      }
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

      if (this.modelType === 'array') {
        if (!this.form.model[this.name]) {
          this.form.model[this.name] = []
        }
        this.form.model[this.name].push(this.currentValue)
      } else {
        this.form.model[this.name] = this.currentValue
      }
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
