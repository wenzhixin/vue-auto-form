<template>
<div>
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="javascript:">Auto Form Examples</a>
    </div>
    <ul class="nav navbar-nav">
      <li>
        <a href="https://github.com/wenzhixin/vue-auto-form" target="_blank">
          Documentation
        </a>
      </li>
    </ul>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <p>
              The schema seen here is used to generate and validate the example auto form.
              Select one of the predefined examples to see what happens.
            </p>
            <div class="form-group">
              <label class="control-label">Themes</label>
              <select class="form-control"
                v-model="template"
                @change="changeTemplate">
                <option value="bootstrap3">Bootstrap3</option>
                <option value="bootstrap3_horizontal">Bootstrap3 Horizontal</option>
                <option value="element">Element UI</option>
                <option value="element_horizontal">Element UI Horizontal</option>
              </select>
            </div>
            <div class="form-group">
              <label class="control-label">Locales</label>
              <select class="form-control"
                v-model="locale"
                @change="changeLocale">
                <option value="en_us">English</option>
                <option value="zh_cn">Chinese</option>
              </select>
            </div>
            <div class="form-group">
              <label class="control-label">Schema</label>
              <select class="form-control" v-model="example" @change="onChange">
                <option :value="e" v-for="(e, i) in examples" :key="i">
                  {{e.title}}
                </option>
              </select>
            </div>
            <div class="form-group">
              <textarea class="form-control" rows="10"
                :value="example.schema | json"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="panel panel-default">
          <div class="panel-body">
            <auto-form :schema="example.schema" :model="form" @submit="onSubmit"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AutoForm from '../src'

if (window.localStorage['template']) {
  AutoForm.setTemplate(window.localStorage['template'])
}
if (window.localStorage['locale']) {
  AutoForm.setLocale(window.localStorage['locale'])
}

export default {
  components: {
    AutoForm
  },
  data () {
    const examples = [
      {
        title: 'One required string field',
        schema: {
          name: {
            type: String
          }
        }
      },
      {
        title: 'Field with custom label',
        schema: {
          name: {
            type: String,
            label: 'Your full name',
            defaultValue: 'My name'
          }
        }
      },
      {
        title: 'Password',
        schema: {
          password: {
            type: String,
            inputType: 'password'
          }
        }
      },
      {
        title: 'Text area with min and max text length',
        schema: {
          description: {
            type: String,
            min: 20,
            max: 1000,
            rows: 5
          }
        }
      },
      {
        title: 'Number field',
        schema: {
          favoritePositiveInteger: {
            type: Number,
            min: 1
          }
        }
      },
      {
        title: 'Decimal number field',
        schema: {
          favoritePositiveNumber: {
            type: Number,
            min: 1,
            decimal: true,
            step: 0.01
          }
        }
      },
      {
        title: 'Date',
        schema: {
          birthday: {
            type: Date,
            optional: true,
            label: 'Your birthday',
            min: new Date('2016-01-01T00:00:00.000Z'),
            defaultValue: new Date('2016-10-18T00:00:00.000Z')
          }
        }
      },
      {
        title: 'URL custom type',
        schema: {
          url: {
            type: String,
            inputType: 'url',
            label: 'URL',
            regEx: AutoForm.Schema.RegEx.Url
          }
        }
      },
      {
        title: 'Define unit',
        schema: {
          money: {
            type: String,
            label: '单价',
            unit: '元'
          }
        }
      },
      {
        title: 'Boolean checkbox with default value',
        schema: {
          agree: {
            type: Boolean,
            label: 'Do you agree?',
            defaultValue: true
          }
        }
      },
      {
        title: 'Boolean radios',
        schema: {
          agree: {
            type: Boolean,
            inputType: 'radio',
            label: 'Do you agree?',
            trueLabel: 'Yes, I agree',
            falseLabel: 'No, I do NOT agree'
          }
        }
      },
      {
        title: 'Boolean select',
        schema: {
          agree: {
            type: Boolean,
            inputType: 'select',
            label: 'Do you agree?',
            trueLabel: 'Yes, I agree',
            falseLabel: 'No, I do NOT agree'
          }
        }
      },
      {
        title: 'Select with numeric value',
        schema: {
          choose: {
            type: Number,
            values: [1, 2, 3],
            optional: true,
            label: 'Choose a number'
          }
        }
      },
      {
        title: 'Select with string value',
        schema: {
          choose: {
            type: String,
            values: ['One', 'Two', 'Three'],
            defaultValue: 'One',
            optional: true,
            label: 'Choose a number'
          }
        }
      },
      {
        title: 'Select with options',
        schema: {
          choose: {
            type: Number,
            values: [
              {
                label: 'One',
                value: 1
              },
              {
                label: 'Two',
                value: 2
              },
              {
                label: 'Three',
                value: 3
              }
            ],
            optional: true,
            label: 'Choose a number'
          }
        }
      },
      {
        title: 'Multiple select with min and max',
        schema: {
          colors: {
            type: Array,
            values: [
              {
                label: 'Red',
                value: 'red'
              },
              {
                label: 'Orange',
                value: 'orange'
              },
              {
                label: 'Yellow',
                value: 'yellow'
              },
              {
                label: 'Green',
                value: 'green'
              },
              {
                label: 'Blue',
                value: 'blue'
              },
              {
                label: 'Purple',
                value: 'purple'
              }
            ],
            defaultValue: ['red', 'blue'],
            minCount: 2,
            maxCount: 5,
            label: 'What are your favorite colors?'
          }
        }
      },
      {
        title: 'Multiple numbers',
        schema: {
          numbers: {
            type: Array,
            arrayType: Number,
            values: [
              {
                label: 'One',
                value: 1
              },
              {
                label: 'Two',
                value: 2
              },
              {
                label: 'Three',
                value: 3
              }
            ]
          }
        }
      },
      {
        title: 'A Book Example',
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
        }
      },
      {
        title: 'Optional array of strings',
        schema: {
          tags: {
            type: Array,
            $: {
              type: String
            }
          }
        }
      },
      {
        title: 'Object field',
        schema: {
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
      },
      {
        title: 'Array of object fields',
        schema: {
          columns: {
            type: Array,
            $: {
              type: Object,
              $: {
                name: {
                  type: String
                }
              }
            }
          }
        }
      },
      {
        title: 'Complex example',
        schema: {
          table: {
            type: String
          },
          columns: {
            type: Array,
            $: {
              type: Object,
              $: {
                name: {
                  type: String
                },
                type: {
                  type: String
                },
                length: {
                  type: Number
                },
                precision: {
                  type: Number,
                  optional: true
                },
                notNull: {
                  type: Boolean,
                  optional: true
                },
                isUnique: {
                  type: Boolean,
                  optional: true
                },
                isPrimarykey: {
                  type: Boolean,
                  optional: true
                }
              }
            }
          },
          distributed: {
            type: Object,
            $: {
              method: {
                type: Number,
                values: [{
                  value: 0,
                  label: 'DISTRIBUTED RANDOMLY'
                }, {
                  value: 1,
                  label: 'DISTRIBUTED BY KEY'
                }]
              },
              key: {
                type: String,
                optional: true
              }
            }
          }
        }
      }
    ]
    return {
      template: window.localStorage['template'] || 'bootstrap3',
      locale: window.localStorage['locale'] || 'en_us',
      example: examples[+window.localStorage['example'] || 0],
      examples: examples,
      form: {}
    }
  },
  methods: {
    changeTemplate (e) {
      window.localStorage['template'] = e.target.value
      window.location.reload()
    },
    changeLocale (e) {
      window.localStorage['locale'] = e.target.value
      window.location.reload()
    },
    onChange (e) {
      const index = this.examples.indexOf(this.example)
      window.localStorage['example'] = index
      this.form = {}
    },
    onSubmit () {
      window.alert('Submit data: ' + JSON.stringify(this.form))
    }
  },
  filters: {
    json (value) {
      const replace = {
        String,
        Number,
        Boolean,
        Date,
        Array,
        Object,
        'AutoForm.Schema.RegEx.Url': AutoForm.Schema.RegEx.Url
      }
      let json = JSON.stringify(value, (k, v) => {
        for (const name in replace) {
          if (v === replace[name]) {
            return name
          }
        }
        return v
      }, 2)

      for (const name in replace) {
        json = json.replace(new RegExp('"' + name + '"', 'g'), name)
      }
      return json.replace(/"([\w\$]*)":/g, '$1:')
    }
  }
}
</script>

<style>
.panel-body {
  padding: 15px;
}
</style>
