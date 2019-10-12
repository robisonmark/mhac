<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'TeamManagement',
  data () {
    return {
      team: this.$route.params.team,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.con-management {
  display: grid;
  grid-template-columns: 21% auto;
  // grid-auto-rows: minmax(35px, auto);
}
</style>
