<template>
<form @submit="onSubmit" :class="formClass">
  <template v-if="auto"
    v-for="(input, name) in formSchema">
    <div :is="getComponent('FormGroup')"
      v-if="isShow(input) && getGroup(input) === 'form'"
      :input="input"
      :error="errors[name]">
      <div :is="getComponent('LabelField')"
        :input="input"
        :name="name"
        slot="label"
        v-if="showLable(input)"/>
      <div :is="getComponent('InputField')"
        :input="input"
        :name="name"/>
      <div
        :is="getComponent('HelpField')"
        :error="errors[name]"
        slot="help"/>
    </div>

    <div :is="getComponent('ObjectGroup')"
      v-if="isShow(input) && getGroup(input) === 'object'"
      :input="input"
      :name="name">
      <template scope="props">
        <div :is="getComponent('FormGroup')"
          :input="props.input"
          :error="errors[props.name_]">
          <div :is="getComponent('LabelField')"
            :input="props.input"
            :name="props.name_"
            slot="label"
            v-if="showLable(props.input)"/>
          <div :is="getComponent('InputField')"
            :input="props.input" :name="props.name_"/>
          <div :is="getComponent('HelpField')"
            :error="errors[props.name_]"
            slot="help"/>
        </div>
      </template>
    </div>

    <div :is="getComponent('ArrayGroup')"
      v-if="isShow(input) && getGroup(input) === 'array'"
      :input="input"
      :name="name">
      <template scope="props">
        <div :is="getComponent('FormGroup')"
          v-if="isShow(props.input)"
          :input="props.input"
          :error="errors[props.name_]">
          <div :is="getComponent('InputField')"
            :input="props.input"
            :name="props.name_"/>
          <div :is="getComponent('HelpField')"
            :error="errors[props.name_]"
            slot="help"/>
        </div>
      </template>
    </div>

    <div :is="getComponent('ArrayGroup')"
      v-if="isShow(input) && getGroup(input) === 'array_object'"
      :input="input"
      :name="name">
      <template scope="props1">
        <div :is="getComponent('ObjectGroup')"
          v-if="isShow(props1.input)"
          :input="props1.input"
          :name="props1.name_"
          :showLable="false">
          <template scope="props2">
            <div :is="getComponent('FormGroup')"
              :input="props2.input"
              :error="errors[props2.name_]">
              <div :is="getComponent('LabelField')"
                :input="props2.input"
                :name="props2.name_"
                slot="label"
                v-if="showLable(props2.input)"/>
              <div :is="getComponent('InputField')"
                :input="props2.input" :name="props2.name_"/>
              <div :is="getComponent('HelpField')"
                :error="errors[props2.name_]"
                slot="help"/>
            </div>
          </template>
        </div>
      </template>
    </div>
  </template>

  <div :is="getComponent('FormGroup')"
    v-if="auto && showSubmit">
    <div :is="getComponent('Submit')"
      :label="getLabel('submit')"/>
  </div>

  <slot v-if="!auto"></slot>
</form>
</template>

<script>
import _ from 'lodash'
import sprintf from 'sprintf'
import { flatten, unflatten } from 'flat'
import Schema from './schema'
import Locales from './locales'
import { getType, getInput, updateModel } from './utils'

// components
import bootstrap3 from './components'
import bootstrap3_horizontal from './templates/bootstrap3-horizontal/components'
import element from './templates/element-ui/components'

const Components = {
  bootstrap3,
  bootstrap3_horizontal,
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
      formModel: flatten(this.model),
      formSchema: Schema.getDefaults(this.schema, this.model),
      errors: {}
    }
  },
  mounted() {
    this.reset()
  },
  computed: {
    formClass() {
      return Components[template].formClass
    },
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
      if (getType(input)) {
        return 'form'
      }
      if (input.type === Array) {
        if (getType(input.$)) {
          return 'array'
        }
        return 'array_object'
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
      this.$el.querySelectorAll('[name]').forEach(el => {
        let input = getInput(this.formSchema, el.name)
        valid = this.validateInput(el.name,
          this.formModel[el.name], input) && valid
      })
      callback(valid)
    },
    validateInput(name, value, input) {
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
          updateModel(this.model, unflatten(this.formModel))
          this.$emit('submit')
        } else {
          this.$nextTick(() => {
            let el = this.$el.querySelectorAll('[form-group-error] [name]')
            if (el && el[0]) el[0].focus()
          })
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
      this.formModel = flatten(val)
      this.formSchema = Schema.getDefaults(this.schema, val)
      this.reset()
    }
  }
}
</script>
