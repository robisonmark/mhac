<template>
  <div class="brackets">
    <template v-for="(lvlRound, key, idx) in bracketByRound" >
      <div class="levelHead levelHead-div" v-html="key" :key="key"></div>
      <div class="container" :key="idx">
        <!-- add class split-one for left side bracket -->
        <!-- add class split-two for right side of bracket -->
        <div class="split split-one">
          <div v-for="(round, index) in lvlRound" :key="index" class="round current" :class='`round-${index}`'>
            <div class="round-container">
              <div class="round-details">
                Round {{index}}
                <br>
              </div>
              <div class="round-matches">
                <div v-for="game in round" :key="game.matchupKey" class="matchup">
                  <template v-if="game.seeds.includes('Bye')">
                    <div></div>
                    <div></div>
                    <div></div>
                  </template>
                  <template v-else>
                    <div class="team team-top" :class="[(game.gameInfo) ? results(game.gameInfo.matchup.team1, game.gameInfo.matchup) : '']">
                      <span class="team-seed">{{(game.gameInfo) ? game.gameInfo.matchup.team1Seed : '' }}</span>
                      <span class="grow1">{{(game.gameInfo) ? game.gameInfo.matchup.team1 : ''}}</span>
                      <span class="team-score">{{(game.gameInfo) ? game.gameInfo.matchup.scoreTeam1 : '' }}</span>
                    </div>
                    <!-- <div class="team team-bottom" :class="[game.gameInfo.matchup.scoreTeam2 && game.gameInfo.matchup.team2 === results(game.gameInfo.matchup) ? 'winner' : '']"> -->
                      <div class="team team-bottom">
                      <span class="team-seed">{{(game.gameInfo) ? game.gameInfo.matchup.team2Seed : '' }}</span>
                      <span class="grow1">{{(game.gameInfo) ? game.gameInfo.matchup.team2 : ''}}</span>
                      <span class="team-score">{{(game.gameInfo) ? game.gameInfo.matchup.scoreTeam2 : '' }}</span>
                    </div>
                    <div class="game">
                      <div class="game-number">Game {{(game.gameInfo) ? game.gameInfo.game : ''}}</div>
                      <div class="game-time">
                        {{(game.gameInfo) ? game.gameInfo.time : ''}}
                        <br>
                        <div class="game-date">{{(game.gameInfo) ? game.gameInfo.date : ''}}</div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Api
import { api } from '@/api/endpoints.js'

// Third Party
import { groupBy } from 'lodash'

export default {
  name: 'TournamentBracket',
  data () {
    return {
      bracketMatchups: [],
      bracketByRound: {},
      byes: 0,
      byesRemaining: 0,
      level: '',
      loaded: false,
      round: 1,
      seeds: [1, 2],
      totalGamesRoundOne: 0
    }
  },

  props: ['games'],

  computed: {
  },

  async created () {
    await this.initTourney()
  },

  methods: {
    results (team, matchup) {
      if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
        return 'winner'
      } else {
        return ''
      }
    },

    async getTeamCount (seasonId) {
      return await api.getTeamCount(seasonId).then(response => {
        return response.data
      })
    },

    initTourney () {
      const brackets = {}
      const levels = this.$store.getters.seasons

      levels.forEach(level => {
        this.getTeamCount(level.season_id).then(async (teamCount) => {

          this.round = 1
          this.seeds = [1, 2]
          this.bracketMatchups = []

          brackets[level.level] = await this.getBracket(teamCount)

          for (var i = 0; brackets[level.level].length > i; i++) {
            brackets[level.level][i].gameInfo = this.games[level.level].filter(game => {
              return brackets[level.level][i].seeds.includes(parseInt(game.matchup.team1Seed))
            })[0]

            if (!brackets[level.level][i].gameInfo) {
              brackets[level.level][i].gameInfo = this.games[level.level].filter(game => {
                if (game.logical_game_number) {
                  return brackets[level.level][i].gameNo === game.logical_game_number
                }
              })
              brackets[level.level][i].gameInfo = brackets[level.level][i].gameInfo[0]
            }
          }
          brackets[level.level] = groupBy(brackets[level.level], 'roundNo')
          this.$set(this.bracketByRound, level.level, brackets[level.level])
        })
      })
    },

    getPerfectBracketDimensions (x) {
      function getBaseLog (x, y) {
        return Math.log(y) / Math.log(x)
      }

      while (getBaseLog(2, x) % 2 !== 1) {
        if (Number.isInteger(getBaseLog(2, x)) / 2) {
          return x
        }
        x++
      }
      return x
    },

    async getBracket (base) {
      const trueTeamCount = base
      const closest = this.getPerfectBracketDimensions(base)

      const byes = closest - base
      let byesRemaining = closest - base

      var rounds = Math.ceil(Math.log(base) / Math.log(2))

      var matches = [[1, 2]]

      let gameNo = 0

      for (var round = 1; round < rounds; round++) {
        var roundMatches = []
        var sum = Math.pow(2, round + 1) + 1

        for (var i = 0; i < matches.length; i++) {
          var home = matches[i][0]
          var away = sum - matches[i][0]
          roundMatches.push([home, away])
          home = sum - matches[i][1]
          away = matches[i][1]
          roundMatches.push([home, away])
        }
        matches = roundMatches
      }

      this.seeds = matches.reduce((acc, seed) => acc.concat(seed), [])

      if (byes > 0) base = closest

      let baseT = base / 2
      let baseC = base / 2
      let nextInc = base / 2

      for (let i = 1; i <= (base - 1); i++) {
        let baseR = i / baseT
        let isBye = false

        if (byesRemaining > 0 && (i % 2 !== 0 && byesRemaining >= (baseT - i))) {
          isBye = true
          byesRemaining--
        }

        const last = this.bracketMatchups.reduce((acc, bracket) => {
          const game = {
            game: bracket.gameNo,
            teams: bracket.seeds
          }

          acc.push(game)
          return acc
        }, [])

        const nextGame = nextInc + i > base - 1 ? null : nextInc + i
        // convert to use matches, check seeds for being larger than the true team count

        const teams = this.getSeedForGame(i, trueTeamCount)

        if (!isBye) gameNo++

        this.bracketMatchups.push({
          lastGames: this.round === 1 ? null : [last[0].game, last[1].game],
          nextGame: nextGame,
          seeds: teams,
          gameNo: (!isBye) ? gameNo : '',
          roundNo: this.round,
          matchupKey: i,
          bye: isBye
        })

        if (i % 2 !== 0) nextInc--
        while (baseR >= 1) {
          this.round++
          baseC /= 2
          baseT = baseT + baseC
          baseR = i / baseT
        }
      }

      return this.bracketMatchups
    },

    getSeedForGame (currentGame, teamCount) {
      const self = this
      function stringSeed () {
        if (self.seeds[0] > teamCount) {
          self.seeds.shift()
          return 'Bye'
        } else {
          return self.seeds.shift()
        }
      }
      if (this.round === 1) {
        let higherSeed = 0
        let lowerSeed = 0

        higherSeed = stringSeed()
        lowerSeed = stringSeed()

        return [higherSeed, lowerSeed]
      } else {
        return this.bracketMatchups.reduce((acc, game) => {
          if (game.nextGame === currentGame) {
            // convert to use .some()
            if (game.seeds.includes('Bye')) {
              const seed = game.seeds.find(seed => seed !== 'Bye')
              acc.push(seed)
            } else {
              acc.push(`Winner of ${game.gameNo}`)
            }
          }

          return acc
        }, [])
      }
    }
  }
}
</script>

<style scoped lang="less">

html, body, .brackets, .wrapper {
  width: 100%;
  min-height: 100%;
  font-family: "Arial", sans-serif;
  }
  // .brackets > div {
  // vertical-align: top;
  // clear: both;
  // }
  // .brackets > div > div {
  // float: left;
  // height: 100%;
  // }
  // .brackets > div > div > div {
  // margin: 50px 0;
  // }
  // .brackets div.bracketbox {
  // position: relative;
  // width: 100%; height: 100%;
  // border-top: 1px solid #555;
  // border-right: 1px solid #555;
  // border-bottom: 1px solid #555;
  // }
  // .brackets div.bracketbox > span.info {
  // position: absolute;
  // top: 25%;
  // left: 25%;
  // font-size: 0.8em;
  // color: #BBB;
  // }
  // .brackets div.bracketbox > span {
  // position: absolute;
  // left: 5px;
  // font-size: 0.85em;
  // }
  // .brackets div.bracketbox > span.teama {
  // top: -20px;
  // }
  // .brackets div.bracketbox > span.teamb {
  // bottom: -20px;
  // }
  // .brackets div.bracketbox > span.teamc {
  // bottom: 1px;
  // }
  // .brackets > .group2 {
  // height: 260px;
  // }
  // .brackets > .group2 > div {
  // width: 49%;
  // }
  // .brackets > .group3 {
  // height: 320px;
  // }
  // .brackets > .group3 > div {
  // width: 32.7%;
  // }
  // .brackets > .group4 > div {
  // width: 24.5%;
  // }
  // .brackets > .group5 > div {
  // width: 19.6%;
  // }
  // .brackets > .group6 {
  // height: 2000px;
  // }
  // .brackets > .group6 > div {
  // width: 16.3%;
  // }
  // .brackets > div > .r1 > div {
  // height: 60px;
  // }
  // .brackets > div > .r2 > div {
  // margin: 80px 0 110px 0;
  // height: 110px;
  // }
  // .brackets > div > .r3 > div {
  // margin: 135px 0 220px 0;
  // height: 220px;
  // }
  // .brackets > div > .r4 > div {
  // margin: 250px 0 445px 0;
  // height: 445px;
  // }
  // .brackets > div > .r5 > div {
  // margin: 460px 0 0 0;
  // height: 900px;
  // }
  // .brackets > div > .r6 > div {
  // margin: 900px 0 0 0;
  // }
  // .brackets div.final > div.bracketbox {
  // border-top: 0px;
  // border-right: 0px;
  // height: 0px;
  // }
  // .brackets > div > .r4 > div.drop {
  // height: 180px;
  // margin-bottom: 0px;
  // }
  // .brackets > div > .r5 > div.final.drop {
  // margin-top: 345px;
  // margin-bottom: 0px;
  // height: 1px;
  // }
  // .brackets > div > div > div:last-of-type {
  // margin-bottom: 0px;
  // }

.brackets {
  display: inline-block;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  white-space: nowrap;
  overflow:hidden;
  background-color: #e1e1e1;
  // padding-top: 20px;
  // padding: 40px 0;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.round {
  display: inline-block;
  vertical-align: middle;
}

// side of bracket
.split {
  float: left;
  display: flex;
  // width: 42%;
  width: 95%;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  flex-direction: row;
}

.champion {
  float: left;
  display: block;
  width: 16%;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-align-self: center;
  align-self: center;
  margin-top: -15px;
  text-align: center;
  padding: 230px 0\9;
}

.champion i {
  color: #a0a6a8;
  font-size: 45px;
  padding: 10px 0;
}

.round {
  float: left;
  display: flex;
  flex-direction: column;
  width: 95%;
  width: 30.8333%\9;

  .split-one & {
    margin: 0 2.5% 0 0;
  }

  .split-two & {
    margin: 0 0 0 2.5%;
  }
  // -container, -matches works for perfect bracket
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // justify-content: center;
    flex: 1;

  }

  &-matches {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    // refactor more dynamic
    // height: 300px;
  }

  &-2 {
    .matchup {
      margin: 0;
      // height: 60px;
      // padding: 50px 0;
    }
  }

  &-3 {
    .matchup {
      margin: 0;
      // height: 60px;
      // padding: 130px 0;
      // padding: 100px 0;
    }
  }

  &-4 {
    .matchup {
      margin: 0;
      // height: 60px;
      // padding: 130px 0;
      // padding: 200px 0;
    }
  }
}

.matchup {
  margin: 0;
  width: 100%;
  padding: 10px 0;
  min-height: 80px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.score {
  font-size: 11px;
  text-transform: uppercase;
  float: right;
  color: #2C7399;
  font-weight: bold;
  font-family: 'Roboto Condensed', sans-serif;
  position: absolute;
  right: 5px;
}

.team {
  padding: 0 5px;
  margin: 3px 0;
  height: 25px;
  line-height: 25px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;

  &-seed {
    font-size: 10px;
  }

  &-top {
    order:0;
  }

  &-bottom {
    order:1;
  }
  &.winner {
    font-weight: 600;
    font-style: italic;
  }
}

.round-details {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 13px;
  color: #2C7399;
  text-transform: uppercase;
  text-align: center;
  height: 40px;

  .date {
    font-size: 10px;
    letter-spacing: 2px;
    font-family: 'Istok Web', sans-serif;
    color: #3F915F;
  }
}

.current .team {
  opacity: 1;

  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  opacity: 1;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.grow1 {
  flex-grow: 1;
  padding-left: 5px;
}

.game {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: .9rem;
  padding-left: 5px;
  padding-right: 5px;
  color: #021A2B;
  line-height: 1;
  &-time {
    font-style: italic;
    text-align: end;
  }
}

.final {
  margin: 4.5em 0;
}

@media screen and (min-width: 981px) and (max-width: 1099px) {
  .container {
    margin: 0 1%;
  }

  .champion {
    width: 14%;
  }

  .split {
    // width: 43%;
    max-width: 95%;
  }
}

@media screen and (max-width: 980px) {
  .container {
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    flex-direction: column;
  }

  .split,
  .champion {
    width: 90%;
    margin: 35px 5%;
  }

  .champion {
    -webkit-box-ordinal-group: 3;
    -moz-box-ordinal-group: 3;
    -ms-flex-order: 3;
    -webkit-order: 3;
    order: 3;
  }

  .split {
    border-bottom: 1px solid #b6b6b6;
    padding-bottom: 20px;
  }
}

@media screen and (max-width: 400px) {

  .split {
    width: 95%;
    margin: 25px 2.5%;
  }

  .round {
    width: 21%;
  }

  .current {
    -webkit-flex-grow: 1;
    -moz-flex-grow: 1;
    flex-grow: 1;
  }

  .round-details {
    font-size: 90%;
  }
}

</style>
