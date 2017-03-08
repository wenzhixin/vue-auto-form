<template>
<div :class="{'form-group': showLable}">
  <label class="col-sm-3 control-label" v-if="showLable">
    {{input.label}}
  </label>
  <div :class="{'col-sm-9': showLable}">
    <div class="panel panel-default">
      <div class="panel-body">
        <slot v-for="(input, name_) in input.$"
          :input="input" :name_="name + '.' + name_"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object,
    showLable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style>
</style>
