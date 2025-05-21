<template>
  <div style="flex-direction: column; font-family: sans-serif;">
    <!-- Header -->
    <header style="color: #23408e; padding: 1rem; font-size: 1.25rem; font-weight: bold;">
      Multimedia Assistant
    </header>

    <!-- Chat area -->
    <div ref="chatContainer" style="flex: 1; overflow-y: auto; padding: 1rem;">
      <div
        v-for="(msg, i) in messages"
        :key="i"
        :style="{
          display: 'flex',
          justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
          marginBottom: '1rem'
        }"
      >
        <div
        :style="{
          maxWidth: '75%',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          backgroundColor: msg.from === 'user' ? '#e0e7ff' : 'white',
          boxShadow: msg.from === 'user' ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: msg.from === 'user' ? 'right' : 'left',
          whiteSpace: 'pre-line',
          fontSize: '0.875rem',
          color: 'black'
        }"

        >
          <ul v-if="Array.isArray(msg.text)">
            <li v-for="(line, idx) in msg.text" :key="idx">{{ line }}</li>
          </ul>
          <p v-else>{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <!-- Input -->
    <footer style="padding: 1rem; display: flex; gap: 0.5rem; align-items: center;">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Type your message..."
        style="flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem;"
      />
      <input type="file" @change="handleUpload" style="display: none;" ref="fileInput" />
      <button class="button" @click="$refs.fileInput.click()" style="padding: 0.5rem; border-radius: 0.5rem;">📎</button>
      <button class="button" @click="sendMessage" style="background-color: #4f46e5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem;">Send</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const input = ref('')
const messages = ref([])
const chatContainer = ref(null)

watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

onMounted(() => {
  messages.value.push({
    from: 'bot',
    text: [
      'Hola, soy tu asistente de contenido. Conozco los detalles de tu evento y puedo ayudarte a:',
      'Crear imágenes',
      'Darte consejos de diseño',
      'Evaluar una imagen o vídeo que subas',
      '¿Qué necesitas?'
    ]
  })
})

function sendMessage() {
  if (!input.value.trim()) return
  const userText = input.value
  messages.value.push({ from: 'user', text: userText })

  const lower = userText.toLowerCase()
  let reply = 'Lo siento, ¿podrías reformular tu pregunta?'

  if (lower.includes('imagen') && lower.includes('crear')) {
    reply = 'Aquí tienes una imagen promocional generada basada en tu evento (simulada):\n\n🖼️ [Imagen generada]'
  } else if (lower.includes('consejo') || lower.includes('mejorar diseño')) {
    reply = 'Algunos consejos:\n• Usa imágenes claras y centradas\n• Colores vivos pero legibles\n• Añade el logo del evento si puedes'
  } else if (lower.includes('evaluar') || lower.includes('subido')) {
    reply = 'Estoy evaluando la imagen... Parece atractiva, pero podrías mejorar el contraste y usar una fuente más legible.'
  }

  messages.value.push({ from: 'bot', text: reply })
  input.value = ''
}

function handleUpload(event) {
  const file = event.target.files[0]
  if (file) {
    messages.value.push({ from: 'user', text: `[📎 Imagen subida: ${file.name}]` })
    messages.value.push({
      from: 'bot',
      text: `He analizado "${file.name}" y te doy este feedback:\n• Buena resolución\n• Intenta centrar más el foco visual\n• Puedes mejorar el contraste`
    })
  }
}
</script>
