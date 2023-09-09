/* eslint-disable no-undef */
// import Vue from 'vue'

import { createApp, h } from 'vue'
import "./init.js"
import App from './App.vue'
import { router } from './router'
import { store } from './store/index'


// Styles and Components
import './assets/less/main.less'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Font Awesome
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'

import '@aws-amplify/ui-vue'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import awsCookieStorage from '@/config/aws-cookieStorage'

// local config
import config from './config/helpers'

Amplify.configure({ ...awsconfig, ...awsCookieStorage })

/* ********************************* *\
     Global Component Registration
\* ********************************* */
// Vue.component('font-awesome-icon', FontAwesomeIcon)

/* ********************************* *\
          Configuration
\* ********************************* */
function setLogoPosType(el) {
  const footer = document.getElementById('publicMainFooter')
  const footerOffset = footer.offsetTop
  const footerPos = footer.getBoundingClientRect().y
  if (el.offsetTop + el.getBoundingClientRect().height >= footerPos) {
    el.style.position = 'absolute'
  }
  if (window.pageYOffset + window.innerHeight < footerOffset) {
    el.style.position = 'fixed'
  }
}
// Vue.directive('stickBottom', {
//   bind(el) {
//     window.addEventListener('scroll', e => {
//       setLogoPosType(el)
//     })
//   },
//   unbind(el) {
//     window.removeEventListener('scroll', setLogoPosType)
//   }
// })

/* ********************************* *\
          Init Components
\* ********************************* */
library.add(fas, far, faFacebookSquare, faInstagram)
dom.watch()

/* eslint-disable no-new */
const app = createApp({ render: () => h(App) })

app.use(router)
app.use(vuetify)
app.use(store)


app.mount('#app')


/* ********************************* *\
          Google Analytics
\* ********************************* */
// ga('set', 'page', router.currentRoute.path)
// ga('send', 'pageview')

// router.afterEach((to, from) => {
//   ga('set', 'page', to.path)
//   ga('send', 'pageview')
// })
