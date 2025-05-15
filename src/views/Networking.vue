<template>
    <div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; font-family: sans-serif;">
      <!-- Header -->
      <header style="background-color: #4f46e5; color: white; padding: 1rem; font-size: 1.25rem;">
        Networking de Eventos
      </header>
  
      <!-- Modo selector -->
      <div style="padding: 1rem; display: flex; gap: 1rem; background: #f3f4f6;">
        <button @click="mode = 'creadores'" :style="getButtonStyle(mode === 'creadores')">
          Conectar con Creadores
        </button>
        <button @click="mode = 'patrocinadores'" :style="getButtonStyle(mode === 'patrocinadores')">
          Buscar Patrocinadores
        </button>
      </div>
  
      <!-- Lista de publicaciones -->
      <div style="flex: 1; overflow-y: auto; padding: 1rem; background: #fafafa;">
        <div
          v-for="(post, i) in filteredPosts"
          :key="i"
          style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: white;"
        >
          <h3 style="margin: 0 0 0.5rem 0;">{{ post.title }}</h3>
          <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;">{{ post.description }}</p>
          <small style="color: #555;">Publicado por: {{ post.author }}</small>
        </div>
      </div>
  
      <!-- Crear publicación -->
      <div style="border-top: 1px solid #ccc; padding: 1rem; background: #fff;">
        <h4 style="margin-bottom: 0.5rem;">Crear publicación</h4>
        <input v-model="newPost.title" placeholder="Título" style="width: 100%; margin-bottom: 0.5rem;" />
        <textarea v-model="newPost.description" placeholder="Descripción" style="width: 100%; margin-bottom: 0.5rem;"></textarea>
        <button @click="addPost" style="background: #4f46e5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px;">
          Publicar
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const mode = ref('creadores') // or 'patrocinadores'
  
  const posts = ref([
    {
      type: 'creadores',
      title: 'Busco coorganizador para evento de videojuegos',
      description: 'Tengo local y presupuesto, pero necesito ayuda con la promoción.',
      author: 'Álex Romero'
    },
    {
      type: 'patrocinadores',
      title: 'Buscamos patrocinador para feria de innovación',
      description: 'Ofrecemos visibilidad a cambio de soporte económico.',
      author: 'Andreu Martin'
    }
  ])
  
  const newPost = ref({
    title: '',
    description: ''
  })
  
  const addPost = () => {
    if (!newPost.value.title || !newPost.value.description) return
    posts.value.unshift({
      type: mode.value,
      title: newPost.value.title,
      description: newPost.value.description,
      author: 'Tú'
    })
    newPost.value.title = ''
    newPost.value.description = ''
  }
  
  const filteredPosts = computed(() => {
    return posts.value.filter(p => p.type === mode.value)
  })
  
  const getButtonStyle = (active) => ({
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: active ? '2px solid #4f46e5' : '1px solid #ccc',
    background: active ? '#e0e7ff' : '#fff',
    color: active ? '#1e40af' : '#333',
    cursor: 'pointer'
  })
  </script>
  