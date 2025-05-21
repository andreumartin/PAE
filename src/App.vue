<script setup="">
	import { ref } from 'vue'

	const sidebarOpen = ref(false)

	function toggleSidebar() {
	sidebarOpen.value = !sidebarOpen.value
	}
</script>

<template>
	<div class="dashboard-container">
		<!-- Sidebar -->
		<div :class="['sidebar', { 'sidebar-open': sidebarOpen }]">
			<div class="sidebar-header">
				<h2>Menú</h2>
				<button class="close-btn" @click="toggleSidebar">×</button>
			</div>
			<nav class="sidebar-nav">
				<ul>
					<li>
						<router-link to="/">Inicio</router-link>
					</li>
					<li>
						<router-link to="/networking">Networking</router-link>
					</li>
					<li>
						<router-link to="/planificacion">Planificación</router-link>
					</li>
					<li>
						<router-link to="/analytics">Análisis</router-link>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Main content -->
		<div class="main-layout">
			<!-- Header -->
			<header class="top-header">
				<div class="top-element">
					<button class="menu-btn" @click="toggleSidebar">
						<span class="menu-icon"></span>
					</button>
				</div>
				<div class="logo-container">
					<span class="app-logo">UX TECH SOLUTIONS</span>
				</div>
				<div style="text-align: right;">
					<button class="account-btn">CUENTA</button>
				</div>
			</header>

			<!-- Routed views -->
			<main class="dashboard-content">
				<router-view />
			</main>
		</div>
	</div>
</template>
