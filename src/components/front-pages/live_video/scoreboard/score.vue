<template>
  <div :class='`score_block score_block-${location}`'>
    {{value}}
  </div>
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
  .score_block {
    display: flex;
    flex-flow: row;
  }
</style>
