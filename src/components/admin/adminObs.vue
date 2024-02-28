<template>
  <div>
    <h2>Manage WebSocketUrl</h2>
    <input type="text" v-model="websocketUrl" />
    <button @click="save">
      <template v-if="saving"> Saving</template>
      <template v-else>Save</template>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api/endpoints';

const websocketUrl = ref('');
const saving = ref(false);

const getCurrentWebsocketInfo = () => {
  api.getWebSocketUrl().then(response => {
    websocketUrl.value = response.data.webSocketUrl;
  });
};

const handleSuccess = () => {
  // Clear successful_saves after 10 seconds
  console.log("handleSuccess")
  setTimeout(() => {
    saving.value = false;
  }, 5000);
};

const save = () => {
  console.log(websocketUrl)
  saving.value = true;
  api.updateWebSocketUrl({ webSocketUrl: websocketUrl.value }).then(response => {
    websocketUrl.value = response.data.webSocketUrl;
    handleSuccess()
  });
};

getCurrentWebsocketInfo();
</script>

<style lang="less">
@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

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

button {
  background-color: var(--bg-color);
}

/* Add your other styles here */
</style>
