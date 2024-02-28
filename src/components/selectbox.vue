<template>
  <select class="selectbox" :value="selected[trackby]" @change="handleChange">
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value=option[trackby]>
      <template v-if="trackby !== ''">{{ option[label] }}</template>
      <template v-else>{{ option }}</template>
    </option>
    <span class="selectbox--arrow"></span>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  options: { type: Array, required: true },
  trackby: { type: String, default: '', required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  modelValue: Object
})

const emit = defineEmits(['update:modelValue']);
const selected = ref(props.modelValue);

const handleChange = (event) => {
  const selectedIndex = event.target.selectedIndex - 1;
  const selectedOption = props.options[selectedIndex];
  selected.value = selectedOption;
  console.log("selected", selectedOption)
  emit('update:modelValue', selectedOption); // Emit the entire object
};


watch(selected, (newValue, oldValue) => {
  console.log('Selected value changed:', newValue);
});


</script>

<style scoped lang="less">
.selectbox {
  position: relative;

  &--arrow {
    position: absolute;
    width: 40px;
    height: 45px;
    right: 1px;
    top: 1px;
    text-align: center;
    transition: transform 0.2s ease;
    transform: translate(0, 0);

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
