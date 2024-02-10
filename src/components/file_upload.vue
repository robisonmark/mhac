<template>
  <div class="container">
    <!-- UPLOAD -->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload files</h1>
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
          @change="filesChange($event.target.name, $event.target.files)" class="input-file" />
        <p v-if="isInitial">
          Drag your file(s) here to begin<br /> or click to browse
        </p>
        <p v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
      </div>
    </form>
    <div v-if="isFailed">
      <p>
        The following players were in the game, but don't exist in the roster:
      </p>
      <ul>
        <li v-for="number in uploadError.data.detail" :key="number">{{ number }}</li>
      </ul>
      <p>Please update your roster, or game file.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../api/endpoints.js';

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

const uploadedFiles = ref([]);
const uploadError = ref('');
const currentStatus = ref(null);
const uploadFieldName = 'file';

const fileCount = computed(() => uploadedFiles.value.length);

const refreshData = () => {
  emit('initNewGameStats', props.team_id);
};

const reset = () => {
  // reset form to initial state
  currentStatus.value = STATUS_INITIAL;
  uploadedFiles.value = [];
  uploadError.value = '';
};

const save = (formData) => {
  // upload data to the server
  currentStatus.value = STATUS_SAVING;

  api.sendStats(formData, props.game_id, props.team_id)
    .then(x => {
      uploadedFiles.value = [].concat(x);
      currentStatus.value = STATUS_SUCCESS;
    })
    .catch(err => {
      uploadError.value = err.response;
      currentStatus.value = STATUS_FAILED;
    });

  refreshData();
};

const filesChange = (fieldName, fileList) => {
  // handle file changes
  const formData = new FormData();

  if (!fileList.length) return;

  // append the files to FormData
  Array.from(Array(fileList.length).keys()).map(x => {
    formData.append(fieldName, fileList[x], fileList[x].name);
  });

  // save it
  save(formData);
};
</script>

<style>
.dropbox {
  outline: 2px dashed grey;
  /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
  /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
