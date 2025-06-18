<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const navigateToTimeline = () => {
  router.push('/calendar')
}

const navigateToToDo = () => {
  router.push('/project/1/to-do')
}

const navigateToConcept = () => {
  router.push('/project/1/concept')
  //window.open('https://docs.google.com/document/create', '_blank')
}

const navigateToMultimedia = () => {
  router.push('/project/1/multimedia')
}

const navigateToFinance = () => {
  router.push('/project/1/finance')
}

const navigateToPreview = () => {
  router.push('/preview')
}

// Mock data for user elements
const projectElements = ref([
  { id: 1, title: 'To-Do', info: 'Done: 6\nPending: 10\nScore: 3.75', navigate: navigateToToDo },
  { id: 2, title: 'Concept', info: 'UWS Video Part Festival 2025 presented by...', navigate: navigateToConcept },
  { id: 3, title: 'Multimedia', info: 'folleto-promocional.png\ntrailer-video.mp4\n...', navigate: navigateToMultimedia },
  { id: 4, title: 'Timeline', info: 'Proximament: Grabación contenido promocional, ...', navigate: navigateToTimeline },
  { id: 5, title: 'Finance', info: 'Balance: 2700,00€\nBudget: 6000,00€\nCosts: 3300,00€', navigate: navigateToFinance }
])

const addEmptyElement = () => {
  // No hace nada
}
</script>

<template>
  <div class="dashboard-container"> 
    <!-- Main Content Area -->
    <div class="main-layout">
      <!-- Dashboard Content -->
      <main class="dashboard-content">
        <div class="content-header">
          <p></p>
          <h1>UWS Video Part Festival 2025</h1>
          <p></p>
        </div> 
        <!-- Event List -->
        <div class="element-list">
          <div v-if="projectElements.length === 0" class="empty-state">
            No elements found. Create your first element!
          </div>
          <div v-else class="element-cards">
            <div v-for="element in projectElements" :key="element.id" class="element-card" @click="element.navigate">
              <h3>{{ element.title }}</h3>
              <div class="element-details pre-line">
                <p>{{ element.info }}</p>
              </div>
            </div>
          </div>
          <!-- Create Event Button (moved to bottom) -->
          <button class="create-btn" @click="addEmptyElement">Añadir Elemento en Blanco</button>
          <button class="create-btn" @click="navigateToPreview">Vista Previa del Proyecto</button>
        </div>
      </main>
    </div>
  </div>
</template>
