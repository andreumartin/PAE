<template>
  <div class="event-container">
    <div class="event-card">
      <div class="event-header">
        <img class="event-icon" src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Evento" />
        <h2 class="event-title">Editar Evento</h2>
      </div>
      <div class="event-info">
        <div class="event-main">
          <input v-model="event.title" class="edit-input main-title" placeholder="Título del evento" />
          <textarea v-model="event.description" class="edit-textarea event-desc" placeholder="Descripción del evento..."></textarea>
          <div class="event-dates">
            <div class="date-input">
              <b>Inicio:</b>
              <input type="datetime-local" v-model="event.start" class="edit-input" />
            </div>
            <div class="date-input">
              <b>Fin:</b>
              <input type="datetime-local" v-model="event.end" class="edit-input" />
            </div>
          </div>
          <div class="event-extra">
            <b>Información adicional:</b>
            <textarea v-model="event.extra" class="edit-textarea" placeholder="Información adicional..."></textarea>
          </div>
          <div style="height: 2.5rem;"></div>
          <div class="button-group">
            <button class="edit-btn save-btn" @click="guardarCambios">Guardar cambios</button>
            <button class="edit-btn cancel-btn" @click="router.push('/crear-evento')">Cancelar</button>
          </div>
        </div>
        <div class="event-media">
          <div class="media-gallery">
            <h4 class="media-title"><span class="media-icon">🖼️</span> Imágenes del evento</h4>
            <div class="media-list">
              <div v-for="(img, i) in event.images" :key="i" class="media-item">
                <img :src="img" class="media-img" />
                <div class="media-actions">
                  <button class="media-btn delete-btn" @click="eliminarImagen(i)">🗑️</button>
                </div>
              </div>
              <div class="media-upload">
                <input type="file" accept="image/*" @change="agregarImagen" class="file-input" />
                <button class="media-btn upload-btn">+ Añadir imagen</button>
              </div>
            </div>
          </div>
          <div class="media-gallery">
            <h4 class="media-title"><span class="media-icon">🎥</span> Vídeos del evento</h4>
            <div class="media-list">
              <div v-for="(vid, i) in event.videos" :key="i" class="media-item">
                <video :src="vid" class="media-video" controls poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" />
                <div class="media-actions">
                  <button class="media-btn delete-btn" @click="eliminarVideo(i)">🗑️</button>
                </div>
              </div>
              <div class="media-upload">
                <input type="file" accept="video/*" @change="agregarVideo" class="file-input" />
                <button class="media-btn upload-btn">+ Añadir video</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const event = ref({
  title: '',
  description: '',
  start: '',
  end: '',
  extra: '',
  images: [],
  videos: []
})

onMounted(() => {
  if (route.params.evento) {
    try {
      const eventoData = JSON.parse(route.params.evento)
      event.value = eventoData
    } catch (error) {
      console.error('Error al parsear los datos del evento:', error)
    }
  }
})

const agregarImagen = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      event.value.images.push(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

const agregarVideo = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      event.value.videos.push(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

const eliminarImagen = (index) => {
  event.value.images.splice(index, 1)
}

const eliminarVideo = (index) => {
  event.value.videos.splice(index, 1)
}

const guardarCambios = () => {
  // Aquí implementarías la lógica para guardar los cambios
  console.log('Guardando cambios:', event.value)
  router.push({
    name: 'EventoCreado',
    params: { evento: JSON.stringify(event.value) }
  })
}
</script>

<style scoped>
.event-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7faff 0%, #e3e9f7 100%);
}

.event-card {
  max-width: 1200px;
  width: 99vw;
  min-height: 80vh;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(60, 80, 180, 0.12), 0 1.5px 8px rgba(60, 80, 180, 0.08);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}

.event-icon {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px #2563eb22);
}

.event-title {
  color: #2563eb;
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 2px 8px #2563eb11;
  margin: 0;
}

.event-info {
  display: flex;
  gap: 2.5rem;
  width: 100%;
  justify-content: space-between;
}

.event-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.edit-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e3e9f7;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #23408e;
  background: #f7faff;
}

.edit-textarea {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e3e9f7;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #23408e;
  background: #f7faff;
  min-height: 100px;
  resize: vertical;
}

.event-dates {
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
}

.date-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-extra {
  background: #f7faff;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  color: #23408e;
  font-size: 1.08rem;
}

.event-media {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}

.media-gallery {
  width: 100%;
}

.media-title {
  color: #2563eb;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.media-icon {
  font-size: 1.5rem;
}

.media-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.media-item {
  position: relative;
}

.media-img {
  width: 180px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #bfc8e6;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.10);
  background: #fff;
}

.media-video {
  width: 240px;
  height: 120px;
  border-radius: 10px;
  border: 2px solid #bfc8e6;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(60, 80, 180, 0.10);
  background: #fff;
}

.media-actions {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 0.5rem;
}

.media-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delete-btn:hover {
  background: #ff4444;
  color: white;
}

.media-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.file-input {
  display: none;
}

.upload-btn {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.upload-btn:hover {
  background: #23408e;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
}

.edit-btn {
  padding: 0.7rem 2.2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.2s;
}

.save-btn {
  background: linear-gradient(90deg, #2563eb 60%, #23408e 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
}

.save-btn:hover {
  background: linear-gradient(90deg, #23408e 60%, #2563eb 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.11);
}

.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
  box-shadow: 0 2px 8px rgba(100, 116, 139, 0.07);
}

.cancel-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

@media (max-width: 1100px) {
  .event-card {
    max-width: 99vw;
    width: 99vw;
    padding: 1.2rem 0.5rem;
  }
  
  .event-info {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .media-img, .media-video {
    width: 100px;
    height: 70px;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .edit-btn {
    width: 100%;
  }
}
</style>
