<template>
  <div class="event-container">
    <div class="event-card">
      <div class="event-header">
        <img class="event-icon" src="https://cdn-icons-png.flaticon.com/512/747/747310.png" alt="Evento" />
        <h2 class="event-title">¡Evento creado con éxito!</h2>
      </div>
      <div class="event-info">
        <div class="event-main">
          <h3 class="main-title">{{ event.title || 'Título del evento' }}</h3>
          <p class="event-desc">{{ event.description || 'Descripción del evento...' }}</p>
          <div class="event-dates">
            <span><b>Inicio:</b> {{ formatDate(event.start) || 'dd/mm/aaaa --:--' }}</span>
            <span><b>Fin:</b> {{ formatDate(event.end) || 'dd/mm/aaaa --:--' }}</span>
          </div>
          <div v-if="event.extra" class="event-extra">
            <b>Información adicional:</b>
            <p>{{ event.extra }}</p>
          </div>
          <div style="height: 2.5rem;"></div>
          <button class="button" @click="navegarAEdicion">Editar evento</button>
        </div>
        <div class="event-media">
          <div v-if="event.images && event.images.length" class="media-gallery">
            <h4 class="media-title"><span class="media-icon">🖼️</span> Imágenes del evento</h4>
            <div class="media-list">
              <img v-for="(img, i) in event.images" :key="i" :src="img" class="media-img" />
            </div>
          </div>
          <div v-if="event.videos && event.videos.length" class="media-gallery">
            <h4 class="media-title"><span class="media-icon">🎥</span> Vídeos del evento</h4>
            <div class="media-list">
              <video v-for="(vid, i) in event.videos" :key="i" :src="vid" class="media-video" controls poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" />
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

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const event = ref({
  title: 'Concierto de Primavera',
  description: '¡Ven a disfrutar de la mejor música en vivo con artistas internacionales y un ambiente único! No te pierdas este gran evento musical.',
  start: '2025-05-10T20:00',
  end: '2025-05-11T02:00',
  extra: 'Entradas disponibles en la web oficial. ¡Aforo limitado!',
  images: [
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
  ],
  videos: [
    'https://videos.pexels.com/video-files/1679644/1679644-hd_1920_1080_25fps.mp4'
  ]
})

const router = useRouter()
const route = useRoute()

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

const navegarAEdicion = () => {
  router.push({
    name: 'editar-evento',
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
.main-title {
  font-size: 2rem;
  color: #23408e;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: 1px;
}
.event-desc {
  font-size: 1.15rem;
  color: #444;
  margin-bottom: 0.5rem;
}
.event-dates {
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;
  color: #2563eb;
  margin-bottom: 0.5rem;
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
}
.edit-btn {
  margin-top: 2.5rem;
  padding: 0.7rem 2.2rem;
  background: linear-gradient(90deg, #2563eb 60%, #23408e 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
  letter-spacing: 0.5px;
  transition: background 0.2s, box-shadow 0.2s;
}
.edit-btn:hover {
  background: linear-gradient(90deg, #23408e 60%, #2563eb 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.11);
}
</style>
