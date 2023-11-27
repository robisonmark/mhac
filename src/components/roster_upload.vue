<!-- App.vue -->

<!-- HTML Template -->
<template>
    <div class="container">
      <!--UPLOAD-->
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
                <h1>Upload files</h1>
                <div class="dropbox">
                <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                   class="input-file">
                    <p v-if="isInitial">
                    Drag your file(s) here to begin<br> or click to browse
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
                <li v-for="number in uploadError.data.detail" :key="number">{{ number }} </li>
              </ul>
              <p> Please update your roster, or game file. </p>
            </div>
    </div>
</template>

<!-- Javascript -->
<script>

// import { upload } from './file-upload.service';

import { api } from '../api/endpoints.js'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'fileUpload',
  data () {
    return {
      uploadedFiles: [],
      uploadError: '',
      currentStatus: null,
      uploadFieldName: 'file',
      activeYear: {
        name: '',
        year: ''
      }
    }
  },
  props: [
    'team_id'
  ],
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    getActiveYear () {
      api.getYear(true).then(response => {
        // console.log(response.data)
        this.activeYear = response.data
      })
    },
    refresh_data () {
      this.$root.$emit('initNewGameStats', this.team_id)
    },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = ''
    },
    async save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

        await api.sendRoster(formData, this.team_id, this.activeYear.year)
          .then(response => {
            console.log(response, "here")
            this.uploadedFiles = [].concat(response)
            this.currentStatus = STATUS_SUCCESS
          })
          .catch(err => {
            console.log("error handler", err, err.response)
            this.uploadError = err.response
            this.currentStatus = STATUS_FAILED
            // this.$emit('uploadError', this.uploadError)
            
            // this.reset()
          })
          .finally(() => {
            console.log("here too")
            this.$emit('toggleModal')
            this.refresh_data()
            this.reset()
          }
        )
      },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  },
  created () {
    this.getActiveYear()
  }
}

</script>

<style >

  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
