<template>
  <div id="multiselect" @click="showOptions = true">
    <div class="chip" v-for="(chip, idx) in value" :key="idx">
      {{chip}}
    </div>
    <div class="select--list" v-show="showOptions">
      <label v-for="(option, idx) in options" :key="idx">
        <input type="checkbox" :v-model="value"/>
        {{option[trackby]}}
      </label>
    </div>
    <!-- <select multiple>
      <option v-for="(option, idx) in options" :key="idx" :v-model="value">{{option[trackby]}}</option>
    </select> -->
  </div>
</template>

<script>
export default {
  name: 'multiselect',

  data: () => ({
    showOptions: false
  }),

  props: ['trackby', 'options', 'value'],

  methods: {

  }
}
</script>

<style>
#multiselect {
  width: 100px;
  height: 50px;
}
</style>
