<template>
  <tr>
    <td>{{game.game}}</td>
    <td>{{game.date}}</td>
    <td>{{game.time}}</td>
    <td>
      <span v-html="game.matchup.team1"></span>
      <input v-model.number="game.matchup.scoreTeam1" />
      vs.
      <span v-html="game.matchup.team2"></span>
      <input v-model.number="game.matchup.scoreTeam2" />
    </td>
    <!-- <td class="final">
      <template v-if="game.matchup.scoreTeam1">
        {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
        <div>{{results(game.matchup)}}</div>
      </template>
      <template v-else>
        --
      </template> -->
    <!-- </td> -->
    <!-- <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td> -->
  </tr>
</template>

<script>
import { api } from '@/api/endpoints'

export default {
  data () {
    return {
      games: []
    }
  },
  props: [
    'game',
    'value'
  ],
  computed: {
  },
  watch: {
  },
  created () {
    this.initTourney()
  },
  methods: {
    initTourney () {
      this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      api.getTournamentInformation().then(response => {
        this.games = response.data.games
      })
        .catch(err => {
          console.log(err)
        })
    },
    results (matchup) {
      if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
        return matchup.team1
      } else {
        return matchup.team2
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
main{
  display:flex;
  flex-direction:row;
}
.round{
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:200px;
  list-style:none;
  padding:0;
}
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

/*
 *  General Styles
*/
body{
  font-family:sans-serif;
  font-size:small;
  padding:10px;
  line-height:1.4em;
}

li.game{
  padding-left:20px;
}

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{
    border-top:1px solid #aaa;
  }
</style>
