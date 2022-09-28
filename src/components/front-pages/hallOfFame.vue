<template>
  <div class="container">
    <div class="page-styles">
      <template v-for="(component, key) in components">
        <component :is="component" :key="key"></component>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hallOfFame',
  data () {
    return {
      components: [
        'content-center',
        'content-left',
        'content-right',
        'content-left',
        'content-right'
      ]
    }
  },
  components: {
    'content-center': () => import('./blocks/content_center.vue'),
    'content-left': () => import('./blocks/content_left-image_right.vue'),
    'content-right': () => import('./blocks/content_right-image_left.vue')
  }
}
</script>

<style lang="less" scoped>
.page-styles {
 overflow: hidden;
 background: #fff;
}
</style>
