import scss from './app.scss'

import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import selectize from 'vue-selectize';

import App from './components/App.vue'
import Directions from './components/Directions.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import RideRequest from './components/RideRequest.vue'
import RideRequests from './components/RideRequests.vue'

import auth from './services/auth';

// Install plugins
Vue.use(Router)
Vue.use(Resource)
Vue.use(selectize);

// Check the users auth status when the app starts
auth.checkAuth(Vue)

// Set up a new router
var router = new Router()

// Route config
router.map({
  '/home':{
    name: 'home',
    component: Home
  },
  '/login':{
    name: 'login',
    component: Login
  },
  '/ride-request':{
    name: 'ride-request',
    component: RideRequest
  },
  '/ride-requests':{
    name: 'ride-requests',
    component: RideRequests
  },
  '/directions/:requestID':{
    name: 'directions',
    component: Directions
  }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
  '*': '/home'
})

// Start up our app
router.start(App, '#app')
