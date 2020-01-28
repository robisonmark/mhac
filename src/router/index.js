import Vue from 'vue'
import Router from 'vue-router'
// import second from '@/components/second'

// Front Pages
// import website from '@/components/website'
import home from '@/components/front-pages/home'
import tournament from '@/components/front-pages/tournament'
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

import { store } from '../store/index'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/tournament2020',
      name: 'tournament',
      component: tournament,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: compliance,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: schedules,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: stats,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
    },
    {
      path: '/schools/:slug',
      name: 'schools',
      component: schools,
      props: true,
      meta: {
        'requiresAuth': false,
        'section': 'public'
      }
      // children: [
      //   {
      //     path: '/:school',
      //     name: 'school',
      //     component: second,
      //     meta: {
      // 'requiresAuth': false,
      //       'section': 'public'
      //     }
      //   }
      // ]
    },
    {
      path: '/manage/:slug',
      component: TeamManagement,
      meta: {
        'requiresAuth': true
      },
      children: [
        {
          path: '',
          name: 'teamDashboard',
          component: teamhome,
          meta: {
            'requiresAuth': true,
            'section': 'team'
          }
        },
        {
          path: 'roster',
          name: 'roster',
          component: roster,
          meta: {
            'requiresAuth': true,
            'section': 'team'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule,
          meta: {
            'requiresAuth': true,
            'section': 'team'
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            'requiresAuth': true,
            'section': 'team'
          }
        },
        {
          path: 'stats',
          name: 'gamestats',
          component: gamestats,
          meta: {
            'requiresAuth': true,
            'section': 'team'
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: TeamManagement,
      meta: {
        'requiresAuth': true,
        'section': 'admin'
      },
      children: [
      ]
    }
    // NEED ERROR ROUTES and THINK THROUGH NON INDEXING PAGES
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.hasOwnProperty('meta')) {
    // Use the route's "meta.title" value to assign the page's title
    if (to.meta.hasOwnProperty('title') && to.meta.title) document.title = to.meta.title
    // For routes requiring authentication ( has "meta.requiresAuth" property )
    if (to.meta.requiresAuth === true) {
      let validSession = await Promise.resolve(store.dispatch('valid'))
      console.log(validSession)
      if (validSession === true) {
        return next()
      } else {
        return next('/')
        // window.location.replace(process.env.ACCOUNT_LOC)
      }
    }
    return next()
  }
  return next()
})
