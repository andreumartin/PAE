import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/pantalles_calendar/Calendar.vue'
import FormCrearProjectes from '../components/pantalles_calendar/FormCrearProjectes.vue'
import ProjecteCreat from '../components/pantalles_calendar/ProjecteCreat.vue'
import PantallaEditarCreat from '../components/pantalles_calendar/PantallaEditarCreat.vue'
import SugerenciasMultimedia from '@/views/SugerenciasMultimedia.vue'
import dashboard from '../components/dashboard/dashboard.vue'
import ProjectMultimedia from '@/components/ProjectMultimedia.vue'
import Analytics from '../components/analiticas/analiticas.vue'
import Networking from '@/views/Networking.vue'
import PlanificacionEvento from '@/views/PlanificacionEvento.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: dashboard,
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('../components/preview/preview.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
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
    path: '/project/1/multimedia',
    name: 'Multimedia',
    component: ProjectMultimedia
  },
  {
    path: '/networking',
    name: 'Networking',
    component: Networking
  },
  {
    path: '/planificacion',
    name: 'PlanificacionEvento',
    component: PlanificacionEvento
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
