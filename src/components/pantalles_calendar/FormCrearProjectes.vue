<template>
  <div class="form-container-wide">
    <h2>Crear nuevo evento</h2>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-col">
        <div class="form-group">
          <label for="title">Título del evento</label>
          <input id="title" v-model="form.title" type="text" required placeholder="Título del evento" />
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" v-model="form.description" rows="3" placeholder="Descripción del evento"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="start">Fecha y hora de inicio</label>
            <input id="start" v-model="form.start" type="datetime-local" required />
          </div>
          <div class="form-group">
            <label for="end">Fecha y hora de fin</label>
            <input id="end" v-model="form.end" type="datetime-local" required />
          </div>
        </div>
        <div class="form-group">
          <label for="extra">Texto adicional</label>
          <textarea id="extra" v-model="form.extra" rows="2" placeholder="Información adicional"></textarea>
        </div>
      </div>
      <div class="form-col">
        <div class="form-group">
          <label>Imágenes</label>
          <div class="drop-area" @click="triggerImageInput" @dragover.prevent @drop.prevent="handleDropImages">
            <span class="drop-icon">📷<br /><span class="plus">+</span></span>
            <span class="drop-text">Arrastra o haz clic para añadir imágenes</span>
            <input ref="imageInput" type="file" accept="image/*" multiple @change="handleImages" style="display:none" />
          </div>
          <div class="preview-list">
            <img v-for="(img, i) in imagePreviews" :key="i" :src="img" class="preview-img" />
          </div>
        </div>
        <div class="form-group">
          <label>Vídeos</label>
          <div class="drop-area" @click="triggerVideoInput" @dragover.prevent @drop.prevent="handleDropVideos">
            <span class="drop-icon">🎬<br /><span class="plus">+</span></span>
            <span class="drop-text">Arrastra o haz clic para añadir vídeos</span>
            <input ref="videoInput" type="file" accept="video/*" multiple @change="handleVideos" style="display:none" />
          </div>
          <div class="preview-list">
            <video v-for="(vid, i) in videoPreviews" :key="i" :src="vid" class="preview-video" controls />
          </div>
        </div>
      </div>
    </form>
    <button type="submit" class="submit-btn" @click="handleSubmit">Crear evento</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  title: '',
  description: '',
  start: '',
  end: '',
  images: [],
  videos: [],
  extra: ''
})

const imagePreviews = ref([])
const videoPreviews = ref([])
const imageInput = ref(null)
const videoInput = ref(null)

function triggerImageInput() {
  imageInput.value && imageInput.value.click()
}
function triggerVideoInput() {
  videoInput.value && videoInput.value.click()
}

function handleImages(e) {
  form.value.images = Array.from(e.target.files)
  imagePreviews.value = form.value.images.map(file => URL.createObjectURL(file))
}
function handleVideos(e) {
  form.value.videos = Array.from(e.target.files)
  videoPreviews.value = form.value.videos.map(file => URL.createObjectURL(file))
}
function handleDropImages(e) {
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
  form.value.images = files
  imagePreviews.value = files.map(file => URL.createObjectURL(file))
}
function handleDropVideos(e) {
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('video/'))
  form.value.videos = files
  videoPreviews.value = files.map(file => URL.createObjectURL(file))
}

function handleSubmit() {
  form.value = {
    title: '',
    description: '',
    start: '',
    end: '',
    images: [],
    videos: [],
    extra: ''
  }
  imagePreviews.value = []
  videoPreviews.value = []
  router.push('/evento-creado')
}
</script>

<style scoped>
.form-container-wide {
  max-width: 1200px;
  width: 99vw;
  height: auto;
  min-width: 0;
  min-height: 0;
  margin: 40px auto;
  background: linear-gradient(135deg, #f7faff 0%, #e3e9f7 100%);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(60, 80, 180, 0.10);
  padding: 1.5rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

h2 {
  text-align: center;
  margin-bottom: 1.2rem;
  color: #23408e;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.form-grid {
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}

.form-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-row {
  display: flex;
  gap: 1.1rem;
  width: 100%;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-weight: 600;
  color: #23408e;
  margin-bottom: 0.3rem;
  font-size: 1.02rem;
}

input[type="text"], input[type="datetime-local"], textarea {
  padding: 0.6rem;
  border: 1.2px solid #bfc8e6;
  border-radius: 7px;
  font-size: 1.05rem;
  margin-top: 0.1rem;
  background: #fafdff;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(60, 80, 180, 0.03);
}
input[type="text"]:focus, input[type="datetime-local"]:focus, textarea:focus {
  border: 1.5px solid #2563eb;
  outline: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
}

.drop-area {
  background: #fafdff;
  border: 2px dashed #bfc8e6;
  border-radius: 10px;
  padding: 1.2rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: border 0.2s, box-shadow 0.2s;
  margin-bottom: 0.5rem;
  position: relative;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.drop-area:hover {
  border: 2px solid #2563eb;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
}
.drop-icon {
  font-size: 2rem;
  color: #2563eb;
  display: block;
  margin-bottom: 0.1rem;
}
.plus {
  font-size: 1.5rem;
  color: #2563eb;
  font-weight: bold;
}
.drop-text {
  color: #23408e;
  font-size: 1.01rem;
  margin-top: 0.1rem;
}

.preview-list {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.preview-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 7px;
  border: 1.2px solid #bfc8e6;
  box-shadow: 0 1px 4px rgba(60, 80, 180, 0.06);
  background: #fff;
}

.preview-video {
  width: 90px;
  height: 60px;
  border-radius: 7px;
  border: 1.2px solid #bfc8e6;
  object-fit: cover;
  box-shadow: 0 1px 4px rgba(60, 80, 180, 0.06);
  background: #fff;
}

.submit-btn {
  width: 35%;
  min-width: 160px;
  align-self: center;
  padding: 0.7rem;
  background: linear-gradient(90deg, #2563eb 60%, #23408e 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1.2rem;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.07);
  letter-spacing: 0.5px;
  transition: background 0.2s, box-shadow 0.2s;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #23408e 60%, #2563eb 100%);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.11);
}

@media (max-width: 1300px) {
  .form-container-wide {
    max-width: 99vw;
    width: 99vw;
    padding: 1rem 0.2rem;
  }
  .form-grid {
    flex-direction: column;
    gap: 1.1rem;
  }
  .submit-btn {
    width: 100%;
  }
}
</style>
