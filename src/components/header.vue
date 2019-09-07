<template>
  <header>
    <div class="logo">
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  header {
    display: grid;
    .logo {
      width: 120px;
      height: 145px;
      background-color: blue;
      position: relative;
      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 100%;
        border-top: 100px solid blue;
        border-right: 72px solid transparent;
      }
    }
  }
</style>
