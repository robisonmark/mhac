<template>
  <div :class='`score_block score_block-${location}`'>{{value}}</div>
</template>

<script>
export default {
  name: 'score',
  data () {
    return {

    }
  },

  props: [
    'location',
    'value'
  ]
}
</script>

<style lang="less">
  @import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
  .score_block {
    font-family: 'Teko', sans-serif;

    display: flex;
    flex-flow: row;
    margin: .5em;
    font-size: 3em;
  }
</style>
