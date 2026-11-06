<template>
  <header class="contentPad">
    <h1>Tournament Bracket</h1>
  </header> 
  <div class="contentPad">
    <div class="tournament">
      <div v-for="(round, index) in rounds" :key="index" class="round">
        <h2>Round {{ index + 1 }}</h2>
        <div class="match" v-for="match in round" :key="match.match">
          <p><strong>Match {{ match.match }}</strong></p>
          <p>
            {{ match.team1?.team_name || match.team1 }} 
            vs 
            {{ match.team2?.team_name || match.team2 }}
          </p>
          
          <div v-if="!match.winner">
            <input 
              v-model="scores[match.match].team1" 
              type="number" 
              placeholder="Score for Team 1"
            />
            <input 
              v-model="scores[match.match].team2" 
              type="number" 
              placeholder="Score for Team 2"
            />
            <button @click="submitScore(match.match, match.team1, match.team2)">Submit</button>
          </div>

          <p v-else>Winner: {{ match.winner }}</p>
        </div>
      </div>

      <div class="consolation-bracket">
        <h2>Consolation Games</h2>
        <div v-for="match in consolationGames" :key="match.match" class="match">
          <p><strong>Match {{ match.match }}</strong></p>
          <p>
            {{ match.team1?.team_name || match.team1 }}
            vs
            {{ match.team2?.team_name || match.team2 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '../../api/endpoints.js';

const rounds = ref([]);
const consolationGames = ref([]);
const scores = ref({});

const fetchTournamentState = () => {
  api.getTournamentBracket().then(response => {
    rounds.value = response.data.rounds;
    consolationGames.value = response.data.consolation_games;
    
    // Initialize score objects
    rounds.value.forEach(round => {
      round.forEach(match => {
        scores.value[match.match] = { team1: "", team2: "" };
      });
    });
  });
};

onMounted(fetchTournamentState);

const submitScore = async (matchId, team1, team2) => {
  const scoreData = scores.value[matchId];

  if (!scoreData || scoreData.team1 === "" || scoreData.team2 === "") {
    alert("Please enter both scores.");
    return;
  }

  api.postTournamentScore({
    match_id: matchId,
    team1_id: team1.id,
    team1_score: parseInt(scoreData.team1),
    team2_id: team2.id,
    team2_score: parseInt(scoreData.team2),
  }).then(response => {
    rounds.value = response.data.bracket.rounds;
    consolationGames.value = response.data.consolation_games;
    scores.value[matchId] = { team1: "", team2: "" }; // Reset inputs
  });
};
</script>

<style scoped>
/* Keep or modify styles to match the square and evenly spaced design */
.tournament {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.round {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.match {
  border: 1px solid #ccc;
  padding: 10px;
  background: #f9f9f9;
  text-align: center;
  width: 250px;
}

input {
  width: 40%;
  margin: 5px;
  padding: 5px;
}

button {
  margin-top: 5px;
}
</style>
