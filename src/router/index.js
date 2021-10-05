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
import hallOfFame from '@/components/front-pages/hallOfFame'

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
import adminTournament from '@/components/admin/adminTournament'
import adminSeason from '@/components/admin/adminSeason'
import adminSeasonTeams from '@/components/admin/adminSeasonTeams'
import editHomepage from '@/components/admin/editHomepage'
import manageStandings from '@/components/admin/manageStandings'

// Config Helpers
import config from '@/config/helpers'

import { store } from '../store/index'

const $config = config.CONSTANTS

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
      path: '/tournament',
      name: 'tournament',
      component: tournament,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: '2020 Season Tournament | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: compliance,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'About | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/history',
      name: 'about',
      component: compliance,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'About | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/hall-of-fame',
      name: 'hall-of-fame',
      component: hallOfFame,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: 'Hall of Fame | Midsouth Homeschool Athletics'
      }
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: schedules,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: `${$config.seasonYear} Schedule | Midsouth Homeschool Athletics`
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: stats,
      meta: {
        requiresAuth: false,
        section: 'public',
        title: `${$config.seasonYear} Stats | Midsouth Homeschool Athletics`
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
        section: 'team',
        title: 'Team Management | Midsouth Homeschool Athletics'
      },
      children: [
        {
          path: '',
          name: 'teamDashboard',
          component: teamhome,
          meta: {
            requiresAuth: true,
            section: 'team',
            title: 'Team Management | Midsouth Homeschool Athletics'
          }
        },
        {
          path: 'roster',
          name: 'roster',
          component: roster,
          meta: {
            requiresAuth: true,
            section: 'team',
            title: 'Team Management | Midsouth Homeschool Athletics'
          }
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: schedule,
          meta: {
            requiresAuth: true,
            section: 'team',
            title: 'Team Management | Midsouth Homeschool Athletics'
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile,
          meta: {
            requiresAuth: true,
            section: 'team',
            title: 'Team Management | Midsouth Homeschool Athletics'
          }
        },
        {
          path: 'stats',
          name: 'gamestats',
          component: gamestats,
          meta: {
            requiresAuth: true,
            section: 'team',
            title: 'Team Management | Midsouth Homeschool Athletics'
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
          path: 'edit',
          name: 'Edit',
          component: editHomepage,
          meta: {
            requiresAuth: true,
            section: 'admin'
          },
          children: [
            {
              path: 'homepage',
              name: 'editHomepage',
              meta: {
                requiresAuth: true,
                section: 'admin'
              }
            }
          ]
        },
        {
          path: 'tournament',
          name: 'adminTournament',
          component: adminTournament,
          meta: {
            requiresAuth: true,
            section: 'admin'
          }
        },
        {
          path: 'seasons',
          name: 'adminSeason',
          component: adminSeason,
          meta: {
            requiresAuth: true,
            section: 'admin'
          }
        },
        {
          path: 'seasonsTeams',
          name: 'adminSeasonTeams',
          component: adminSeasonTeams,
          meta: {
            requiresAuth: true,
            section: 'admin'
          }
        },
        {
          path: 'manage_standings',
          name: 'manageStandings',
          component: manageStandings,
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
        if (to.meta.section === 'team') {
          if (store.getters.userGroups[0] === 'Admin') {
            return next()
          } else {
            if (to.params.slug !== store.getters.userGroups[0]) {
              return next({ name: 'teamDashboard', params: { slug: store.getters.userGroups[0] } })
            } else {
              return next()
            }
          }
        }
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
