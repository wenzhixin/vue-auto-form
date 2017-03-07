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

### minCount/maxCount

Define the minimum or maximum array length. Used only when `type` is `Array`.

### values

An array of values that define the options of `select`. It can be a normal array or an array contain label and value, for example:
```
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

Define what type you want to show the input, it can be ` `, `insert` or `update`.

### disableType

Define what type you want to disable the input, it can be ` `, `insert` or `update`.
