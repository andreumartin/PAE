<template>
  <div class="container">
    <div class="header">
      <h2>Balance</h2>
      <strong class="balance">{{ balance }}€</strong>
    </div>
    <div class="columns">
      <div class="column card">
        <h3>Costes</h3>
        <ul>
          <li v-for="cost in costs" :key="cost.id">{{ cost.name }} ({{ cost.amount }}€)</li>
        </ul>
        <button class="button" @click="addCost">➕ Añadir coste</button>
      </div>
      <div class="column card">
        <h3>Fondos disponibles</h3>
        <ul>
          <li v-for="fund in funds" :key="fund.id">{{ fund.name }} ({{ fund.amount }}€)</li>
        </ul>
        <div class="button-container">
          <button class="button" @click="addFund">➕ Añadir fondo</button>
          <button class="button alt" @click="searchSponsors">🔍 Buscar patrocinadores</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      costs: [
        { id: 1, name: 'Equipo de sonido', amount: 1000 },
        { id: 2, name: 'Equipo de luces', amount: 2000 },
        { id: 3, name: 'Comida y bebida', amount: 300 }
      ],
      funds: [
        { id: 1, name: 'Presupuesto inicial interno', amount: 1000 },
        { id: 2, name: 'Estrella Damm proveedor', amount: 2000 },
        { id: 3, name: 'Dissidence proveedor', amount: 3000 }
      ]
    }
  },
  computed: {
    balance() {
      const totalCosts = this.costs.reduce((acc, cost) => acc + cost.amount, 0)
      const totalFunds = this.funds.reduce((acc, fund) => acc + fund.amount, 0)
      return totalFunds - totalCosts
    }
  },
  methods: {
    addCost() {
      // código para agregar un nuevo coste
    },
    addFund() {
      // código para agregar un nuevo fondo
    },
    searchSponsors() {
      // código para buscar patrocinadores
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h2 {
  margin: 0;
  font-size: 28px;
}

.balance {
  font-size: 24px;
  color: #3b82f6;
  margin-top: 8px;
  display: inline-block;
}

.columns {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  min-width: 300px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.card h3 {
  text-align: center;
  margin-bottom: 12px;
  font-size: 20px;
  color: #111827;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}

li {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
}

li:last-child {
  border-bottom: none;
}

.button {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #2563eb;
}

.button.alt {
  background-color: #10b981;
  margin-top: 8px;
}

.button.alt:hover {
  background-color: #059669;
}

.button-container {
  display: flex;
  flex-direction: column;
}
</style>
