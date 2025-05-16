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

// Mock data for user elements
const projectElements = ref([
  { id: 1, title: 'To-Do', info: 'Done: 4\nPending: 2\nScore: 6.67', navigate: navigateToToDo },
  { id: 2, title: 'Concept', info: 'Conferencia en Barcelona...', navigate: navigateToConcept },
  { id: 3, title: 'Multimedia', info: 'folleto-promocional.png\ntrailer-video.mp4\n...', navigate: navigateToMultimedia },
  { id: 4, title: 'Timeline', info: 'Proximament: Reunió marketing...', navigate: navigateToTimeline },
  { id: 5, title: 'Finance', info: 'Budget: $1000\nCosts: $500', navigate: navigateToFinance }
])

const addEmptyElement = () => {
  // No hace nada
}
</script>

<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-open': showSidebar }">
      <div class="sidebar-header">
        <h2>Menu</h2>
        <button class="close-btn" @click="toggleSidebar">&times;</button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Mis Eventos</a></li>
          <li><a href="/calendar">Calendario</a></li>
          <li><a href="#">Configuración</a></li>
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content Area -->
    <div class="main-layout">
      <!-- Top Header -->
      <header class="top-header">
        <div class="top-element">
          <button class="menu-btn" @click="toggleSidebar">
            <span class="menu-icon"></span>
          </button>
        </div>
        <div class="logo-container">
          <span class="app-logo">UX TECH SOLUTIONS</span>
        </div>
        <div class="top-element">
          <button class="account-btn">CUENTA</button>
        </div>
      </header>
      
      <!-- Dashboard Content -->
      <main class="dashboard-content">
        <div class="content-header">
          <p></p>
          <h1>Project 1</h1>
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
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Reset margins and paddings to override main.css */
#app {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  display: block !important;
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #f5f7fa;
  color: #333;
}

:root {
  --primary-color: #4361ee;
  --primary-light: #4895ef;
  --primary-dark: #3a0ca3;
  --success-color: #4cc9f0;
  --warning-color: #f72585;
  --secondary-color: #560bad;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.dashboard-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-color) 100%);
  color: white;
  height: 100vh;
  position: fixed;
  left: -280px;
  top: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  box-shadow: var(--box-shadow);
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0.5rem;
  margin: 0;
}

.sidebar-nav li {
  margin: 0.5rem 0;
}

.sidebar-nav li a {
  display: block;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-nav li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

/* Main Layout */
.main-layout {
  flex: 1;
  min-height: 100vh;
  width: 100%;
  padding-left: 0;
}



.app-logo {
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 1px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  transition: transform 0.3s;
}

.menu-btn:hover {
  transform: scale(1.1);
}

.menu-icon, .menu-icon::before, .menu-icon::after {
  content: '';
  display: block;
  width: 25px;
  height: 3px;
  background-color: var(--primary-dark);
  position: relative;
  border-radius: 3px;
  transition: all 0.3s;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  top: 5px;
}

.account-btn {
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
}

.account-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
}

/* Dashboard Content */
.dashboard-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.content-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.create-btn {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
}

.create-btn:before {
  content: "+";
  font-size: 1.2rem;
  font-weight: 700;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
}

/* Event List */
.element-list {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: #718096;
  font-size: 1.1rem;
}

.element-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* aquí pones el número fijo de columnas */
  gap: 1.5rem;
  padding: 1rem 0;
}

.element-card {
  padding: 1.8rem;
  border-radius: var(--border-radius);
  border: none;
  background-color: white;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
</style>

<style scoped>
.dashboard-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-color) 100%);
  color: white;
  height: 100vh;
  position: fixed;
  left: -280px;
  top: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  box-shadow: var(--box-shadow);
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-nav ul {
  list-style: none;
  padding: 0.5rem;
  margin: 0;
}

.sidebar-nav li {
  margin: 0.5rem 0;
}

.sidebar-nav li a {
  display: block;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-nav li a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

/* Main Layout */
.main-layout {
  flex: 1;
  min-height: 100vh;
  width: 100%;
  padding-left: 0;
}

/* Top Header */
.top-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-element:first-child {
  justify-self: start;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-element:last-child {
  justify-self: end;
}

.top-element {
  display: inline-block;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-logo {
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 1px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  transition: transform 0.3s;
}

.menu-btn:hover {
  transform: scale(1.1);
}

.menu-icon, .menu-icon::before, .menu-icon::after {
  content: '';
  display: block;
  width: 25px;
  height: 3px;
  background-color: var(--primary-dark);
  position: relative;
  border-radius: 3px;
  transition: all 0.3s;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  top: 5px;
}

.account-btn {
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
}

.account-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
}

/* Dashboard Content */
.dashboard-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.content-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
}

.create-btn {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
}

.create-btn:before {
  content: "+";
  font-size: 1.2rem;
  font-weight: 700;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
}

/* Event List */
.element-list {
  width: 100%;
  max-width: 700px; /* Limit column width for better readability */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.element-card {
  padding: 1.8rem;
  border-radius: var(--border-radius);
  border: none;
  background-color: white;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Create Button - Now at bottom of column */
.create-btn {
  padding: 0.7rem 1.5rem;
  background: linear-gradient(to right, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.2);
  margin: 1.5rem auto;
  width: fit-content;
  min-width: 180px;
}

.create-btn:before {
  content: "+";
  font-size: 1.2rem;
  font-weight: 700;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(67, 97, 238, 0.3);
}

.element-details {
  margin: 1rem 0;
}

.element-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.3rem 0.8rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
}

.pre-line p {
  white-space: pre-line;
}
</style>