import Vue from 'vue'
import Router from 'vue-router'
import index from '@/examples/index'
import adPreview from '@/examples/ad-preview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/adPreview',
      name: 'adPreview',
      component: adPreview
    }
  ]
})
