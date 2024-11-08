<template>
  <div class="container">
    <!-- UPLOAD -->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving" ref="uploadForm">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../api/endpoints.js';

const props = defineProps({
  team_id: String,
  roster_level: String
});

const STATUS_INITIAL = 0;
const STATUS_SAVING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

const uploadedFiles = ref([]);
const uploadError = ref([]);
const currentStatus = ref(null);
const uploadFieldName = 'file';
const activeYear = ref({ name: '', year: '' });

const isInitial = computed(() => currentStatus.value === STATUS_INITIAL);
const isSaving = computed(() => currentStatus.value === STATUS_SAVING);
const isSuccess = computed(() => currentStatus.value === STATUS_SUCCESS);
const isFailed = computed(() => currentStatus.value === STATUS_FAILED);
const fileCount = computed(() => uploadedFiles.value.length);

const emit = defineEmits(['toggleModal', 'uploadError'])

const getActiveYear = () => {
  api.getYear(true).then(response => {
    activeYear.value = response.data;
  });
};

const refreshData = () => {
  console.log("in Refresh");
};

const reset = () => {
  // console.log("In Reset");
  currentStatus.value = STATUS_INITIAL;
  uploadedFiles.value = [];
  uploadError.value = '';
};

const save = (formData) => {
  currentStatus.value = STATUS_SAVING;
  console.log("Saving Data");
  api.sendRoster(formData, props.team_id, activeYear.value.year, props.roster_level)
    .then(response => {
      if (response.status === 200) {
        uploadedFiles.value = [].concat(response);
        currentStatus.value = STATUS_SUCCESS;
      } else {
        uploadError.value = response.response.data;
        currentStatus.value = STATUS_FAILED;
        emit('uploadError', uploadError.value);
      }
    })
    .finally(() => {
      emit('toggleModal');
      refreshData();
      reset();
    });
  formData.preventDefault();
  $refs.uploadForm.reset();
};

const filesChange = (fieldName, fileList) => {
  const formData = new FormData();

  if (!fileList.length) return;

  Array.from(Array(fileList.length).keys()).map(x => {
    formData.append(fieldName, fileList[x], fileList[x].name);
  });

  save(formData);
};

onMounted(() => {
  reset();
  getActiveYear();
});
</script>

<style>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
