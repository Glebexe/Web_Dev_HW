<!--<template>-->
<!--  <div id="app">-->
<!--    <h1>Тест на скорость реакции</h1>-->
<!--    <AttentionTest @test-complete="onTestComplete" @test-start="onTestStart"/>-->
<!--    <Timer ref="timer" />-->
<!--  </div>-->
<!--</template>-->

<template>
  <div id="app">
    <h1>Тест на скорость реакции</h1>
    <Timer ref="timer" />
    <SumDigitsTest @test-complete="onTestComplete" @test-start="onTestStart"/>
  </div>
</template>

<script>
import Timer from './components/Timer.vue';
import AttentionTest from './components/AttentionTest.vue';
import ReactionTest from './components/ReactionTest.vue';
import MemoryTest from './components/MemoryTest.vue';
import TextSelectionTest from './components/TextSelectionTest.vue';
import SumDigitsTest from './components/SumDigitsTest.vue';

export default {
  components: {
    Timer,
    AttentionTest,
    ReactionTest,
    MemoryTest,
    TextSelectionTest,
    SumDigitsTest,
  },
   methods: {
    onTestComplete(score) {
      this.$refs.timer.stopTimer();
      // const totalTime = this.$refs.timer.timeElapsed;
      // alert(`Вы завершили тест за ${Math.floor(totalTime / 1000)} секунд. Ваш результат: ${score} из 10.`);
    },
    onTestStart() {
      this.$refs.timer.resetTimer();
      this.$refs.timer.startTimer();
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100vh;
}
#app h1{
  margin-bottom: 150px;
}
</style>