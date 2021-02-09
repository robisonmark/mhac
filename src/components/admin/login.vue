<template>
  <div class="loginWrapper">
    <form>
      <img src="/static/color-team-logos/mhaclogo.png" />
      <label for="username">
        Username
      </label>
      <input id="username" type="text" v-model="username" />

      <label for="password">
        Password
      </label>
      <input id="password" type="password" v-model="password" />
      <button @click.prevent.stop="login()" class="login">
        <font-awesome-icon :icon="['fas', 'basketball-ball']" :class="{'animate': thinking}"></font-awesome-icon> Login
      </button>
    </form>
  </div>
</template>

<script>
import { api } from '@/api/endpoints'
export default {
  data () {
    return {
      username: '',
      password: '',
      thinking: false
    }
  },
  methods: {
    login () {
      this.thinking = true
      // this.$router.push('/manage/chattanooga_patriots')
      api.login(this.username, this.password).then(response => {
        // console.log(response)
        var d = new Date()
        d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        var cookie = '"mhacauth=' + response.data.token + '; ' + expires + '; path=/; secure"'
        document.cookie = cookie
        console.log(cookie)
        this.$store.dispatch('setAuth', response.data.token)
        this.$router.push('/admin/tournament')
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
.loginWrapper {
  background: #e4e4e4;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  width: 350px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #121212;
  padding: 2rem;
  margin: auto;
  img {
    width: 65%;
    display: block;
    margin-bottom: 2rem;
  }
}

label,
button {
  display: block;
}
button {
  text-align: right;
}

.button,
  button,
  [type="button"] {
    float: right;
    margin-top: 1rem;
    background-color: @conf-blue;
    color: #fff;
    padding: .3125rem .625rem;
    border-style: unset;
    white-space: nowrap;
    // border-radius: 5px;
    // transform: skewX(-45deg);
    &:hover {
      background-color: @nav-blue;
    }
  }

  @keyframes fa-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}
  .animate {
    animation: fa-spin 4s infinite linear;
  }
</style>
