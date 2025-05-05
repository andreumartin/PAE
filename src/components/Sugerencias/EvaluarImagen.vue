<template>
  <div class="p-6 bg-white rounded-2xl shadow-md space-y-4">
    <h2 class="text-xl font-semibold">3. Evaluar Imagen Subida</h2>
    <input type="file" @change="handleImageUpload" class="mb-4" />
    <div v-if="uploadedImage" class="w-full h-64 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
      <img :src="uploadedImage" class="object-contain h-full" />
    </div>
    <div v-if="uploadedImage" class="mt-4">
      <p class="font-medium">Análisis:</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>La imagen es visualmente atractiva, pero podría mejorar el contraste.</li>
        <li>Podrías añadir el logo del evento para reforzar la identidad visual.</li>
        <li>Considera usar una versión más clara para dispositivos móviles.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const uploadedImage = ref(null)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    uploadedImage.value = URL.createObjectURL(file)
  }
}
</script>
