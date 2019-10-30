// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/index'

// Styles and Components
import './assets/less/main.less'

// Font Awesome
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* ********************************* *\
     Global Component Registration
\* ********************************* */
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* ********************************* *\
          Configuration
\* ********************************* */

/* ********************************* *\
          Init Components
\* ********************************* */
library.add(fas, far)
dom.watch()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
