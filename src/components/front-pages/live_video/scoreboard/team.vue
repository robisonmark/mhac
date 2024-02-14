<template>
  <div :id="`canvas_${props.location}`" :class="`team_block team_block-${props.location}`"
    :style="{ backgroundColor: team_color }">
    <div :class="`team_logo team_logo_${props.location}`" :style="{ backgroundColor: secondary_color }">
      <img :src="logo" :class="`${props.location}`" />
    </div>
    <div class="team_name team_name_wrapper">
      <div :class="`team_name team_name_${props.location}`" :style="{ color: secondary_color }">{{ team_name }}</div>
    </div>
    <!-- <scoreBlock :location="props.location" v-bind="score" :style="{ color: '#fff' }"></scoreBlock> -->
  </div>
  <div :class="`team_stats team_stats_${props.location}`" :style="{ backgroundColor: team_color }">
    <div>
      <div class="timeout_bubble" v-for="(timeout, key) in timeouts" :key="key"></div>
    </div>
    <div v-if="bonus" class="bonus">Bonus<template v-if="bonusPlus">+</template></div>
    <div v-if="possession" :class="`possession possession_${props.location}`">
      <img :src="`/static/scoreboard/poss_${props.location}.svg`" />
    </div>
  </div>
</template>

<script setup>
import scoreBlock from '@/components/front-pages/live_video/scoreboard/score.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  location: String,
  team_name: String,
  logo: String,
  team_color: String,
  secondary_color: String
})


const team = computed(() => store.getters.teams.length > 0 ? store.getters.teams.filter(team => team.slug === props.location.value)[0] : {});
const timeouts = ref([]);

console.log("team.vue", store.getters.teams, team)

onBeforeMount(() => {
  if (store.getters.teams) {
    const teamData = store.getters.teams.filter(team => team.slug === props.location.value)[0];
    team_color.value = `#${teamData.main_color}`;
    secondary_color.value = `#${teamData.secondary_color}`;
    logo.value = `/static/color-team-logos/${teamData.logo_color}`;
    prop.team_name.value = teamData.team_name;
  }
});

</script>

<style scoped lang="less">
// Your scoped LESS styles here
</style>
