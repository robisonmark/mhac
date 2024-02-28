<template>
  <div :class='`score_block score_block-${props.location}`'>{{ props.score }}</div>
</template>

<script setup>
const props = defineProps({
  location: String,
  score: Number,
})
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');

.score_block {
  font-family: 'Teko', sans-serif;

  display: flex;
  flex-flow: row;
  font-size: 3em;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  backdrop-filter: brightness(85%);
  width: 40px;
}
</style>
