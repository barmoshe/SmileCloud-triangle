import { createRouter, createWebHistory } from 'vue-router'
import InputPage from '../views/InputPage.vue'
import TrianglePage from '../views/TrianglePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'input',
      component: InputPage
    },
    {
      path: '/triangle',
      name: 'triangle',
      component: TrianglePage
    }
  ]
})

export default router 