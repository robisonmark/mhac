<template>
  <div class="container">
    <div class="page-styles">
      <template v-for="(component, key) in components">
        <component :is="component"></component>
      </template>
    </div>
  </div>
</template>

<script>
import pages from '@/api/pages'

export default {
  name: 'hallOfFame',
  data () {
    return {
      champs: []
    }
  },
  components: {
    'content-center': () => import('./blocks/content_center.vue'),
    'content-left': () => import('./blocks/content_left-image_right.vue'),
    'content-right': () => import('./blocks/content_right-image_left.vue')
  },
  created () {
    this.getChamps()
  },
  methods: {
    getChamps() {
      pages.get('champion').then(response => {
        this.champs = response.champsList[0].content
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-styles {
 overflow: hidden;
 background: #fff;
}
</style>
