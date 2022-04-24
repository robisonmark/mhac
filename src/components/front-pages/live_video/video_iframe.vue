<template>
  <div class="scoreboard">
    <iframe :src="streaming_url" :title="game_title" allowfullscreen="true"></iframe>
  </div>
</template>

<script>
export default {
  name: 'livestream',
  data () {
    return {
      streaming_url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe',
      game_title: 'Game 1 | Western Kentucky vs. Tennessee Heat'
    }
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="less">
</style>
