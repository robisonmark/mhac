<template>
  <div>
    <h2>Manage WebSocketUrl</h2>
    <input type="text" v-model="websocketUrl" />
    <button @click="save">
      Save
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api/endpoints';

const websocketUrl = ref('');

const getCurrentWebsocketInfo = () => {
  api.getWebSocketUrl().then(response => {
    console.log(response.data.webSocketUrl);
    websocketUrl.value = response.data.webSocketUrl;
  });
};

const save = () => {
  api.updateWebSocketUrl({ webSocketUrl: websocketUrl.value }).then(response => {
    websocketUrl.value = response.data.webSocketUrl;
  });
};

getCurrentWebsocketInfo();
</script>

<style scoped>
h2::after {
  content: '';
  display: block;
  height: 40px;
  width: calc(100% + 2.4rem);
  border-left: 2px solid transparent;
  position: absolute;
  transform: skewX(-45deg);
  top: 0;
  right: -20px;
  z-index: 5;
}

/* Add your other styles here */
</style>
