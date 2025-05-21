<template>
    <div style="display: flex; flex-direction: column; font-family: sans-serif;">
      <header style="color: #23408e; padding: 1rem; font-size: 1.25rem;">
        Planificación de Evento: Fecha y Recinto
      </header>
  
      <!-- Filtros -->
      <div style="padding: 1rem; display: flex; gap: 1rem; align-items: center;">
        <label>
          Fecha:
          <input type="date" v-model="selectedDate" />
        </label>
  
        <label >
          Recinto:
          <select v-model="selectedVenue">
            <option value="">Todos</option>
            <option v-for="v in uniqueVenues" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
  
        <button class="button" @click="resetFilters">Ver todo</button>
      </div>
  
      <!-- Resultados -->
      <div style="flex: 1; overflow-y: auto;">
        <h3 style="margin-top: 0;">Eventos encontrados:</h3>
        <div
          v-for="(event, i) in filteredEvents"
          :key="i"
          style="border: 1px solid #ccc; border-radius: 6px; padding: 1rem; margin-bottom: 1rem; background: white;"
        >
          <strong>{{ event.title }}</strong><br />
          Fecha: {{ event.date }}<br />
          Recinto: {{ event.venue }}
        </div>
  
        <div v-if="filteredEvents.length === 0" style="color: #777;">No hay eventos para esos filtros.</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const selectedDate = ref('')
  const selectedVenue = ref('')
  
  const events = ref([
    { date: '2025-06-03', title: 'Festival Indie BCN', venue: 'Sala Apolo' },
    { date: '2025-06-03', title: 'Tech Meet Up', venue: 'CCCB' },
    { date: '2025-06-04', title: 'Día del Yoga', venue: 'Parc de la Ciutadella' },
    { date: '2025-06-10', title: 'Concierto Solidario', venue: 'Sala Apolo' },
    { date: '2025-06-10', title: 'Exposición Creativa', venue: 'CCCB' }
  ])
  
  const uniqueVenues = computed(() =>
    [...new Set(events.value.map(e => e.venue))].sort()
  )
  
  const filteredEvents = computed(() => {
    return events.value.filter(event => {
      const matchDate = selectedDate.value ? event.date === selectedDate.value : true
      const matchVenue = selectedVenue.value ? event.venue === selectedVenue.value : true
      return matchDate && matchVenue
    })
  })
  
  function resetFilters() {
    selectedDate.value = ''
    selectedVenue.value = ''
  }
  </script>
  