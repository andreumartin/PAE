<template>
  <div class="todo-list">
    <div class="mode-switch">
      <button class="button" :class="{ active: mode === 'default' }" @click="mode = 'default'">To-Do</button>
      <button class="button" :class="{ active: mode === 'easyevents' }" @click="mode = 'easyevents'">To-Do EasyEvents</button>
    </div>

    <h1>{{ mode === 'default' ? 'To-Do List' : 'EasyEvents Checklist' }}</h1>

    <ul>
      <li
        v-for="(section, index) in filteredSections"
        :key="index"
      >
        <h2 v-if="mode === 'default'" @dblclick="showEditSectionNamePopup = true; currentSection = section">
          {{ section.name }}
        </h2>
        <h2 v-else>{{ section.name }}</h2>

        <div class="progress-container">
          <progress :value="getProgress(section)" :max="section.tasks.length" :class="getProgressColor(section)"></progress>
          <span class="score">{{ getScore(section) }}%</span>
        </div>

        <ul>
          <li v-for="task in section.tasks" :key="task.id">
            <div class="task-container">
              <input type="checkbox" v-model="task.done" />
              <span :class="{ done: task.done }">{{ task.text }}</span>
              <button
                v-if="mode === 'default'"
                @click="removeTask(section, task.id)"
                class="button"
              >
                Eliminar
              </button>
            </div>
          </li>
        </ul>

        <div v-if="mode === 'default'">
          <button class="button" @click="showAddTaskPopup = true; currentSection = section">Agregar tarea</button>
          <button class="button" @click="removeSection(index)">Eliminar sección</button>
        </div>
      </li>
    </ul>

    <button
      v-if="mode === 'default'"
      class="button"
      @click="showAddSectionPopup = true"
    >
      Agregar sección
    </button>

    <div v-if="showAddSectionPopup || showAddTaskPopup || showEditSectionNamePopup" class="popup-background"></div>

    <!-- Popup para cambiar nombre sección -->
    <div v-if="showEditSectionNamePopup" class="popup">
      <h2>Cambiar nombre de la sección</h2>
      <input type="text" v-model="newSectionName" placeholder="Nuevo nombre de la sección" />
      <button class="button" @click="updateSectionName">Guardar</button>
      <button class="button" @click="showEditSectionNamePopup = false">Cancelar</button>
    </div>

    <!-- Popup para agregar sección -->
    <div v-if="showAddSectionPopup" class="popup">
      <h2>Agregar sección</h2>
      <input type="text" v-model="newSectionName" placeholder="Nombre de la sección" />
      <button class="button" @click="addSection">Agregar</button>
      <button class="button" @click="showAddSectionPopup = false">Cancelar</button>
    </div>

    <!-- Popup para agregar tarea -->
    <div v-if="showAddTaskPopup" class="popup">
      <h2>Agregar tarea</h2>
      <input type="text" v-model="newTaskText" placeholder="Nombre de la tarea" />
      <button class="button" @click="addTask">Agregar</button>
      <button class="button" @click="showAddTaskPopup = false">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'default', // 'default' o 'easyevents'
      sections: [
        {
          name: 'Organización',
          tasks: [
            { text: 'Reunión inicial del equipo', done: true },
            { text: 'Contactar con el recinto para disponibilidad y precios', done: false },
            { text: 'Definir roles y responsabilidades del equipo', done: false },
            { text: 'Establecer presupuesto preliminar', done: true },
          ],
        },
        {
          name: 'Concepto',
          tasks: [
            { text: 'Definir temática del evento', done: true },
            { text: 'Diseñar logo y paleta de colores', done: false },
            { text: 'Redactar la propuesta conceptual', done: true },
            { text: 'Seleccionar posibles invitados especiales', done: false },
          ],
        },
        {
          name: 'Marketing',
          tasks: [
            { text: 'Grabar y editar video promocional para TikTok', done: false },
            { text: 'Reunión con posibles patrocinadores e inversores', done: true },
            { text: 'Diseñar cartel y material promocional', done: false },
            { text: 'Lanzar campaña en redes sociales', done: false },
          ],
        },
        {
          name: 'Operativa',
          tasks: [
            { text: 'Contratar proveedores (catering, sonido, etc.)', done: false },
            { text: 'Planificar cronograma del día del evento', done: true },
            { text: 'Gestionar acreditaciones y entradas', done: false },
            { text: 'Organizar equipo de voluntarios', done: false },
          ],
        },
        {
          name: 'Titulo del evento',
          tasks: [
            { text: 'Titulo breve', done: false },
            { text: 'Titulo autodescriptivo', done: true },
            { text: 'Titulo llamativo', done: false },
          ],
        },
        {
          name: 'Descripción del evento',
          tasks: [
            { text: 'Explicacion detallada del evento', done: false },
            { text: 'Itinerario completo de actividades', done: true },
            { text: 'Invitados especiales', done: false },
            { text: 'Redes sociales relacionadas', done: false },
          ],
        },
      ],
      newSectionName: '',
      newTaskText: '',
      nextTaskId: 100,
      showAddSectionPopup: false,
      showAddTaskPopup: false,
      currentSection: null,
      showEditSectionNamePopup: false,
    };
  },
  computed: {
    filteredSections() {
      if (this.mode === 'easyevents') {
        return this.sections.filter(
          s => s.name.toLowerCase().includes('titulo') || s.name.toLowerCase().includes('descripción')
        )
      }
      return this.sections.filter(
        s => !s.name.toLowerCase().includes('titulo') && !s.name.toLowerCase().includes('descripción')
      )
    }
  },
  methods: {
    getProgress(section) {
      const completedTasks = section.tasks.filter(task => task.done).length;
      return completedTasks;
    },
    getScore(section) {
      const total = section.tasks.length || 1;
      const completed = section.tasks.filter(task => task.done).length;
      return Math.round((completed / total) * 100);
    },
    getProgressColor(section) {
      const score = this.getScore(section);
      if (score <= 20) return 'progress-lowest';
      if (score <= 40) return 'progress-low';
      if (score <= 60) return 'progress-medium';
      if (score <= 80) return 'progress-high';
      return 'progress-highest';
    },
    addSection() {
      if (this.newSectionName.trim() !== '') {
        this.sections.push({ name: this.newSectionName, tasks: [] });
        this.newSectionName = '';
        this.showAddSectionPopup = false;
      }
    },
    addTask() {
      if (this.newTaskText.trim() !== '') {
        const newTask = { id: this.nextTaskId++, text: this.newTaskText, done: false };
        this.currentSection.tasks.push(newTask);
        this.newTaskText = '';
        this.showAddTaskPopup = false;
      }
    },
    updateSectionName() {
      const index = this.sections.findIndex(section => section === this.currentSection);
      if (index !== -1) {
        this.sections[index].name = this.newSectionName;
        this.showEditSectionNamePopup = false;
        this.newSectionName = '';
      }
    },
    removeTask(section, taskId) {
      section.tasks = section.tasks.filter(task => task.id !== taskId);
    },
    removeSection(index) {
      this.sections.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.mode-switch {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.mode-switch .button.active {
  background-color: #4f46e5;
  color: white;
}
.popup-background {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 5;
}
.popup {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 10;
}
.task-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.done {
  text-decoration: line-through;
}
.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.score {
  font-weight: bold;
}
progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
}
.progress-lowest::-webkit-progress-value { background: #dc2626; }
.progress-low::-webkit-progress-value { background: #f97316; }
.progress-medium::-webkit-progress-value { background: #facc15; }
.progress-high::-webkit-progress-value { background: #4ade80; }
.progress-highest::-webkit-progress-value { background: #22c55e; }
</style>
