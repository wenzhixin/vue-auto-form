# vue-auto-form

vue-auto-form is a [`vue2`](https://github.com/vuejs/vue) component that helpers to easily create basic forms with automatic insert and update events, and automatic reactive validation.

## Installation

```
npm install vue-auto-form --save
```

And then:
```
import AutoForm from 'vue-auto-form'

<auto-form :schema="schema" :model="model" @submit="onSubmit"></auto-form>
```

## Demo

[Live](https://wenzhixin.github.io/vue-auto-form/)

[Source](https://github.com/wenzhixin/vue-auto-form/tree/master/examples)

## Example

```vue
<template>
<auto-form :schema="schema" :model="model" @submit="onSubmit"></auto-form>
</template>

<script>
import AutoForm from 'vue-auto-form'

// AutoForm.setTemplate('element')
// AutoForm.setLocale('zh_cn')

export default {
  components: {
    AutoForm
  },
  data () {
    return {
      schema: {
        title: {
          type: String,
          label: 'Title',
          max: 50
        },
        author: {
          type: String,
          label: 'Author'
        },
        copies: {
          type: Number,
          label: 'Number of copies',
          min: 0
        },
        lastCheckedOut: {
          type: Date,
          label: 'Last date this book was checked out',
          optional: true
        },
        summary: {
          type: String,
          label: 'Brief summary',
          rows: 5,
          optional: true,
          max: 1000
        }
      },
      model: {}
    }
  },
  methods: {
    onSubmit () {
      console.log(this.model)
    }
  }
}
</script>
```

## Themes

```js
AutoForm.setTemplate(template_name)
```

* [bootstrap3](https://github.com/twbs/bootstrap)
* bootstrap3_horizontal
* [element](https://github.com/ElemeFE/element)
* element_horizontal

## Locales

```js
AutoForm.setLocale(locale_name)
```

* en_us
* zh_cn

## AutoForm Properties

### schema

See the "Schema Rules" section.

### model

The data of form component, if model has an [id] property, the type of the form is `update`, otherwise is `insert`.

### id

This property is use to de determine the type of the form is `insert` or `update` by `model[id]`.

The default value is `'id'`.

### showSubmit

You can hide the submit button when you use dialog.

The default value is `true`.

### submitLabel

The label of the submit button.

The default value is `Submit`.

## AutoForm methods

### validate()

The method to validate the whole form.

### validateInput(name, value)

The method to validate a certain form input.

### submit

The method to submit the form manually.

### reset(force = false)

Reset all the fields and remove validation result.

## AutoForm Events

### submit

Triggers when submit the form or call `submit()` method manually.

## Schema Rules

Here are some specifics about the various rules you can define in your schema.

### type

`type` can be a standard Javascript object like:

* `String`
* `Number`
* `Boolean`
* `Date`
* `Array`
* `Object`

The default value is `String`.

### inputType

`inputType` can be a standard input type like:

* `text`
* `password`
* `number`
* `url`

The default value is `text` when the `type` is `String`,
and `number` when the `type` is `Number`.

### arrayType

`arrayType` is the array type, it can be `String`, `Number` or `Date`, only works when type is `Array`.

The default value is `String`.

### label

A string that will be used to refer to this field in validation error messages. The default is an inflected (humanized) derivation of the key name itself. For example, the key "firstName" will have a default label of "First Name".

### placeholder

The placeholder of input or select.

The default value is `(Select One)` when it is select.

### optional

By default, all keys are required. Set `optional: true` to change that.

### min/max

* If `type` is `Number` or `arrayType` is `Number`,
these rules define the minimum or maximum numeric value.
* If `type` is `String` or `arrayType` is `String`,
these rules define the minimum or maximum string length.
* If type is `Date` or `arrayType` is `Date`, these rules define the minimum or maximum date.

### rows

The number of rows of `textarea`, if you want to use `textarea` you can set this option.

### decimal

Set to `true` if type is `Number` or `inputType` is `Number` and you want to allow non-integers. The default value is `false`.

### step

Define the step of the number input. Used only when `type` is `Number`.

### unit

Define the unit of the input.

### minCount/maxCount

Define the minimum or maximum array length. Used only when `type` is `Array`.

### values

An array of values that define the options of `select`. It can be a normal array or an array contain label and value, for example:
```js
[1, 2, 3]

['One', 'Two', 'Three']

[
  {
    label: 'One', value: 1
  },
  {
    label: 'Two', value: 2
  }
]
```

### defaultValue

Set this to any value that you want to be used as the default when an object does not include this field or has this field set to undefined. Default values are set only when cleaning non-modifier objects.

### trueLabel/falseLabel

Define the true or false label when `type` is `Boolean`.

### showType

Define what type you want to show the input, it can be `''`, `insert`, `update` or custom function.

### disableType

Define what type you want to disable the input, it can be `''`, `insert`, `update` or custom function.

### component

Use your custom component.

### validate

Use your custom validate.

### regEx

Any regular expression that must be matched for the key to be valid, or an array of regular expressions that will be tested in order.

The `AutoForm.Schema.RegEx` object defines standard regular expressions you can use as the value for the regEx key.

* `AutoForm.Schema.RegEx.Email` for emails (uses a permissive regEx recommended by W3C, which most browsers use)
* `AutoForm.Schema.RegEx.Domain` for external domains and the domain only (requires a tld like .com)
* `AutoForm.Schema.RegEx.WeakDomain` for less strict domains and IPv4 and IPv6
* `AutoForm.Schema.RegEx.IP` for IPv4 or IPv6
* `AutoForm.Schema.RegEx.IPv4` for just IPv4
* `AutoForm.Schema.RegEx.IPv6` for just IPv6
* `AutoForm.Schema.RegEx.Url` for http, https and ftp urls
* `AutoForm.Schema.RegEx.Id` for IDs generated by Random.id() of the random package, also usable to validate a relation id.

### $

`$` can be use to define the child type or child schema when `type` is `Array` or `Object`, for example:

```js
{
  tags: {
    type: Array,
    $: {
      type: String
    }
  }
}

{
  item: {
    type: Object,
    $: {
      name: {
        type: String
      },
      quantity: {
        type: Number
      }
    }
  }
}

{
  columns: {
    type: Array,
    $: {
      type: Object,
      $: {
        name: String
      }
    }
  }
}
```

## LICENSE

**NOTE:** vue-auto-form is licensed under the [The MIT License](https://github.com/wenzhixin/vue-auto-form/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can **Star** this repo, your support is my biggest motive force, thanks.
