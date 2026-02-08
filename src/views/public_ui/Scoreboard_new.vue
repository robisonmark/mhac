<template>
  <div>
    <h1>Basketball Scoreboard</h1>
    <p>{{ team1 }} vs {{ team2 }}</p>
    <p>Game Time: {{ elapsedTime }}s</p>
    <p>Shot Clock: {{ shotClock }}s</p>
    <p>Quarter Time: {{ quarterTime }}s</p>
    
    <button @click="startClock">Start</button>
    <button @click="stopClock">Stop</button>
    <button @click="resetClock(360)">Reset</button>
    <button @click="fetchTeams">Load Teams</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { startSignalR, startClock, stopClock, resetClock, loadTeams } from "@/signalrService";

const elapsedTime = ref(0);
const shotClock = ref(24);
const quarterTime = ref(360);
const team1 = ref("Team A");
const team2 = ref("Team B");

onMounted(() => {
  startSignalR();
});

// Example: Load teams from your API
const fetchTeams = () => {
  loadTeams("http://localhost:8005/getTeams");
};
</script>
