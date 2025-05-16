<template>
  <div class="container">
    <div class="header">
      <h2>Balance</h2>
      <p>{{ balance }}</p>
    </div>
    <div class="columns">
      <div class="column left">
        <h3>Costes</h3>
        <ul>
          <li v-for="cost in costs" :key="cost.id">{{ cost.name }} ({{ cost.amount }})</li>
        </ul>
        <button @click="addCost">Añadir coste</button>
      </div>
      <div class="column right">
        <h3>Fondos disponibles</h3>
        <ul>
          <li v-for="fund in funds" :key="fund.id">{{ fund.name }} ({{ fund.amount }})</li>
        </ul>
        <div class="button-container">
          <button @click="addFund">Añadir fondo</button>
          <button @click="searchSponsors">Buscar patrocinadores</button>
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
        { id: 1, name: 'Coste 1', amount: 100 },
        { id: 2, name: 'Coste 2', amount: 200 },
        { id: 3, name: 'Coste 3', amount: 300 }
      ],
      funds: [
        { id: 1, name: 'Fondo 1', amount: 1000 },
        { id: 2, name: 'Fondo 2', amount: 2000 },
        { id: 3, name: 'Fondo 3', amount: 3000 }
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
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.header {
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

.columns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
}

.column {
  width: 50%;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ccc;
  height: 300px;
  overflow-y: auto;
}

.column h3 {
  text-align: center;
}

.left {
  margin-right: 10px;
}

.right {
  margin-left: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}

button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}

.button-container button {
  margin: 0 10px 0px 0px;
}
</style>