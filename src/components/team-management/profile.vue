<template>
  <div class="hello">
    <h2>Team Profile</h2>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2:after {
  content: '';
  display: block;
  height: 40px;
  width: 100%;
  border-top: 1.5px solid #B42625;
  border-right: 2px solid #B42625;
  border-left: 2px solid transparent;
  position: relative;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  left: -23px;
  margin-top: .6rem;
}
</style>
