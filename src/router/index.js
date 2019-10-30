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
        'section': 'public'
      }
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: compliance,
      meta: {
        'section': 'public'
      }
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: schedules,
      meta: {
        'section': 'public'
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: stats,
      meta: {
        'section': 'public'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {
        'section': 'public'
      }
    },
    {
      path: '/schools',
      name: 'schools',
      component: schools,
      children: [
        {
          path: '/:school',
          name: 'school',
          component: second,
          meta: {
            'section': 'public'
          }
        }
      ]
    },
    {
      path: '/manage/:team',
      component: TeamManagement,
      meta: {},
      children: [
        {
          path: '',
          name: 'dashboard',
          component: teamhome,
          meta: {
            'section': 'team'
          }
        },
        {
          path: 'roster',
          name: 'roster',
          component: roster,
          meta: {
            'section': 'team'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule,
          meta: {
            'section': 'team'
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            'section': 'team'
          }
        },
        {
          path: 'stats',
          name: 'gamestats',
          component: gamestats,
          meta: {
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
        'section': 'admin'
      },
      children: [
      ]
    }
    // NEED ERROR ROUTES and THINK THROUGH NON INDEXING PAGES
  ]
})
