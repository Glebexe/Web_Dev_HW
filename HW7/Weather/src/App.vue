<script>
import axios from 'axios';

export default {
  data() {
    return {
      regions: {
        'Краснодарский край': ['Краснодар', 'Сочи','Новороссийск'],
        'Московская область': ['Москва'],
        'Новосибирская область': ['Новосибирск', 'Бердск']
      },
      selectedRegion: "",
      city: "",
      error: "",
      info: null,
      avgTemperature: null
    }
  },
  computed: {
    cityName() {
      return "«" + this.city + "»";
    },
    showTemp() {
      return "Температура: " + this.info.main.temp;
    }
  },
  methods: {
    getWeather() {
      if (this.city.trim().length < 2) {
        this.error = "Нужно название более одного символа :)";
        return false;
      }
      this.error = "";
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
    .
      then(res => (this.info = res.data));
    },
    getRegionWeather() {
      if (!this.selectedRegion || !this.regions[this.selectedRegion].length) {
        this.error = "Выберите регион с городами.";
        return false;
      }

      this.avgTemperature = null;
      const cities = this.regions[this.selectedRegion];
      const requests = cities.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
    );

      Promise.all(requests).then(responses => {
        const temps = responses.map(res => res.data.main.temp);
        const total = temps.reduce((acc, cur) => acc + cur, 0);
        this.avgTemperature = (total / temps.length).toFixed(2);
      }).catch(err => {
        this.error = "Ошибка получения данных погоды.";
        console.error(err);
      });
    }
  }
};
</script>

<template>
  <div className="wrapper">
    <h1>Погодное приложение</h1>
    <div>
      <label>Выберите регион: </label>
      <select v-model="selectedRegion">
        <option v-for="(cities, region) in regions" :key="region" :value="region">{{ region }}</option>
      </select>
      <button @click="getRegionWeather">Получить погоду региона</button>
    </div>

    <p>Узнать погоду в {{ city == "" ? "вашем городе" : cityName }}</p>
    <input type="text" v-model="city" placeholder="Введите город">
    <button v-if="city != ''" @click="getWeather()">Получить погоду</button>
    <button disabled v-else>Введите название города</button>

    <p className="error">{{ error }}</p>
  <div v-if="avgTemperature != null">
    <p>Средняя температура в регионе: {{ avgTemperature }}°C</p>
        </div>
    </div>
</template>

<style scoped>
/* Стили остаются без изменений, добавлены только функциональные компоненты */
.error {
    color: #d03939;
}
.wrapper {
    width: 900px;
    height: 500px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}
.wrapper h1 {
    margin-top: 50px;
}
.wrapper p {
    margin-top: 20px;
}
.wrapper input {
    margin-top: 30px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #fcfcfc;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
}
.wrapper input:focus {
    border-bottom-color: #6e2d7d;
}
.wrapper button:disabled {
    background: #746027;
    cursor: not-allowed;
}
.wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 500ms ease;
}
.wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
}
</style>