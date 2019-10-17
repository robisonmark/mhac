<template>
  <div class="hello">
    <h2>Stats</h2>
    <div class="" v-if="!gameSelected">
      <table id="table">
        <thead id="table-head-fixed">
          <tr>
            <th></th>
            <th>Date</th>
            <th>Opponent</th>
            <th>Missing Stats</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in pastGames" :key="game.uuid" :class="{ 'missing':  !game.missing_stats }">
            <td></td>
            <td>{{game.date}}</td>
            <td>{{game.opponent}}</td>
            <td>{{game.missing_stats}}</td>
            <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <editTable :columns="columns" :config="config" :tabledata="stats" v-model="newGameStats"></editTable>
    </div>
  </div>
</template>

<script>
// components
import editTable from '@/components/editTable'

export default {
  name: 'stats',
  data () {
    return {
      gameSelected: false,
      pastGames: [
        {
          'uuid': '4e091c9a-728d-4600-9b2c-cd826d3b3802',
          'date': '11/01/2019',
          'opponent': 'Tennessee Heat',
          'missing_stats': true
        },
        {
          'uuid': '83253524-8a39-4bea-b55f-fe7a6161080f',
          'date': '11/02/2019',
          'opponent': 'Western Kentucky Trailblazers',
          'missing_stats': false
        }
      ],
      columns: [
        {
          name: '#',
          icon: '',
          field_name: 'number',
          type: 'text'
        },
        {
          name: 'Last Name',
          icon: '',
          field_name: 'last_name',
          type: 'text'
        },
        {
          name: 'GS',
          icon: '',
          field_name: 'gs',
          type: 'checkbox'
        },
        {
          name: 'FGM',
          icon: '',
          field_name: 'fg_m',
          type: 'number'
        },
        {
          name: 'FGA',
          icon: '',
          field_name: 'fg_a',
          type: 'number'
        },
        {
          name: 'FG%',
          icon: '',
          field_name: 'fg%',
          type: 'text'
        },
        {
          name: '3PTM',
          icon: '',
          field_name: '3pt_m',
          type: 'number'
        },
        {
          name: '3PTA',
          icon: '',
          field_name: '3pt_a',
          type: 'number'
        },
        {
          name: '3PT%',
          icon: '',
          field_name: '3pt_%',
          type: 'number'
        },
        {
          name: 'FTM',
          icon: '',
          field_name: 'ft_m',
          type: 'number'
        },
        {
          name: 'FTA',
          icon: '',
          field_name: 'ft_a',
          type: 'number'
        },
        {
          name: 'FT%',
          icon: '',
          field_name: 'ft_%',
          type: 'number'
        },
        {
          name: 'RB OF',
          icon: '',
          field_name: 'rb_off',
          type: 'number'
        },
        {
          name: 'RB DE',
          icon: '',
          field_name: 'rb_def',
          type: 'number'
        },
        {
          name: 'RB TOT',
          icon: '',
          field_name: 'rb_tot',
          type: 'number'
        },
        {
          name: 'A',
          icon: '',
          field_name: 'a',
          type: 'number'
        },
        {
          name: 'TO',
          icon: '',
          field_name: 'to',
          type: 'number'
        },
        {
          name: 'A/T',
          icon: '',
          field_name: 'ato',
          type: 'number'
        },
        {
          name: 'BLK',
          icon: '',
          field_name: 'blk',
          type: 'number'
        },
        {
          name: 'PPG',
          icon: '',
          field_name: 'ppg',
          type: 'number'
        },
        {
          name: 'TPS',
          icon: '',
          field_name: 'tps',
          type: 'number'
        }
      ],
      config: {
        'page': 'stats'
      },
      newGameStats: {
      },
      stats: [
        {
          '#': 3,
          'last_name': 'O\'neal',
          'gs': true,
          'fg_m': 4,
          'fg_a': 5,
          'fg_%': 80,
          '3pt_m': 0,
          '3pt_a': 0,
          '3pt_%': 0,
          'ft_m': 10,
          'ft_a': 18,
          'ft_%': 55.5,
          'rb_off': 3,
          'rb_def': 10,
          'rb_tot': 13,
          'a': 2,
          'to': 0,
          'ato': 2,
          'blk': 1,
          'ppg': 22,
          'tps': 0
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
<style scoped lang="less">
table {
  width: 100%;
  border-collapse: collapse;
  // border-spacing: 0 5px;
  position: relative;
  z-index: 1;

  th, tr {
    text-align: left;
    .number {
      text-align: center;
    }
  }

  thead {
    tr {
      height: 40px;
    }
    &:before {
      content: '';
      display: block;
      height: 40px;
      width: calc(100% + 45px);
      // width: calc(100% + 15px);
      // border-top: 1px solid var(--bg-color);
      // border-right: 1px solid var(--bg-color);
      border-top: 1.5px solid #B42625;
      border-right: 2px solid #B42625;
      border-left: 2px solid transparent;
      position: absolute;
      -webkit-transform: skewX(-45deg);
      transform: skewX(-45deg);
      left: -23px;
    }
  }

  tbody {
    tr {
      background-color: #fff;
      height: 50px;
      border-bottom: 5px solid #CFCDCD;
      .add-button {
        cursor: pointer;
      }

      &.split-fields{
        td {
          border-right: 5px solid #CFCDCD;
          input[type="text"] {
            height: 50px;
            border: 0;
            outline: none;
          }
          &:last-child{
            border-right: 0px;
            // background-color: #CFCDCD;
          }
        }
      }

      // tr last child
      &:last-child {
        border-bottom: 0px;
        // background-color: #CFCDCD;
      }

      &.missing {
        background-color: #F0E9E9;
      }
    }
  }
  td {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
  }
}

</style>
