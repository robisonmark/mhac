<template>
  <div class="hello">
    <h2>Current Roster</h2>
    <editTable :columns="columns" :tabledata="roster"></editTable>
  </div>
</template>

<script>
// components
import editTable from '@/components/editTable'

export default {
  name: 'roster',
  data () {
    return {
      columns: [
        {
          name: 'Number',
          icon: ''
        },
        {
          name: 'First Name',
          icon: ''
        },
        {
          name: 'Last Name',
          icon: ''
        },
        {
          name: 'Position',
          icon: ''
        },
        {
          name: 'Age',
          icon: ''
        },
        {
          name: 'Birthdate',
          icon: ''
        },
        {
          name: 'Height',
          icon: ''
        }
      ],
      roster: [
        {
          number: 1,
          fname: 'Mark',
          lname: 'Robison',
          pos: 'SF',
          age: '32',
          bday: '04/12/1987',
          height: '5\'11"'
        }
      ]
    }
  },
  components: {
    'editTable': editTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
