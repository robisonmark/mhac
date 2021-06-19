<template>
  <div class="content-right">
      <!-- <div class="content-right_image" :background-image="data.background_img"></div> -->
      <div class="content-right_image-container">
        <div class="content-right_image"></div>
      </div>
      <div class="content-right_container v-center">
        <div class="content-right_content">
          <h3>2021 - 18u Girls</h3>
          <h4>Chattanooga Patriots</h4>
          <p><span class="weight-light">Record (W-L-T):</span> 15-1-1</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'content_right',
  data () {
    return {

    }
  },
  props: [
    'data'
  ]

}
</script>

<style lang="less">
  @import "../../../assets/less/elements/typography.less";
  .content-right {
    display: flex;
    min-height: 200px;

    &_image {
      order: 1;
      background: url('../../../assets/img/MHAC_2-optimized.png');
      background-size: cover;
      background-position: center;
      width: 125%;
      height: 100%;
    }

    &_container {
      // one option is an svg background that creates what I am looking for to scale
      order: 2;
      background-color: #fff;
      text-align: right;
      padding: 1rem;
      transform-origin: right;
      position: relative;
      &:after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #fff;
        width: 1250px;
        max-height: 250px;
        z-index: 0;
        transform: skew(45deg);
        transform-origin: bottom;
        height: 100%;
      }
    }

    &_content {
      padding: 1rem;
      position: relative;
      z-index:1;
      color: #0C4B75;
      h3 {
        font-family: @montserrat;
        font-weight: 400;
        font-size: 1.5rem;
        font-kerning: normal;
        margin-bottom: .75rem;
        letter-spacing: .5px;
      }
      h4 {
        font-weight: 600;
        font-size: 1.1rem;
      }
      p{
        font-size: 1rem;
        font-weight: 600;
        .weight-light {
          font-weight: 200;
        }
      }
    }

     &_image-container{
      width: 65%;
    }
    &_container {
      width: 35%;
    }

    .v-center {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
