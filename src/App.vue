<template>
  <div id="app">
    <headerComponent></headerComponent>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import headerComponent from '@/components/header'

export default {
  name: 'App',
  data () {
    return {

    }
  },
  components: {
    'headerComponent': headerComponent
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  /*color: #2c3e50;
  margin-top: 60px;*/
}
</style>
