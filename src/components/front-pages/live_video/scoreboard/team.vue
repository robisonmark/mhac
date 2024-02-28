<template>
  <div class="wrapper">
    <div :id="`canvas_${props.location}`" :class="`team_block team_block-${props.location}`"
      :style="{ backgroundColor: team_color }">
      <div :class="`team_logo team_logo_${props.location}`" :style="{ backgroundColor: secondary_color }">
        <img :src="logo" :class="`${props.location}`" />
      </div>
      <div class="team_name team_name_wrapper">
        <div :class="`team_name team_name_${props.location}`" :style="{ color: secondary_color }">{{ team_name }}</div>
      </div>
      <scoreBlock :location="props.location" :score="score" :style="{ color: '#fff' }"></scoreBlock>
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
  </div>
</template>

<script setup>
import scoreBlock from '@/components/front-pages/live_video/scoreboard/score.vue';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  location: String,
  modelValue: Object,
  bonus: String,
  bonusPlus: Boolean,
  possession: Boolean,
  score: Number,
  timeouts: Number
})

const team_value = computed(() => store.getters.teams.length > 0 ? store.getters.teams.filter(team => team.slug === props.modelValue)[0] : {});
const secondary_color = ref('');
const logo = ref('');
const team_name = ref('');
const team_color = ref('');

watch(team_value, (newValue) => {
  setData(newValue)
});

function setData(value) {
  team_color.value = `#${team_value.value?.main_color}`;
  secondary_color.value = `#${team_value.value?.secondary_color}`;
  logo.value = `/static/color-team-logos/${team_value.value?.logo_color}`;
  team_name.value = team_value.value?.team_name;
};

setData();
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');

.team_block {
  display: flex;
  flex-flow: row;
  width: 300px;
  height: 50px;
  align-items: center;
  overflow: hidden;

  &-home {
    // padding-right: 10px;
  }

  &-away {
    flex-flow: row-reverse;
    // padding-left: 10px;
  }
}

.team_logo {
  display: flex;
  flex-flow: row;
  justify-content: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
  background-color: #000;
  height: 100%;
  width: 82.5px;

  &_home {
    transform: skewX(45deg);
    padding-left: 10px;
  }

  &_away {
    transform: skewX(-45deg);
    padding-right: 10px;
  }

  img {
    // width: 100%;
    // height: 35px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    width: 100%;

    &.away {
      transform: skewX(45deg);
    }

    &.home {
      transform: skewX(-45deg);
    }
  }
}

.team_name {
  font-family: 'Teko', sans-serif;

  font-size: 1.5rem;
  line-height: .8;
  display: flex;
  flex-grow: 1;
  padding-left: 5px;
  padding-right: 5px;

  &_home {
    justify-content: flex-end;
    text-align: right;
  }

  &_away {
    justify-content: flex-start;
  }

  &_wrapper {
    flex-grow: 1;
    width: 125px;
  }
}

.team_stats {
  padding-left: 10px;
  padding-right: 10px;
  filter: brightness(85%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
  height: 18px;
  position: relative;

  .timeout_bubble {
    height: 8px;
    width: 8px;
    margin: 2px;
    background-color: #fff;
    border-radius: 50%;
    display: inline-block;
    position: relative;

    &:first-child {
      margin-left: 0;
    }
  }

  .bonus {
    font-size: 15px;
    color: #fff;
    font-family: 'Teko', sans-serif;
    flex-grow: 1;
    padding: 5px;
    line-height: 1;
    height: 100%;
    text-align: right;
  }

  &_away {
    flex-flow: row-reverse;

    .bonus {
      text-align: left;
    }
  }
}

.possession {
  font-family: 'Teko', sans-serif;
  width: 14px;
  // background-color: #fff;
  padding: 3px;
  position: relative;
  height: 100%;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 13px;
    width: auto;
  }

  // &:after,
  // &:before {
  //   content: "";
  //   position: absolute;
  //   width: 3px;
  //   height: 50%;
  // }
  // &:before {
  //   top: 0px;
  // }
  // &:after {
  //   bottom: 0px;
  // }

  // &_home {
  //   &:after,
  //   &:before {
  //     right: 100%;
  //   }

  //   &:before {
  //     background: linear-gradient(to top left, #fff 50%, transparent 51%);
  //   }
  //   &:after {
  //     background: linear-gradient(to bottom left, #fff 50%, transparent 51%);
  //   }
  // }

  // &_away {
  //   &:after,
  //   &:before {
  //     left: 100%;
  //   }

  //   &:before {
  //     background: linear-gradient(to top right, #fff 50%, transparent 51%);
  //   }
  //   &:after {
  //     background: linear-gradient(to bottom right, #fff 50%, transparent 51%);
  //   }
  // }
}
</style>
