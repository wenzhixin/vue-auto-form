<template>
<div class="panel panel-default">
  <div class="panel-heading">{{input.label}}</div>
  <div class="panel-body">
    <slot v-for="(input, name_) in input.$"
      :input="input" :name_="name + '.' + name_"/>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    input: Object
  }
}
</script>

<style>
</style>
