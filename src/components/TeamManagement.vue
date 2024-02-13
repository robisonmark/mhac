<template>
  <div class="con-management">
    <nav class="sidebar">
      <div v-if="admin" class="admin">
        <selectbox id="teams" :options="teams.value" :trackby="'slug'" :label="'team_name'" :placeholder="''"
          v-model=selectedTeam>
        </selectbox>
      </div>
      <div class="team-logo">
        <img :src="teamLogo" />
      </div>
      <ul :style="cssVars">
        <router-link :to="{ path: '/manage/' + team + '/roster' }" tag="li" class="nav-item">Roster</router-link>
        <router-link :to="{ path: '/manage/' + team + '/stats' }" tag="li" class="nav-item">Stats</router-link>
        <router-link :to="{ path: '/manage/' + team + '/schedule' }" tag="li" class="nav-item">Schedule</router-link>
        <router-link :to="{ path: '/manage/' + team + '/profile' }" tag="li" class="nav-item">Team Profile</router-link>
        <template v-if="admin">
          <router-link :to="{ name: 'admin' }" tag="li" class="nav-item">Admin</router-link>
        </template>
      </ul>
    </nav>
    <router-view class="team-management" :style="cssVars" />
    <img class="bottom-logo" :src="greyLogo" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '../api/endpoints.js';
import selectbox from './selectbox.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

let team = reactive(route.params.slug);
const greyLogo = ref('');
const teamLogo = ref('');

const teams = reactive({});
// const teams = computed(() => {
//   if (store.getters.teams.length < 1) {
//     store.dispatch('setTeams')
//   };
//   return store.getters.teams
// });

const selectedTeam = computed({
  get() {
    return store.getters.teams.find(t => t.slug === route.params.slug)
  },
  set(newValue) {
    console.log(newValue)
    console.log("Setter", newValue)
    const new_user = {
      team_id: newValue.team_id,
      slug: newValue.slug
    }
    console.log("setter", new_user)


    store.dispatch('setUser', new_user)
    const routeName = route.name

    router.push({ name: routeName, params: { slug: newValue.slug } })
    getSeasonTeams(newValue.slug)
    team = newValue.slug

    teamLogo.value = '/static/color-team-logos/' + newValue.logo_color
    greyLogo.value = '/static/washedout-team-logo/' + newValue.logo_grey
  }
});

const cssVars = computed(() => {
  let teamMain = '';
  let teamSecond = '';

  store.getters.teams.filter(t => {
    if (t.slug === route.params.slug) {
      console.log("t", t)
      teamMain = '#' + t.main_color;
      teamSecond = '#' + t.secondary_color;
    }
  }
  );
  return {
    '--bg-color': teamMain,
    '--team-second': teamSecond,
    '--hover-color': darken(teamMain, 15),
    '--active-color': lighten(teamMain, 10)
  };
});

const admin = computed(() => {
  return store.getters.userGroups.includes('Admin');
});

onMounted(() => {
  getSeasonTeams(team);
});

watch(selectedTeam, (newValue, oldValue) => {
  console.log(newValue)
  teamLogo.value = '/static/color-team-logos/' + newValue.logo_color;
  greyLogo.value = '/static/washedout-team-logo/' + newValue.logo_grey;
});

watch(team, (newValue, oldValue) => {
  console.log("team Watcher", newValue)
})

onBeforeMount(() => {
  const slug = route.params.slug;
  store.dispatch('setTeam', slug);
  store.dispatch('setSeasonTeams');
  if (store.getters.teams.length < 1) {
    store.dispatch('setTeams')
  };
  teams.value = store.getters.teams

});

const getSeasonTeams = (slug) => {
  console.log(slug)
  api.getSeasonTeams(slug)
    .then(response => {
      store.dispatch('setTeamAssocLvl', response.data);
    });
};

const getNewTeam = async (slug) => {
  return await api.getTeams(slug).then(response => {
    return response.data[0];
  });
};

// Credit to Jose Reyes @ https://codepen.io/jreyesgs/
const addLight = (color, amount) => {
  const cc = parseInt(color, 16) + amount;
  let c = (cc > 255) ? 255 : cc;
  c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

const lighten = (color, amount) => {
  color = (color.indexOf('#') >= 0) ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  color = `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`;
  return color;
};

const subtractLight = (color, amount) => {
  const cc = parseInt(color, 16) - amount;
  let c = (cc < 0) ? 0 : cc;
  c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

const darken = (color, amount) => {
  color = (color.indexOf('#') >= 0) ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(color.substring(2, 4), amount)}${subtractLight(color.substring(4, 6), amount)}`;
  return color;
};
</script>

<style scoped lang="less">
@teamColor: var(--bg-color);
@hoverColor: var(--hover-color);
@activeColor: var(--active-color);

.admin {
  display: block;
  padding: 1rem;
}

h2 {
  font-size: 1.5rem !important;
}

.con-management {
  // min-height: calc(100vh - 7rem);
  min-height: 100vh;
  display: grid;
  grid-template-columns: 15rem auto;

  // grid-auto-rows: minmax(35px, auto);
  .sidebar {
    background-color: #fff;

    .team-logo {
      width: 100%;
      min-height: 10rem;
      display: flex;

      img {
        width: 75%;
        display: block;
        margin: auto;
      }
    }

    // Override Chrome Browser Defaults
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 0px;
    }

    a[tag="li"] {
      text-decoration: none;
      list-style: none;
      text-align: left;
      padding-left: 2rem;
      height: 3rem;
      display: flex;
      align-items: center;

      &:nth-child(even) {
        background-color: @teamColor;
        color: #fff;
      }

      &:hover {
        background-color: @hoverColor;
        // filter: brightness(90%);
        color: #fff;
      }
    }

    .router-link-active {
      // background-color: @activeColor;
    }
  }

  .bottom-logo {
    // position: absolute;
    position: fixed;
    right: 0;
    bottom: 0;
    max-height: 15rem;
    z-index: 0;
  }

  .team-management {
    overflow: auto;
    z-index: 1;
    height: calc(100vh - 7rem);
    padding-bottom: 5rem;
  }
}
</style>
