<template>
  <div class="award_bar">
    <div class="award">{{award}}</div>
    <div class="awardee">{{awardee}}</div>
    <div class="brand">
      <img class="logo_mhac" src="/static/color-team-logos/mhaclogo.png" alt="Midsouth Home School Athletic Conference Logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'awardbar',
  data () {
    return {
      award: '',
      awardee: '',
      team: {} // possibly to change colors
    }
  }
}
</script>

<style lang="less" scoped>
.award_bar {
  background-color: #2784C3;
  display: flex;
  width: 600px;
  height: 45px;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.brand {
    position:absolute;
    right: 0;
    display: flex;
    flex-flow: row;
    justify-content: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    background-color: #fff;
    height: 100%;
    width: 82.5px;
    transform: skewX(-45deg);
    padding-right: 10px;
    border-left: 2px #0C4B75 solid;
    border-right: 2px #0C4B75 solid;

    .logo_mhac {
      display: flex;
      flex-flow: row;
      justify-content: center;
      width: 100%;
      transform: skewX(45deg);
    }

    &:before{
      content: '';
      display: inline-block;
      width: 5px;
      background-color: #fff;
      transform: skewX(0) translateX(-12px) translateY(-8px);
      height: 35px;
      position: absolute;
    }

    &:after{
      content: '';
        display: inline-block;
        width: 4px;
        background-color: #fff;
        transform: skewX(0) translateX(9px) translateY(30px);
        height: 35px;
        position: absolute;
        right: 0;
    }
}
</style>
