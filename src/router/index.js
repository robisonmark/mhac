import Vue from 'vue'
import Router from 'vue-router'
import second from '@/components/second'

// Front Pages
// import website from '@/components/website'
import home from '@/components/front-pages/home'
import compliance from '@/components/front-pages/compliance'
import schedules from '@/components/front-pages/schedules'
import stats from '@/components/front-pages/stats'
import schools from '@/components/front-pages/schools'
import contact from '@/components/front-pages/contact'

// Team Management Components
import TeamManagement from '@/components/TeamManagement'
import teamhome from '@/components/team-management/teamhome'
import roster from '@/components/team-management/roster'
import schedule from '@/components/team-management/schedule'
import gamestats from '@/components/team-management/stats'
import profile from '@/components/team-management/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
      }
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: compliance
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: schedules
    },
    {
      path: '/stats',
      name: 'stats',
      component: stats
    },
    {
      path: '/schools',
      name: 'schools',
      component: schools,
      children: [
        {
          path: '/:school',
          name: 'school',
          component: second
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/manage/:team',
      component: TeamManagement,
      meta: {},
      children: [
        {
          path: '',
          name: 'dashboard',
          component: teamhome
        },
        {
          path: 'roster',
          name: 'roster',
          component: roster
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile
        },
        {
          path: 'stats',
          name: 'gamestats',
          component: gamestats
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: TeamManagement,
      meta: {},
      children: [
      ]
    }
    // NEED ERROR ROUTES and THINK THROUGH NON INDEXING PAGES
  ]
})
