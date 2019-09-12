<template>
  <header>
    <div class="con-logo">
      <img class="logo" src="../assets/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
    </div>
    <nav class="top-hat">
    </nav>
    <nav class="main-nav">
    </nav>
  </header>
</template>

<script>
export default {
  name: 'headerComponent',
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
    .con-logo {
      width: 25%;
      height: 125px;
      background-color: #fff;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -4%;
      // transform: skew(-45deg);
      &:after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 100%;
        border-top: 125px solid #fff;
        border-right: 125px solid transparent;
      }
      .logo {
        width: 268px;
        height: auto;
        position: absolute;
        right: 0;
        // transform: skew(45deg);
      }
    }
  }
</style>
