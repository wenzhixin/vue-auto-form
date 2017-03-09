import _ from 'lodash'

export function closest(el, selector) {
  const matchesSelector = el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    } else {
      el = el.parentElement
    }
  }
  return null
}

export function getType(input) {
  if (!input) {
    return
  }
  if (input.type === String) {
    if (input.rows === +input.rows) {
      return 'InputTextarea'
    }
    if (input.values.length) {
      return 'SelectString'
    }
    return 'InputText'
  }
  if (input.type === Number) {
    if (input.values.length) {
      return 'SelectNumber'
    }
    return 'InputNumber'
  }
  if (input.type === Boolean) {
    if (input.inputType === 'radio') {
      return 'InputRadio'
    }
    if (input.inputType === 'select') {
      return 'SelectBoolean'
    }
    return 'InputCheckbox'
  }
  if (input.type === Date) {
    return 'InputDate'
  }
  if (input.type === Array) {
    if (input.values.length) {
      return 'SelectArray'
    }
  }
}

export function getInput(input, name) {
  name.split('.').forEach(name => {
    if (/\d+/.test(name)) {
      input = input.$
    } else {
      input = input[name]
    }
    if (input.type === Object) {
      input = input.$
    }
  })
  return input
}

export function updateModel(model, unflatten) {
  // remove all
  for (let name in model) {
    delete model[name]
  }
  // remove array null
  let removeNulls = obj => {
    if (_.isArray(obj)) {
      for (let i = obj.length - 1; i >= 0; i--) {
        if (obj[i] === undefined || obj[i] === null) {
          obj.splice(i, 1)
        } else if (_.isArray(obj[i]) || _.isObject(obj[i])) {
          removeNulls(obj[i])
        }
      }
    } else {
      for (let k in obj) {
        if (_.isArray(obj[k]) || _.isObject(obj[k])) {
          removeNulls(obj[k])
        }
      }
    }
  }
  removeNulls(unflatten)
  // update
  for (let name in unflatten) {
    model[name] = unflatten[name]
  }
}