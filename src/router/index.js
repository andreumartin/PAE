import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/pantalles_calendar/Calendar.vue'
import FormCrearProjectes from '../components/pantalles_calendar/FormCrearProjectes.vue'
import ProjecteCreat from '../components/pantalles_calendar/ProjecteCreat.vue'
import PantallaEditarCreat from '../components/pantalles_calendar/PantallaEditarCreat.vue'
import SugerenciasMultimedia from '@/views/SugerenciasMultimedia.vue'
import dashboard from '../components/dashboard/dashboard.vue'
import ProjectMultimedia from '@/views/ProjectMultimedia.vue'
import ProjectDashboard from '@/views/ProjectDashboard.vue'
import To_Do from '@/views/To-Do.vue'
import Concept from '@/views/Concept.vue'
import Finance from '@/views/Finance.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: dashboard,
  },
  {
    path: '/calendar',
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
  },
  { 
    path: '/sugerencias', 
    name: 'SugerenciasMultimedia',
    component: SugerenciasMultimedia
  },
  {
    path: '/project/1',
    name: 'ProjectDashboard',
    component: ProjectDashboard
  },
  {
    path: '/project/1/to-do',
    name: 'To-Do',
    component: To_Do
  },
  {
    path: '/project/1/concept',
    name: 'Concept',
    component: Concept
  },
  {
    path: '/project/1/multimedia',
    name: 'Multimedia',
    component: ProjectMultimedia
  },
  {
    path: '/project/1/finance',
    name: 'Finance',
    component: Finance
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
