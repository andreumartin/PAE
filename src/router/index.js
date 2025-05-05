import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import ProjectMultimedia from '@/components/ProjectMultimedia.vue'
import SugerenciasMultimedia from '@/views/SugerenciasMultimedia.vue'

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/hello-world', component: HelloWorld },
  { path: '/project/:id/multimedia', component: ProjectMultimedia },
  { path: '/sugerencias', name: 'SugerenciasMultimedia',component: SugerenciasMultimedia }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router