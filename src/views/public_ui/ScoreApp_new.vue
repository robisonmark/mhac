<template>
    <div>
      <h1>Basketball Scoreboard</h1>
    <p>{{ team1 }} vs {{ team2 }}</p>
    <p>Game Time: {{ elapsedTime }}s</p>
    <p>Quarter Time: {{ quarterTime }}s</p>
    
    <button @click="startClock">Start</button>
    <button @click="stopClock">Stop</button>
    <button @click="resetClock(360)">Reset</button>
    <button @click="fetchTeams">Load Teams</button>

      <div>
        <label>Game Level:</label>
        <select v-model="selectedLevel">
          <option value="junior">Junior</option>
          <option value="highschool">High School</option>
          <option value="college">College</option>
          <option value="pro">Pro</option>
        </select>
        <button @click="setGameRules">Load Rules</button>
      </div>
  
      <div>
        <label>Team 1:</label>
        <input v-model="team1" placeholder="Enter Team 1 Name" />
        <label>Team 2:</label>
        <input v-model="team2" placeholder="Enter Team 2 Name" />
        <button @click="setTeams">Set Teams</button>
      </div>
  
      <div>
        <h2>{{ team1 }} vs {{ team2 }}</h2>
        <p>Score: {{ score1 }} - {{ score2 }}</p>
        <p>Quarter Time: {{ quarterTime }}s</p>
        <p>Half Time: {{ halfTime }}s</p>
        <p>Timeouts: {{ timeouts }}</p>
      </div>
  
      <h2>Shot Log</h2>
      <ul>
        <li v-for="(shot, index) in shotLog" :key="index">
          {{ shot.gameTime }}s - {{ shot.quarter }}Q - {{ shot.team }} - 
          {{ shot.player }} - {{ shot.shotType }} ({{ shot.points }} pts)
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import * as signalR from "@microsoft/signalr";
  
  
  const apiUrl = "http://localhost:8005"; // Replace with your actual API
  const selectedLevel = ref("junior");
  const elapsedTime = ref(0);
  const team1 = ref("Team A");
  const team2 = ref("Team B");
  const score1 = ref(0);
  const score2 = ref(0);
  const quarterTime = ref(0);
  const halfTime = ref(0);
  const timeouts = ref(0);
  const shotLog = ref([]);
  
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5259/scoreboard")
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();
  
  async function startSignalR() {
    try {
      await connection.start();
      console.log("Connected to SignalR");
  
      connection.on("UpdateGameState", (qTime, hTime, to, t1, t2, s1, s2) => {
        quarterTime.value = qTime;
        halfTime.value = hTime;
        timeouts.value = to;
        team1.value = t1;
        team2.value = t2;
        score1.value = s1;
        score2.value = s2;
      });
  
      connection.on("UpdateTeams", (t1, t2) => {
        team1.value = t1;
        team2.value = t2;
      });
  
      connection.on("UpdateShotLog", (shots) => {
        shotLog.value = shots;
      });
  
      connection.on("UpdateGameRules", (qTime, hTime, to) => {
        quarterTime.value = qTime;
        halfTime.value = hTime;
        timeouts.value = to;
      });
    } catch (err) {
      console.error("SignalR Connection Error:", err);
      setTimeout(startSignalR, 5000);
    }
  }


  function startClock() {
    console.log("HERE");
    connection.invoke("StartClock").then(resp => console.log(resp)).catch(err => console.error(err));
  }

  async function stopClock() {
    console.log("Stop");
    await connection.invoke("StopClock").then(resp => console.log(resp)).catch(err => console.error(err));
  }

  function setGameRules() {
    connection.invoke("SetGameRules", apiUrl, selectedLevel.value).catch(err => console.error(err));
  }
  
  function resetClock(newTime) {
  connection.invoke("ResetClock", newTime).catch(err => console.error(err));
}

  function setTeams() {
    connection.invoke("SetTeams", team1.value, team2.value).catch(err => console.error(err));
  }
  
  onMounted(() => {
    startSignalR();
  });

  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  </style>
  