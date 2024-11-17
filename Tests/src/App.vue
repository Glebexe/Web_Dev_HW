<!--<template>-->
<!--  <div id="app">-->
<!--    <h1>Тест на внимательность</h1>-->
<!--    <AttentionTest @test-complete="onTestComplete" />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import AttentionTest from './components/AttentionTest.vue';-->

<!--export default {-->
<!--  components: {-->
<!--    AttentionTest,-->
<!--  },-->
<!--  methods: {-->
<!--    onTestComplete(score) {-->
<!--      alert(`Вы завершили тест! Ваш результат: ${score} из 10.`);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<template>
  <div id="app">
    <h1>Тест на скорость реакции</h1>
    <ReactionTest />
  </div>
</template>

<script>
import ReactionTest from './components/ReactionTest.vue';

export default {
  components: {
    ReactionTest,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100vh;
}
#app h1{
  margin-bottom: 150px;
}
</style>