<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

// Mock data for user events
const userEvents = ref([
  { id: 1, title: 'Conferencia', date: '2025-06-15', location: 'Barcelona' },
  { id: 2, title: 'Quedada gamer', date: '2025-06-20', location: 'Madrid' },
  { id: 3, title: 'Startups de Valencia', date: '2025-06-25', location: 'Valencia' }
])

const navigateToCreateEvent = () => {
  router.push('/crear-evento')
}

const navigateToCalendar = () => {
  router.push('/calendar')
}

const navigateToProject = () => {
  router.push('/project/1')
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
          <h1>Mis Eventos</h1>
          <p></p>
        </div>
        
        <!-- Event List -->
        <div class="event-list">
          <div v-if="userEvents.length === 0" class="empty-state">
            No events found. Create your first event!
          </div>
          <div v-else class="event-cards">
            <div v-for="event in userEvents" :key="event.id" class="event-card" @click="navigateToProject">
              <h3>{{ event.title }}</h3>
              <div class="event-details">
                <p><strong>Fecha:</strong> {{ event.date }}</p>
                <p><strong>Localización:</strong> {{ event.location }}</p>
              </div>
            </div>
          </div>
          
          <!-- Create Event Button (moved to bottom) -->
          <button class="create-btn" @click="navigateToCreateEvent">Crear Evento</button>
        </div>
      </main>
    </div>
  </div>
</template>