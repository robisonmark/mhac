<template>
  <div>
    <div class="chip" v-for="(chip, idx) in value" :key="idx">
      {{chip}}
    </div>
    <select multiple>
      <option v-for="(option, idx) in options" :key="idx" :v-model="value">{{option[trackby]}}</option>
    </select>
  </div>
</template>

<script>
export default {
    name: 'multiselect',

    data: () => ({

    }),

    props: ['trackby', 'options', 'value'],

    methods: {

    }
}
</script>

<style>

</style>