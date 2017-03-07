<template>
<div class="panel panel-default">
  <div class="panel-heading">{{input.label}}</div>
  <ul class="list-group">
    <li class="list-group-item"
      :data-index="i"
      v-for="(item, i) in list"
      :key="item.key_">
      <div class="left" v-if="input.optional === true || list.length > 1">
        <button type="button" class="btn btn-primary" @click="onMinus(i)">
          <i class="glyphicon glyphicon-minus"></i>
        </button>
      </div>
      <div :class="{right: input.optional === true || list.length > 1}">
        <slot :input="item" :index="i"></slot>
      </div>
    </li>
    <li class="list-group-item">
      <button type="button" class="btn btn-primary" @click="onPlus">
        <i class="glyphicon glyphicon-plus"></i>
      </button>
    </li>
  </ul>
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
