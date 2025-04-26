import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import ProjectMultimedia from '@/components/ProjectMultimedia.vue'

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/hello-world', component: HelloWorld },
  { path: '/project/:id/multimedia', component: ProjectMultimedia }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router