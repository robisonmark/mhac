<template>
  <select class="selectbox" v-model="selected">
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option">
      <template v-if="$attrs.trackby !== ''">{{option[$attrs.trackby]}}</template>
      <template v-else>{{option}}</template>
    </option>
    <span class="selectbox--arrow"></span>
  </select>
</template>

<script>

export default {
  name: 'selectbox',
  data () {
    return {
    }
  },
  mixins: [],
  props: [
    'options',
    'value',
    'placeholder'
  ],
  computed: {
    selected: {
      get () {
        return this.value
      },
      set (selected) {
        this.$emit('input', selected)
      }
    }
  },
  watch: {
  },
  created () {
    this.$root.$on('close', payload => {
      this.open = false
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.selectbox {
  position: relative;
  // -webkit-appearance: none;
  // figure this out later

 &--arrow{
    position: absolute;
    width: 40px;
    height: 45px;
    right: 1px;
    top: 1px;
    text-align: center;
    -webkit-transition: -webkit-transform 0.2s ease;
    transition: -webkit-transform 0.2s ease;
    transition: transform 0.2s ease;
    transition: transform 0.2s ease, -webkit-transform 0.2s ease;

    &:before {
      position: relative;
      right: 0;
      top: 65%;
      color: #707070;
      margin-top: 4px;
      border-style: solid;
      border-width: 5px 5px 0;
      border-color: #707070 transparent transparent;
      content: "";
    }
 }
}
</style>
