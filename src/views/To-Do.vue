<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <ul>
      <li v-for="(section, index) in sections" :key="index">
        <h2 @dblclick="showEditSectionNamePopup = true; currentSection = section">{{ section.name }}</h2>
        <div class="progress-container">
            <progress :value="getProgress(section)" :max="section.tasks.length" :class="getProgressColor(section)"></progress>
            <span class="score">{{ getScore(section) }}%</span>
        </div>
        <ul>
          <li v-for="task in section.tasks" :key="task.id">
            <div class="task-container">
                <input type="checkbox" v-model="task.done" />
                <span :class="{ done: task.done }">{{ task.text }}</span>
                <button @click="removeTask(section, task.id)" class="button">Eliminar</button>
            </div>
          </li>
        </ul>
        <button class="button" @click="showAddTaskPopup = true; currentSection = section">Agregar tarea</button>
        <button class="button" @click="removeSection(index)">Eliminar sección</button>
      </li>
    </ul>
    <button class="button" @click="showAddSectionPopup = true">Agregar sección</button>

    <div v-if="showAddSectionPopup || showAddTaskPopup ||showEditSectionNamePopup" class="popup-background"></div>

    <!-- Popup para cambiar el nombre de la sección -->
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
      newSectionName: "",
      newTaskText: "",
      nextTaskId: 3,
      showAddSectionPopup: false,
      showAddTaskPopup: false,
      currentSection: null,
      showEditSectionNamePopup: false,
    };
  },
  methods: {
    getProgress(section) {
      const completedTasks = section.tasks.filter(task => task.done).length;
      return completedTasks;
    },
    getScore(section) {
      const completedTasks = section.tasks.filter(task => task.done).length;
      const totalTasks = section.tasks.length;
      return Math.round((completedTasks / totalTasks) * 100);
    },
    getProgressColor(section) {
      const score = this.getScore(section);
      if (score <= 20) {
        return 'progress-lowest';
      } else if (score <= 40) {
        return 'progress-low';
      } else if (score <= 60) {
        return 'progress-medium';
      } else if (score <= 80) {
        return 'progress-high';
      } else {
        return 'progress-highest';
      }
    },
    addSection() {
      if (this.newSectionName !== "") {
        this.sections.push({ name: this.newSectionName, tasks: [] });
        this.newSectionName = "";
        this.showAddSectionPopup = false;
      }
    },
    addTask() {
      if (this.newTaskText !== "") {
        const newTask = { id: this.nextTaskId, text: this.newTaskText, done: false };
        this.currentSection.tasks.push(newTask);
        this.newTaskText = "";
        this.nextTaskId++;
        this.showAddTaskPopup = false;
      }
    },
    updateSectionName() {
      const index = this.sections.findIndex(section => section === this.currentSection);
      this.sections[index].name = this.newSectionName;
      this.showEditSectionNamePopup = false;
      this.newSectionName = '';
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
