<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewMonthGrid,
  createViewWeek,
  createViewDay,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'

const search = ref('')

const allEvents = [
  { id: '1', title: 'Grabación contenido promocional TikTok', start: '2025-05-05', end: '2025-05-05' },
  { id: '2', title: 'Reunión con proveedores', start: '2025-05-09', end: '2025-05-09' },
  { id: '3', title: 'Organización voluntarios', start: '2025-05-14', end: '2025-05-14' },
]

function getFilteredEvents() {
  return allEvents.filter(e => e.title.toLowerCase().includes(search.value.toLowerCase()))
}

function getFirstEventDate(events) {
  return events.length > 0 ? events[0].start : '2025-05-04'
}

const initialEvents = getFilteredEvents()
const calendarApp = shallowRef(createCalendar({
  views: [
    createViewMonthGrid(),
    createViewWeek(),
    createViewDay(),
  ],
  defaultView: 'monthGrid',
  selectedDate: getFirstEventDate(initialEvents),
  events: initialEvents,
}))

watch(search, (newValue) => {
  const filtered = getFilteredEvents()
  calendarApp.value = createCalendar({
    views: [
      createViewMonthGrid(),
      createViewWeek(),
      createViewDay(),
    ],
    defaultView: 'monthGrid',
    selectedDate: getFirstEventDate(filtered),
    events: filtered,
  })
})
</script>

<template>
  <div class="calendar-container">
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input
        v-model="search"
        type="text"
        placeholder="Buscar eventos por nombre..."
        class="search-input"
      />
      <button v-if="search" class="clear-btn" @click="search = ''" title="Limpiar búsqueda">✖</button>
    </div>
    <div class="calendar-wrapper">
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f7f7fa;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  width: 500px;
  max-width: 95vw;
  position: relative;
}

.search-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  color: #888;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1rem;
  background: transparent;
  padding: 0.5rem 0;
}

.clear-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #c00;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color 0.2s;
}
.clear-btn:hover {
  color: #900;
}

.calendar-wrapper {
  width: 100%;
  max-width: 1600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 2rem 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.sx-vue-calendar-wrapper {
  width: 100%;
  min-width: 900px;
  max-width: 1500px;
  height: 800px;
  margin: 0 auto;
}
</style>