<template>
<div class="form-group">
  <label class="col-sm-3 control-label">
    {{input.label}}
  </label>
  <div class="col-sm-9">
    <div class="panel panel-default">
      <ul class="list-group">
        <li class="list-group-item"
          v-for="(item, i) in list"
          :key="name + '.' + i">
          <div class="left" v-if="showDelete">
            <button type="button" class="btn btn-primary" @click="onMinus(i)">
              <i class="glyphicon glyphicon-minus"></i>
            </button>
          </div>
          <div :class="{right: showDelete}">
            <slot :input="item" :name_="name + '.' + i"/>
          </div>
        </li>
        <li class="list-group-item">
          <button type="button" class="btn btn-primary" @click="onPlus">
            <i class="glyphicon glyphicon-plus"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    name: String,
    input: Object
  },
  data () {
    return {
      index: 0,
      list: {}
    }
  },
  mounted () {
    this.reset()
  },
  computed: {
    showDelete () {
      return this.input.optional === true ||
        Object.keys(this.list).length > 1
    }
  },
  methods: {
    cloneItem () {
      return _.clone(this.input.$)
    },
    reset () {
      this.index = 0
      this.list = {}
      this.list[this.index++] = this.cloneItem()
      this.list = Object.assign({}, this.list)
    },
    onPlus () {
      this.list[this.index++] = this.cloneItem()
      this.list = Object.assign({}, this.list)
    },
    onMinus (i) {
      delete this.list[i]
      this.list = Object.assign({}, this.list)
    }
  },
  watch: {
    input (val) {
      this.reset()
    }
  }
}
</script>

<style scoped>
.left {
  display: table-cell;
}
.left button {
  vertical-align: top;
  margin-right: 15px;
}
.right {
  display: table-cell;
  vertical-align: top;
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
