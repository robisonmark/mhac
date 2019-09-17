<template>
  <div id="app">
    <headerComponent></headerComponent>
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
  },
  computed: {
    frontPageRoutes () {
      console.log(this.$router)
      return this.$router.options.routes.forEach((route) => {
        console.log(route)
        if (route.name === 'frontpages') {
          console.log(route)
          return route
        }
      })
    },
    teamManagementRoutes () {
      // console.log('test')
      let routes = this.$router.options.routes.forEach((route) => {
        // console.log('test')
        if (route.name === 'TeamManagement') {
          console.log(route)
          return route
        }
      })

      console.log(this.$route)
      return routes
    }
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
body {
  min-height: 100vh;
  margin: 0;
  /*Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f4f7f9+0,9fc7e3+21,8cbcde+25,2784c3+100 */
  background: rgb(244,247,249); /* Old browsers */
  background: -moz-linear-gradient(-45deg, rgba(244,247,249,1) 0%, rgba(159,199,227,1) 21%, rgba(140,188,222,1) 25%, rgba(39,132,195,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg, rgba(244,247,249,1) 0%,rgba(159,199,227,1) 21%,rgba(140,188,222,1) 25%,rgba(39,132,195,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg, rgba(244,247,249,1) 0%,rgba(159,199,227,1) 21%,rgba(140,188,222,1) 25%,rgba(39,132,195,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f4f7f9', endColorstr='#2784c3',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>
