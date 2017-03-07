<template>
<div class="el-card box-card">
  <div class="el-card__header">{{input.label}}</div>
  <div class="el-card__body">
    <div class="text item"
      :data-index="i"
      v-for="(item, i) in list"
      :key="item.key_">
      <div class="left" v-if="input.optional === true || list.length > 1">
        <button type="button" class="el-button el-button--primary" @click="onMinus(i)">
          <i class="el-icon-minus"></i>
        </button>
      </div>
      <div :class="{right: input.optional === true || list.length > 1}">
        <slot :input="item" :index="i"></slot>
      </div>
    </div>
    <div class="text item">
      <button type="button" class="el-button el-button--primary" @click="onPlus">
        <i class="el-icon-plus"></i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object
  },
  data() {
    return {
      list: this.input.optional === true ? [] : [this.cloneItem()]
    }
  },
  methods: {
    cloneItem() {
      let item = _.clone(this.input.$)
      item.key_ = +new Date()
      return item
    },
    onPlus() {
      this.list.push(this.cloneItem())
    },
    onMinus(i) {
      this.list.splice(i, 1)
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
