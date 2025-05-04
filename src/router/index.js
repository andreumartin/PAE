import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/pantalles_calendar/Calendar.vue'

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: Calendar,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
