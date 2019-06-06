import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Users/Login')
const Register = () => import('@/views/Users/Register')

// Funds
const Funds = () => import('@/views/Funds/Funds')
const Fund = () => import('@/views/Funds/Fund')
const FundView = () => import('@/views/Funds/FundView')

// Wallet Of Funds
const WalletFunds = () => import('@/views/WalletFunds/WalletFunds')
const WalletFund = () => import('@/views/WalletFunds/WalletFund')
const WalletView = () => import('@/views/WalletFunds/WalletView')
const WalletEdit = () => import('@/views/WalletFunds/WalletEdit')
Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'funds',
          meta: { label: 'Funds' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Funds,
            },
            {
              path: 'fund',
              meta: { label: 'New Fund' },
              name: 'NewFund',
              component: Fund,
            },
            {
              path: 'fundView/:isin',
              meta: { label: 'Fund Details' },
              name: 'FundView',
              component: FundView,
            }
          ]
        },
        {
          path: 'Portfoliofunds',
          meta: { label: 'Portfolio of Funds' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: WalletFunds,
            },
            {
              path: 'Portfoliofund',
              meta: { label: 'New Portfolio Fund' },
              name: 'NewPortfolioFund',
              component: WalletFund,
            },
            {
              path: 'PortfolioView/:wallet',
              meta: { label: 'Portfolio Details' },
              name: 'PortfolioView',
              component: WalletView,
            },
            {
              path: 'PortfolioEdit/:wallet',
              meta: { label: 'Portfolio Edit' },
              name: 'PortfolioEdit',
              component: WalletEdit,
            }
          ]
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
export default router;
