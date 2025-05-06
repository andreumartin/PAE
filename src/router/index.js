import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/pantalles_calendar/Calendar.vue'
import FormCrearProjectes from '../components/pantalles_calendar/FormCrearProjectes.vue'
import ProjecteCreat from '../components/pantalles_calendar/ProjecteCreat.vue'
import PantallaEditarCreat from '../components/pantalles_calendar/PantallaEditarCreat.vue'

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/crear-evento',
    name: 'CrearEvento',
    component: FormCrearProjectes,
  },
  {
    path: '/evento-creado',
    name: 'EventoCreado',
    component: ProjecteCreat,
  },
  {
    path: '/editar-evento/:evento',
    name: 'editar-evento',
    component: PantallaEditarCreat,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
