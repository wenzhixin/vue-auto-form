import _ from 'lodash'
import sprintf from 'sprintf'

// this domain regex matches all domains that have at least one .
// sadly IPv4 Adresses will be caught too but technically those are valid domains
// this expression is extracted from the original RFC 5322 mail expression
// a modification enforces that the tld consists only of characters
const RX_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z-]*[a-z])?'
// this domain regex matches everythign that could be a domain in intranet
// that means "localhost" is a valid domain
const RX_NAME_DOMAIN = '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\\.|$))+'
// strict IPv4 expression which allows 0-255 per oktett
const RX_IPv4 = '(?:(?:[0-1]?\\d{1,2}|2[0-4]\\d|25[0-5])(?:\\.|$)){4}'
// strict IPv6 expression which allows (and validates) all shortcuts
const RX_IPv6 = '(?:(?:[\\dA-Fa-f]{1,4}(?::|$)){8}' + // full adress
  '|(?=(?:[^:\\s]|:[^:\\s])*::(?:[^:\\s]|:[^:\\s])*$)' + // or min/max one '::'
  '[\\dA-Fa-f]{0,4}(?:::?(?:[\\dA-Fa-f]{1,4}|$)){1,6})' // and short adress
// this allows domains (also localhost etc) and ip adresses
const RX_WEAK_DOMAIN = '(?:' + [RX_NAME_DOMAIN, RX_IPv4, RX_IPv6].join('|') + ')'

const RegEx = {
  // We use the RegExp suggested by W3C in http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
  // This is probably the same logic used by most browsers when type=email, which is our goal. It is
  // a very permissive expression. Some apps may wish to be more strict and can write their own RegExp.
  Email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

  Domain: new RegExp('^' + RX_DOMAIN + '$'),
  WeakDomain: new RegExp('^' + RX_WEAK_DOMAIN + '$'),

  IP: new RegExp('^(?:' + RX_IPv4 + '|' + RX_IPv6 + ')$'),
  IPv4: new RegExp('^' + RX_IPv4 + '$'),
  IPv6: new RegExp('^' + RX_IPv6 + '$'),
  // URL RegEx from https://gist.github.com/dperini/729294
  // http://mathiasbynens.be/demo/url-regex
  Url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
  // unique id from the random package also used by minimongo
  // character list: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L88
  // string length: https://github.com/meteor/meteor/blob/release/0.8.0/packages/random/random.js#L143
  Id: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/
}

import Locales from '../locales'
let Messages = Locales.en_us

export default {
  RegEx,
  setLocale (locale) {
    Messages = Locales[locale]
  },
  getDefaults (schema, defaults = {}) {
    const obj = {}
    schema = _.cloneDeep(schema)
    for (const name in schema) {
      obj[name] = this.getDefault(name, schema[name], defaults[name])
    }
    return obj
  },
  getDefault (name, input, defaults) {
    let isSelect = false
    const values = []

    if (input.inputType === 'select') {
      isSelect = true
    }
    if (input.values && input.values.length) {
      isSelect = true
      input.values.forEach(item => {
        if (_.isObject(item)) {
          values.push(item)
        } else {
          values.push({
            value: item,
            label: item
          })
        }
      })
    }
    if (input.$) {
      if (input.type === Object) {
        input.$ = this.getDefaults(input.$, defaults)
      } else {
        input.$ = this.getDefault(Messages.thisField, input.$)
        input.$.parent = input
      }
    }

    return _.defaults({
      values: values,
      defaultValue: defaults || (input.type === Array ? [] : undefined)
    }, input, {
      type: String,
      inputType: undefined,
      arrayType: String,
      label: _.startCase(name),
      placeholder: isSelect ? Messages.selectOne : undefined,
      optional: false,
      min: undefined,
      max: undefined,
      rows: undefined,
      decimal: false,
      step: undefined,
      unit: undefined,
      minCount: undefined,
      maxCount: undefined,
      trueLabel: Messages.yes,
      falseLabel: Messages.no,
      showType: undefined, // 'insert', 'update' or function to custom
      disableType: undefined, // 'insert', 'update' or function to custom
      component: undefined, // custom component
      validate: undefined // custom validate
    })
  },
  validate (value, input) {
    if (!input.optional &&
      (value === undefined || value === null || value === '')) {
      return sprintf(Messages.required, input)
    }
    if (input.optional) {
      return ''
    }
    if (input.type === String) {
      if (_.isInteger(input.min) && value.length < input.min) {
        return sprintf(Messages.minString, input)
      }
      if (_.isInteger(input.max) && value.length > input.max) {
        return sprintf(Messages.maxString, input)
      }
      if (input.regEx && !input.regEx.test(value)) {
        const regEx = _.find(Messages.regEx, item => {
          return RegEx[item.exp] === input.regEx
        })
        return sprintf(regEx ? regEx.msg : Messages.regEx[0].msg, input)
      }
    }
    if (input.type === Number) {
      if (!input.decimal && !_.isInteger(value)) {
        return sprintf(Messages.noDecimal, input)
      }
      if (_.isInteger(input.min) && value < input.min) {
        return sprintf(Messages.minNumber, input)
      }
      if (_.isInteger(input.max) && value > input.max) {
        return sprintf(Messages.maxNumber, input)
      }
    }
    if (input.type === Array) {
      if (_.isInteger(input.minCount) && value.length < input.minCount) {
        return sprintf(Messages.minCount, input)
      }
      if (_.isInteger(input.maxCount) && value.length > input.maxCount) {
        return sprintf(Messages.maxCount, input)
      }
    }
    return ''
  }
}
