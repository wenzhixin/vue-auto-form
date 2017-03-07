<template>
<form @submit="onSubmit">
  <template v-if="auto"
    v-for="(input, name) in formSchema">
    <div :is="getComponent('FormGroup')"
      v-if="isShow(input) && getGroup(input) === 'form'"
      :error="errors[name]">
      <div :is="getComponent('LabelField')"
        :input="input"
        :name="name"
        v-if="showLable(input)"/>
      <div :is="getComponent('InputField')"
        :input="input" :name="name"/>
      <div :is="getComponent('HelpField')"
        :error="errors[name]"/>
    </div>

    <div :is="getComponent('ArrayGroup')"
      v-if="isShow(input) && getGroup(input) === 'array'"
      :input="input"
      :name="name">
      <template scope="props">
        <div :is="getComponent('FormGroup')"
          v-if="isShow(props.input)"
          :error="errors[name + '__' + props.index]">
          <div :is="getComponent('InputField')"
            :input="props.input"
            :name="name"
            modelType="array"/>
          <div :is="getComponent('HelpField')"
            :error="errors[name + '__' + props.index]"/>
        </div>
      </template>
    </div>

    <div :is="getComponent('FormGroup')" v-if="showSubmit">
      <div :is="getComponent('Submit')"
        :label="getLabel('submit')"/>
    </div>
  </template>
  <slot v-else></slot>
</form>
</template>

<script>
import _ from 'lodash'
import sprintf from 'sprintf'
import Schema from './schema'
import Locales from './locales'

// components
import bootstrap3 from './components'
import element from './templates/element-ui/components'

const Components = {
  bootstrap3,
  element
}
let template = 'bootstrap3'
let locale = 'en_us'

export default {
  Schema: Schema,
  setTemplate(val) {
    template = val
  },
  setLocale(val) {
    locale = val
    Schema.setLocale(val)
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    schema: {
      type: Object,
      required: true
    },
    auto: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: 'id'
    },
    showSubmit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formSchema: Schema.getDefaults(this.schema, this.model),
      errors: {}
    }
  },
  mounted() {
    this.reset()
  },
  computed: {
    locale() {
      return Schema.Messages
    },
    type() {
      return this.model[this.id] ? 'update' : 'insert'
    }
  },
  methods: {
    getTemplate() {
      return template
    },
    getComponent(name) {
      if (Components[template] && Components[template][name]) {
        return Components[template][name]
      }
      return Components.bootstrap3[name]
    },
    getGroup(input) {
      if (Schema.getType(input)) {
        return 'form'
      }
      if (input.type === Array && Schema.getType(input.$)) {
        return 'array'
      }
      if (input.type === Object) {
        return 'object'
      }
    },
    getLabel(name) {
      return Locales[locale][name]
    },
    isShow(input) {
      if (!input.showType) {
        return true
      }
      return input.showType === this.type
    },
    reset() {
      this.errors = {}
    },
    validate(callback) {
      let valid = true
      for (name in this.formSchema) {
        let input = this.formSchema[name]
        if (!this.isShow(input)) {
          continue
        }
        if (this.getGroup(input) === 'array') {
          (this.model[name] || []).forEach((value, i) => {
            valid = this.validateInput(name, i) && valid
          })
        } else {
          valid = this.validateInput(name) && valid
        }
      }
      callback(valid)
    },
    validateInput(name, index) {
      let value = this.model[name]
      let input = this.formSchema[name]
      if (index !== undefined) {
        value = this.model[name][index]
        input = this.formSchema[name].$
        name = name + '__' + index
      }
      let error = Schema.validate(value, input)
      if (error) {
        this.errors[name] = error
      } else {
        delete this.errors[name]
      }
      this.errors = Object.assign({}, this.errors)
      return !error
    },
    onSubmit(e) {
      if (e) e.preventDefault()
      this.validate(valid => {
        if (valid) {
          this.$emit('submit')
        } else {
          let name = _.keys(this.errors)[0]
          name = sprintf('[data-name="%s"]', name)
          this.$el.querySelectorAll(name)[0].focus()
        }
      })
      return false
    },
    showLable(input) {
      if (input.type === Boolean &&
        (!input.inputType || input.inputType === 'checkbox')) {
        return false
      }
      return true
    }
  },
  watch: {
    schema(val) {
      this.formSchema = Schema.getDefaults(val, this.model)
      this.reset()
    },
    model(val) {
      this.formSchema = Schema.getDefaults(this.schema, val)
      this.reset()
    }
  }
}
</script>
