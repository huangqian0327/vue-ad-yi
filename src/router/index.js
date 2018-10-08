import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/examples/index'
import AdcommonPreview from '@/examples/ad-preview'
import TimeRange from '@/examples/time-range'
import AdPreview from '@/examples/ad-gif-preview.vue'
import DragView from '@/examples/drag-view.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/adCommonPreview',
      name: 'adCommonPreview',
      component: AdcommonPreview
    },
    {
      path: '/timeRange',
      name: 'timeRange',
      component: TimeRange
    },
    {
      path: '/adPreview',
      name: 'adPreview',
      component: AdPreview
    },
    {
      path: '/dragView',
      name: 'dragView',
      component: DragView
    }
  ]
})
