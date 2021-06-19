<template>
  <div class="content-center" id="content-block_center">
    <h2>Page Title</h2>
    <div class="container">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo veniam similique porro pariatur, at quod, nesciunt optio, aut beatae voluptates voluptatibus voluptas molestiae culpa. Culpa fuga eligendi ex sed sapiente?
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo veniam similique porro pariatur, at quod, nesciunt optio, aut beatae voluptates voluptatibus voluptas molestiae culpa. Culpa fuga eligendi ex sed sapiente?
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
    .content-center {
        text-align: center;
        padding: 1rem 1rem 2rem;

        h2 {
          padding-bottom: 1rem;
          font-family: @montserrat;
          font-weight: 400;
        }
        .container {
            width: 85%;
            text-align: left;
            margin: auto;
            max-width: 1260px;
            line-height: 1.3;
        }
    }
</style>
