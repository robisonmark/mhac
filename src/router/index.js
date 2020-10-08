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

// Admin Components
import admin from '@/components/admin'
// import login from '@/components/admin/login'
import adminTournament from '@/components/admin/tournament'

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
        requiresAuth: false,
        section: 'public',
        title: 'MHAC | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../components/login.vue'),
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'MHAC | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/signout',
      name: 'signout',
      component: () => import(/* webpackChunkName: "login" */ '../components/login.vue'),
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'MHAC | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/tournament2020',
      name: 'tournament',
      component: tournament,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: '2020 Season Tournament | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: compliance,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'Compliance | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: schedules,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: '2019-2020 Schedule | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: stats,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: '2019-2020 Stats | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'Contact Us | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/schools/:slug',
      name: 'schools',
      component: schools,
      props: true,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'Schools | Midsouth Homeschool Athletics'
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
        requiresAuth: true,
        section: 'team'
      },
      children: [
        {
          path: '',
          name: 'teamDashboard',
          component: teamhome,
          meta: {
            requiresAuth: true,
            section: 'team'
          }
        },
        {
          path: 'roster',
          name: 'roster',
          component: roster,
          meta: {
            requiresAuth: true,
            section: 'team'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule,
          meta: {
            requiresAuth: true,
            section: 'team'
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            requiresAuth: true,
            section: 'team'
          }
        },
        {
          path: 'stats',
          name: 'gamestats',
          component: gamestats,
          meta: {
            requiresAuth: true,
            section: 'team'
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        requiresAuth: true,
        section: 'admin'
      },
      children: [
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: login,
        //   meta: {
        //     requiresAuth: false,
        //     section: 'admin'
        //   }
        // },
        {
          path: 'tournament',
          name: 'adminTournament',
          component: adminTournament,
          meta: {
            requiresAuth: true,
            section: 'admin'
          }
        }
      ]
    }
    // NEED ERROR ROUTES and THINK THROUGH NON INDEXING PAGES
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (Object.prototype.hasOwnProperty.call(to, 'meta')) {
    if (Object.prototype.hasOwnProperty.call(to.meta, 'title') && to.meta.title) document.title = to.meta.title
    const validSession = await Promise.resolve(store.dispatch('valid'))
    if (to.meta.requiresAuth === true) {
      if (validSession === true) {
        return next()
      } else {
        if (to.meta.section === 'admin') {
          return next('/admin/login')
        } else {
          return next('/')
        }
      }
    }
    return next()
  }
  return next()
})
