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
import _ from 'lodash'
import moment from 'moment'
import { getType } from '../utils'

import bootstrap3 from '../inputTypes'
import bootstrap3_horizontal from '../templates/bootstrap3-horizontal/inputTypes'
import element from '../templates/element-ui/inputTypes'
import element_horizontal from '../templates/element-ui-horizontal/inputTypes'

const Components = {
  bootstrap3,
  bootstrap3_horizontal,
  element,
  element_horizontal
}

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  props: {
    name: String,
    input: Object
  },
  data () {
    return {
      currentValue: ''
    }
  },
  mounted () {
    this.updateDefaultValue(this.input)
  },
  destroyed () {
    delete this.form.formModel[this.name]
    this.form.formModel = Object.assign({}, this.form.formModel)
  },
  computed: {
    form () {
      let parent = this.$parent
      while (parent.$options._componentTag !== 'auto-form') {
        parent = parent.$parent
      }
      return parent
    },
    type () {
      if (this.input.component) {
        return this.input.component
      }
      const type = getType(this.input)
      return type ? this.getComponent(type) : undefined
    },
    disabled () {
      if (!this.input.disableType) {
        return false
      }
      if (_.isFunction(this.input.disableType)) {
        return this.input.showType(this.form.getModel(), this.form.type)
      }
      return this.input.disableType === this.form.type
    }
  },
  methods: {
    onChange (val) {
      this.form.formModel[this.name] = val
      this.form.formModel = Object.assign({}, this.form.formModel)
      this.form.validateInput(this.name, val, this.input)
    },
    getComponent (name) {
      const template = this.form.getTemplate()
      if (Components[template] && Components[template][name]) {
        return Components[template][name]
      }
      const baseTemplate = template.split('_')[0]
      if (Components[baseTemplate] && Components[baseTemplate][name]) {
        return Components[baseTemplate][name]
      }
      return Components.bootstrap3[name]
    },
    updateDefaultValue (val) {
      this.currentValue = this.formatValue(val.defaultValue)
      this.form.formModel[this.name] = this.currentValue
      this.form.formModel = Object.assign({}, this.form.formModel)
    },
    formatInput (val) {
      const input = _.cloneDeep(val)
      if (input.type === Date) {
        input.min = this.formatValue(input.min)
        input.max = this.formatValue(input.max)
      }
      return input
    },
    formatValue (val) {
      if (val && this.input.type === Date) {
        return moment(val).format(DATE_FORMAT)
      }
      return val
    }
  },
  watch: {
    input (val) {
      this.updateDefaultValue(val)
    }
  }
}
</script>
