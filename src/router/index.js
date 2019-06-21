import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'
import AuthLayout from '../components/auth/AuthLayout'
import lazyLoading from './lazyLoading'

Vue.use(Router)

const demoRoutes = []
if (process.env.NODE_ENV === 'development') {
  const VueBook = require('vue-book')

  demoRoutes.push(
    VueBook.createRoute({
      requireContext: require.context('./..', true, /.demo.vue$/),
      path: '/demo',
    }),
    VueBook.createRoute({
      requireContext: require.context('./../components', true, /.vue$/),
      path: '/presentation',
    }),
  )

  Vue.use(VueBook.VueBookComponents)
}

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

export default new Router({
  mode: 'history',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: lazyLoading('auth/login/Login'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: lazyLoading('auth/signup/Signup'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundSearch'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundSimple'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundCustom'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundLargeText'),
        },
      ],
    },
    {
      name: 'crm',
      path: '/crm',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: lazyLoading('crm/Dashboard'),
          default: true
        }
      ],
    }
  ],
})
