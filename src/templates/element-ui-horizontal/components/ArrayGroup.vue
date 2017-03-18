<template>
<div>
  <label class="el-form-item__label el-col-6">{{input.label}}</label>
  <div class="el-form-item__content el-col-18">
    <div class="el-card box-card">
      <div class="el-card__body">
        <div class="text item"
          v-for="(item, i) in list"
          :key="name + '.' + i">
          <div class="left" v-if="showDelete">
            <button type="button" class="el-button el-button--primary" @click="onMinus(i)">
              <i class="el-icon-minus"></i>
            </button>
          </div>
          <div :class="{right: showDelete}">
            <slot :input="item" :name_="name + '.' + i"></slot>
          </div>
        </div>
        <div class="text item">
          <button type="button" class="el-button el-button--primary" @click="onPlus">
            <i class="el-icon-plus"></i>
          </button>
        </div>
      </div>
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
.el-card {
  margin-bottom: 22px;
}
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
}
</style>
