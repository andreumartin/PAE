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
                <button @click="removeTask(section, task.id)" class="delete-task-button">Eliminar</button>
            </div>
          </li>
        </ul>
        <button @click="showAddTaskPopup = true; currentSection = section">Agregar tarea</button>
        <button @click="removeSection(index)">Eliminar sección</button>
      </li>
    </ul>
    <button @click="showAddSectionPopup = true">Agregar sección</button>

    <div v-if="showAddSectionPopup || showAddTaskPopup ||showEditSectionNamePopup" class="popup-background"></div>

    <!-- Popup para cambiar el nombre de la sección -->
    <div v-if="showEditSectionNamePopup" class="popup">
      <h2>Cambiar nombre de la sección</h2>
      <input type="text" v-model="newSectionName" placeholder="Nuevo nombre de la sección" />
      <button @click="updateSectionName">Guardar</button>
      <button @click="showEditSectionNamePopup = false">Cancelar</button>
    </div>

    <!-- Popup para agregar sección -->
    <div v-if="showAddSectionPopup" class="popup">
      <h2>Agregar sección</h2>
      <input type="text" v-model="newSectionName" placeholder="Nombre de la sección" />
      <button @click="addSection">Agregar</button>
      <button @click="showAddSectionPopup = false">Cancelar</button>
    </div>

    <!-- Popup para agregar tarea -->
    <div v-if="showAddTaskPopup" class="popup">
      <h2>Agregar tarea</h2>
      <input type="text" v-model="newTaskText" placeholder="Nombre de la tarea" />
      <button @click="addTask">Agregar</button>
      <button @click="showAddTaskPopup = false">Cancelar</button>
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

<style>
.todo-list {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.todo-list h1 {
  margin-top: 0;
}

.todo-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  margin-bottom: 10px;
}

.todo-list input[type="checkbox"] {
  margin-right: 10px;
}

.todo-list .done {
  text-decoration: line-through;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup h2 {
  margin-top: 0;
}

.popup input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}

.popup button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.popup button:hover {
  background-color: #3e8e41;
}

.button delete-task-button {
  margin-left: auto;
}

.task-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
}

.task-container input[type="checkbox"] {
  margin-right: 10px;
  vertical-align: middle;
}

.task-container span {
  flex-grow: 1;
  line-height: 30px;
  vertical-align: middle;
}

.task-container .delete-task-button {
  vertical-align: middle;
}

.progress-container {
  display: flex;
  align-items: center;
}

progress {
  width: 80%;
  height: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ccc;
}

.progress-lowest::-webkit-progress-value {
  background-color: #FF0000;
}

.progress-low::-webkit-progress-value {
  background-color: #ff7300;
}

.progress-medium::-webkit-progress-value {
  background-color: #ffdd00;
}

.progress-high::-webkit-progress-value {
  background-color: #9dff00;
}

.progress-highest::-webkit-progress-value {
  background-color: #00FF00;
}

progress::-webkit-progress-bar {
  background-color: #ccc;
}

progress::-webkit-progress-value {
  background-color: #4CAF50;
}

.score {
  margin-left: 10px;
  font-weight: bold;
}
</style>