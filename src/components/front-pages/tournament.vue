<template>
   <div class="container">
     <div class="page-styles">
       <h2>{{ tournament.title }}</h2>
       <template v-for="section in tournament.section">
          <div :key="section.id">
            <span v-html="section.content"></span>
          </div>
       </template>
      <!-- <h2>MHAC Conference Tournament Information - 2021</h2>
      <h5><a href="static/docs/MHAC Conference 2021 Tournament.pdf" class="download" download type="application/pdf">Download Tournament Packet</a></h5>
      <p>There will be four tournaments. All games will be played at <a href='https://www.google.com/maps/place/106+Gallatin+Pike+N,+Madison,+TN+37115/@36.264061,-86.7130334,17z/data=!3m1!4b1!4m5!3m4!1s0x88644302d8537e4d:0x747b45d0cbfa0f87!8m2!3d36.264061!4d-86.7108447'> Madison Church of Christ, 106 Gallatin Pike N, Madison, TN 37115</a>. The first round games of the tournament will be played on Thursday.  The semi-finals on Friday, and tiger consolation and championship games on Saturday.  Madison CoC will be hosting a concession stand there for those wanting a meal, snack or drink.
      </p>

      <p>
        The tournament schedule is based on 8 teams for 18U(HSV) boys, 6 teams for 16u(HSJV) boys, 7 teams for 14U(MSV) boys and 4 teams for 18U(HSV) girls.
      </p>
      <p>
        <b>Gate and Concession money</b>
        <br />The MHAC Conference is covering all costs for the tournament(refs and gym floor).  Because of this we will be collecting the gate money and money from attendees.  We really need to make sure and support the tournament to help cover all the costs.
      </p>
      <p>
        <b>Gate fees</b>
        <ul>
          <li>Daily Adult - $10</li>
          <li>Daily Student - $7</li>
          <li>Families with 4 or more - $34</li>
          <li>Tournament Adult - $24 (On Friday the price drops to $17)</li>
          <li>Tournament Student - $15 (On Friday the price drops to $11)</li>
          <li>Tournament Family 4 or more - $70 (On Friday the price drops to $50) </li>
          <li>6 years old and under will get in free</li>
        </ul>

        There will be a total of 21 games in the tournament, Feb 11th, 12th & 13th.
      </p>
      <p>
        <b>Payment Methods</b>
         <ul>
           <li> We will be setting up the Square app to be able to pay at the gate using a debit or credit card</li>
           <li> We will also take checks made out to “Hendersonville Royals” with “Tournament Gate” in the memo line</li>
         </ul>

      </p>
      <p>
        <b>We need your help!</b>
        <br />
          As the tournament approaches we are making plans to provide the best experience for your students. We have volunteer positions available for running the camera or operating the gate. Below you will find a link to the signup page where you can select to fill a time slot.
        <br />
        Click the link to sign-up below.
        <br />
        <a href="https://www.signupgenius.com/go/20F0E4AAEAD2FA2FE3-2021" target="_blank"><img src="https://www.signupgenius.com/images/sign-up-now1.gif" width="150" height="90" border="0" alt="Sign Up!"></a>
      </p>
      <p>
        Please <a href="static/docs/MHAC Conference 2021 Tournament.pdf" class="download" download type="application/pdf">download the tournament packet</a> for more information.
      </p>

      <br />

      <p>
         Don't forget to order merchandise for the 2020-2021 tournament. This year we are offering T-Shirts, Crewneck Sweatshirts, and Hoodies. To order, visit <a href="https://mhac-merch.square.site/">https://mhac-merch.square.site</a>.
      </p>
      <!-- <div class="filterBar">
        <label for="list" class="toggle-buttons toggle-buttons-left" :class="[bracketFormat === 'list' ? 'active' : '']">
          <input type="radio" v-model="bracketFormat" value="list" id="list">
          <font-awesome-icon :icon="['fas', 'list-ol']" class="icon"></font-awesome-icon>
        </label>
        <label for="bracket" class="toggle-buttons toggle-buttons-right" :class="[bracketFormat === 'bracket' ? 'active' : '']">
          <input type="radio" v-model="bracketFormat" value="bracket" id="bracket">
          <font-awesome-icon :icon="['fas', 'stream']" class="icon"></font-awesome-icon>
        </label>
      </div> -->

      <TournamentBracket v-if="Object.keys(games).length >= 1 && bracketFormat === 'bracket'" :games="games"></TournamentBracket>
      <!-- <TournamentList :games="games" v-else></TournamentList> -->

      <div class="sponsors">
      </div>
    </div>
  </div>
</template>

<script>
// Api
import { api } from '../../api/endpoints.js'
import pages from '@/api/pages'

// components
import TournamentBracket from '@/components/tournament/bracket'
// import TournamentList from '@/components/tournament/list'

// Third Party Helpers
import { groupBy } from 'lodash'

export default {
  name: 'tournament',
  data () {
    return {
      tournament: [],
      bracketFormat: 'bracket',
      filterBy: {
        team: {
          slug: '',
          name: 'All Teams'
        },
        level: {
          season_id: '',
          level: 'All Levels'
        },
        dateRange: {
          start_date: '',
          end_date: ''
        }
      },
      games: {}
    }
  },

  components: {
    TournamentBracket: TournamentBracket
  //   TournamentList: TournamentList
  },

  computed: {
    levels () {
      const levels = [{ season_id: '', level: 'All Levels' }, ...this.$store.state.seasons]
      return levels
    }
  },
  created () {
    this.initTourney()
    this.initTournament()
  },
  methods: {
    initTourney () {
      api.getTournamentInformation().then(response => {
        response.data.games.forEach((game) => {
          game.date = this.$config.formatDate(game.date)
          game.time = this.$config.formatTime(game.time)
        })
        this.games = groupBy(response.data.games, 'seasons.level')
      })
        .catch(err => {
          console.log(err)
        })
    },
    initTournament () {
      pages.get('tournament')
        .then(response => {
          console.log(response)
          this.tournament = response
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem 1rem;
  // margin-right: 1rem;
  // margin-left: 1rem;
}
h5 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.filterBar {
  line-height: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.toggle-buttons {
  border: 1px solid #0C4B75;
  color: #0C4B75;
  display: inline-flex;
  padding: 5px;
  margin-bottom: 0;

  // &-left {
  //   border-radius: 5px 0 0 5px;
  // }

  // &-right {
  //   border-radius: 0 5px 5px 0;
  // }

  &.active {
    background: #0C4B75;
    color: #fff;
    border: 1px solid #0C4B75;
  }

  input {
    display: none;
  }

  .icon {
    font-size: 1.2rem;
  }
}

::v-deep .levelHead {
  padding:.75rem;
  background-color: rgba(39,132,195,1);
  color: #fff;

  &-div {
    box-sizing: border-box;
    line-height: 1;
  }

  td {
    line-height: 2;
  }
}

// @media @phone {

// }
</style>
