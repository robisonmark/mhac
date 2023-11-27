<template>
  <div>
    <h2>Manage WebSocketUrl</h2>
    <input type="text" v-model="websocketUrl" />
     <button @click="save()">
        Save
      </button>
  </div>
</template>
<script>
import api  from '@/api/endpoints'

export default {
  name: 'adminObs',
  data () {
    return {
      websocketUrl: ''
    }
  },
  created () {
    this.getCurrentWebsocketInfo()
  },
  methods: {
    getCurrentWebsocketInfo () {
      api.getWebSocketUrl().then(response => {
        console.log(response.data.webSocketUrl)
        this.websocketUrl = response.data.webSocketUrl
      })
    },
    save () {
      api.updateWebSocketUrl({ webSocketUrl: this.websocketUrl }).then(response => {
        this.websocketUrl = response.data.webSocketUrl
        this.$store.dispatch('setWebSocket', this.websocketUrl)
      })
    }
  }
}
</script>

<style scoped lang="less">

@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

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

table {
  // margin-top: -40px;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    border-left: 2px solid transparent;
    position: absolute;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
    top: 0;
    right: -20px;
    z-index: 5;
  }
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}

@media @phone{

}

</style>
