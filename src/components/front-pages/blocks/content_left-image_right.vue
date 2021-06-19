<template>
  <div class="content-left" id="content-block">
    <div class="content-left_container v-center">
      <div class="content-left_content">
        <h2>Section Title</h2>
        <p>Section Content</p>
      </div>
    </div>
    <div class="content-left_image-container">
      <div class="content-left_image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'content_left',
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

  .content-left {
    display: flex;
    min-height: 200px;

    &_image {
      order: 2;
      background: url('../../../assets/img/MHAC_2-optimized.png');
      background-size: cover;
      background-position: center;
      width: 125%;
      height: 100%;
    }

    &_container {
      order: 1;
      background-color: #fff;
      text-align: left;
      padding: 1rem;
      transform-origin: right;
      position: relative;
      &:after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        background: #fff;
        width: 1250px;
        max-height: 250px;
        z-index: 0;
        transform: skew(-45deg);
        transform-origin: bottom right;
        height: 100%;
      }
    }

    &_content {
      padding: 1rem;
      position: relative;
      z-index: 1;
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

    &_image-container {
      order: 2;
    }

    &_image-container{
      width: 65%;
    }
    &_container {
      width: 35%;
    }

    .v-center {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
