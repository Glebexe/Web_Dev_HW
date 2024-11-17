<template>
  <div class="app">
    <h1>Конвертер валют</h1>
    <div>
      <label>Сумма: </label>
      <input type="number" v-model.number="amount" />
    </div>
    <div>
      <label>Валюта: </label>
      <select v-model="selectedCurrency">
        <option v-for="(rate, currency) in rates" :value="currency">
          {{ currency }}
        </option>
      </select>
    </div>
    <div>
      <button @click="convertCurrency">Конвертировать</button>
    </div>
    <p v-if="convertedAmount !== null">Стоимость в {{ selectedCurrency }}: {{ convertedAmount.toFixed(2) }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: 1,
      selectedCurrency: 'USD',
      rates: {},
      convertedAmount: null,
    };
  },
  mounted() {
    this.fetchRates();
  },
  methods: {
    fetchRates() {
      axios.get('https://api.exchangerate-api.com/v4/latest/EUR')
        .then(response => {
          this.rates = response.data.rates;
          this.selectedCurrency = 'USD';
        })
        .catch(error => {
          console.error('Ошибка при получении курсов валют:', error);
        });
    },
    convertCurrency() {
      if (!this.selectedCurrency || !this.amount) {
        this.convertedAmount = null;
        return;
      }
      const rate = this.rates[this.selectedCurrency];
      this.convertedAmount = this.amount * rate;
    }
  }
};
</script>

<style scoped>
.app {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: black;
}

input, select {
  margin: 10px 0;
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

p {
  font-size: 18px;
  margin-top: 20px;
}
</style>