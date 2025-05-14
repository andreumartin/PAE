<template>
  <div class="page-container">
    <!-- Header -->
    <h1 class="main-title">Analíticas Generales</h1>

    <section class="my-analytics">
      <h2 class="your-events">Tus eventos</h2>
      <div class="my-analytics-data">
        <div class="Number-column">
          <h3 class="Number-title">Eventos organizados</h3>
          <a>{{ userStats.totalEvents }}</a>
        </div>
        <div class="Number-column">
          <h3 class="Number-title">Asistentes totales</h3>
          <a>{{ userStats.totalAttendees }}</a>
        </div>
        <div class="Number-column">
          <h3 class="Number-title">Ingresos por entradas</h3>
          <a>{{ formatCurrency(userStats.totalRevenue) }}</a>
        </div>
        <AnalyticsStat title="Eventos organizados" :value="userStats.totalEvents" />
        <AnalyticsStat title="Asistentes totales" :value="userStats.totalAttendees" />
        <AnalyticsStat title="Ingresos por entradas" :value="formatCurrency(userStats.totalRevenue)" />
      </div>
    </section>

    <!-- Global Trends -->
    <section class="my-analytics">
      <h2 class="your-events">Tendencias globales</h2>
      <div class="general-analytics">
        <h3 class="Number-title">Día más popular para eventos</h3>
        <a>{{ globalTrends.topDay }} : {{ globalTrends.topDayPercentage }} %</a>
        <div class="chart-container">
          <BarChart :chart-data="dayDistributionData" />
        </div>
      </div>
      <div class="general-analytics">
        <h3 class="Number-title">Mes más popular para eventos</h3>
        <a>{{ monthTrends.topMonth }} : {{ monthTrends.topMonthPercentage }} %</a>
        <div class="chart-container">
          <BarChart :chart-data="monthDistributionData" />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
  a {
    text-decoration: none;
    color: #3b82f6; /* Tailwind blue-500 */
  }
  .chart-container {
    width: 50%;
    height: 100%;
    margin-top: 20px;
  }
  .general-analytics {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  .your-events {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .page-container {
    padding: 20px;
    background-color: #f9fafb; /* Tailwind gray-50 */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .Number-column {
    flex: 1;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    background-color: #f3f4f6; /* Tailwind gray-200 */
    display: flex;
    flex-direction: column;
  }
  .Number-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .my-analytics-data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }
  .my-analytics {
    width: 100%;
    margin-bottom: 20px;
  }
  .main-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
</style>

<script setup>
import { ref } from 'vue'
import BarChart from './BarChart.vue'

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const userStats = ref({
  totalEvents: 14,
  totalAttendees: 1250,
  totalRevenue: 3275.50 // en euros, por ejemplo
})

const globalTrends = ref({
  topDay: 'Sábado',
  topDayPercentage: 73,
  distribution: {
    Lunes: 5,
    Martes: 8,
    Miércoles: 9,
    Jueves: 12,
    Viernes: 18,
    Sábado: 73,
    Domingo: 30
  }
})

const monthTrends = ref({
  topMonth: 'Abril',
  topMonthPercentage: 16,
  distribution: {
    Enero: 4,
    Febrero: 5,
    Marzo: 15,
    Abril: 16, 
    Mayo: 14,
    Junio: 8, 
    Julio: 7, 
    Agosto: 7, 
    Septiembre: 6,
    Octubre: 6,
    Noviembre: 6,  
    Diciembre: 6  

  }
})

const monthDistributionData = {
  labels: Object.keys(monthTrends.value.distribution),
  datasets: [
    {
      label: '% de eventos',
      data: Object.values(monthTrends.value.distribution),
      backgroundColor: 'rgba(59, 130, 246, 0.7)'
    }
  ]
}

const dayDistributionData = {
  labels: Object.keys(globalTrends.value.distribution),
  datasets: [
    {
      label: '% de eventos',
      data: Object.values(globalTrends.value.distribution),
      backgroundColor: 'rgba(59, 130, 246, 0.7)'
    }
  ]
}
</script>
