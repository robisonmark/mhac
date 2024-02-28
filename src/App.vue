<template>
  <div :class="routeSection" @click="clickAway">
    <template v-if="routeSection !== 'scoreboard'">
      <header-component :styles="cssVars" />
      <main>
        <router-view class="body" />
      </main>
      <footer v-if="routeSection === 'public'" class="main-footer" id="publicMainFooter">
        <div class="container">
          <div class="row align-items-center">
            <div class="col conference conference-info">
              <img class="conference conference-logo" src="/static/washedout-team-logo/mhac-greyscale.png" />
              <p>
                <a href='https://www.facebook.com/mhacsports' target="_blank">
                  <font-awesome-icon :icon="['fab', 'facebook-square']" size="3x"></font-awesome-icon>
                </a>
                <a href='https://www.instagram.com/mhacsports' target="_blank">
                  <font-awesome-icon :icon="['fab', 'instagram']" size="3x"></font-awesome-icon>
                </a>
              </p>
              <p>&copy; {{ new Date().getFullYear() }} Midsouth Homeschool Athletic Conference</p>
              <p>All Rights Reserved | Terms of Service | Privacy Policy</p>
            </div>
            <div class="col-md-4">
              <div class="border">
                <img class="robros" src="/static/robros/robros-logo-optimized.png" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </template>
    <template v-else>
      <router-view class="body" />
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import HeaderComponent from '@/components/header.vue';
// Import any necessary store or API modules

const router = useRouter();
const route = useRoute();
const store = useStore();

const routeSection = computed(() => route.meta.section);
const emit = defineEmits(['close']);
const teamManagement = ref(false);

const cssVars = computed(() => {
  let teamMain = '';
  if (routeSection.value === 'team') {
    state.teams.forEach(team => {
      if (team.slug === state.user.slug) {
        teamMain = '#' + team.main_color;
      }
    });
    return {
      '--bg-color': teamMain,
      '--logo-color': teamMain
    };
  } else {
    return {
      '--bg-color': '#0C4B75',
      '--logo-color': '#2683c3'
    };
  }
});


const state = {
  teams: [],
  user: {},
  // Define your store state here
};

// Fetch necessary data
const fetchData = () => {
  // Implement your data fetching logic here
};

// Fetch data before component is created
fetchData();

store.dispatch('setSeasons')
store.dispatch('setTeams')
store.dispatch('setTeam')
store.dispatch('setLevels')
store.dispatch('setFullSchedule')

router.options.routes.forEach((route) => {
  if (route.children) {
    route.children.forEach((child) => {
      if (child.name === route.name) {
        teamManagement.value = true;
      } else {
        teamManagement.value = false;
      }
    });
  }
});

const clickAway = () => {
  emit('close', true);
};
</script>

<style scoped lang="less">
/* Import your less variables and mixins here */

body {
  min-height: 100vh;
  height: 100%;
}

main {
  position: relative;
  z-index: 1;
}

.body {
  color: #021A2B;
}

.team {
  background-color: #CFCDCD;
  overflow: hidden;
  margin: 0;
  background-attachment: fixed;
}

.public {
  min-height: 100vh;
  margin: 0;
  background: #2784c3;
  background: -moz-linear-gradient(-45deg, #2784c3 49%, #1e5799 100%, #2784c3 100%);
  background: -webkit-linear-gradient(-45deg, #2784c3 49%, #1e5799 100%, #2784c3 100%);
  background: linear-gradient(135deg, #2784c3 49%, #1e5799 100%, #2784c3 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#2784c3', endColorstr='#2784c3', GradientType=1);
  background-attachment: fixed;
}

.contentPad {
  padding: 0rem 4rem;
}

.fixed-footer {
  position: sticky;
  bottom: 1rem;
  text-align: right;
  margin-top: 2rem;
  margin-bottom: 1rem;

  .copy {
    margin-right: .5rem;
    font-size: 10px;
  }
}

.main-footer {
  background-color: #2A2A2A;
  height: 405px;
  display: flex;
  align-items: center;

  .conference {
    &-info {
      color: #fff;

      p {
        line-height: 1.5;
        margin-bottom: 0;
      }
    }

    &-logo {
      max-width: 20rem;
      margin-bottom: 2rem;
    }
  }

  .border {
    width: 100%;
    display: flex;
    align-items: center;

    &:before {
      content: '';
      width: 3px;
      height: 169px;
      margin-right: 2rem;
      background-color: #fff;
      display: inline-block;
    }
  }

  .robros {
    width: 100%;
    max-width: calc(100% - 3px - 2rem);
  }
}
</style>
