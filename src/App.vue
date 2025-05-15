<script setup="">
	import { createRouter } from 'vue-router'
	import HelloWorld from './components/HelloWorld.vue'
	import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
	<div class="w-screen h-screen flex flex-col">
	  <nav class="p-4 bg-gray-100 border-b">
		<router-link to="/">Home</router-link> |
		<router-link to="/calendar">Calendar</router-link> |
		<router-link to="/project/1/multimedia">ProjectMultimedia</router-link> |
		<router-link to="/sugerencias">Sugerencias Multimedia</router-link> |
		<router-link to="/networking">Networking</router-link> |
		<router-link to="/planificacion">Planificación de Eventos</router-link> |
	  </nav>
  
	  <div class="flex-1 overflow-hidden">
		<router-view />
	  </div>
	</div>
  </template>

<style scoped="">
	header {
	line-height: 1.5;
	}

	.logo {
	display: block;
	margin: 0 auto 2rem;
	}

	@media (min-width: 1024px) {
	header {
	display: flex;
	place-items: center;
	padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
	margin: 0 2rem 0 0;
	}

	header .wrapper {
	display: flex;
	place-items: flex-start;
	flex-wrap: wrap;
	}
	}
</style>

<style>
	html, body, #app {
	height: 100%;
	margin: 0;
	}
</style>
