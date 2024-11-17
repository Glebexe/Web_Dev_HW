<template>
  <div class="test-container">
    <h2>Задание {{ currentTask }}</h2>
    <div class="words">
      <span
        v-for="(word, index) in taskWords"
        :key="index"
        :style="{ color: word.color }"
        class="word"
      >
        {{ word.text }}
      </span>
    </div>
    <div class="options">
      <button
        v-for="(option, index) in options"
        :key="index"
        @click="checkAnswer(option)"
      >
        {{ option.join(', ') }}
      </button>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTask: 1,
      totalTasks: 10,
      words: ['Красный', 'Синий','Зеленый','Желтый','Белый'],
      colors: ['red', 'blue', 'green', 'yellow', 'white'],
      taskWords: [],
      correctAnswer: [],
      options: [],
      score: 0,
    };
  },
  computed: {
    progress() {
      return (this.currentTask / this.totalTasks) * 100;
    },
  },
  methods: {
    generateTask() {
      const wordsCount = this.currentTask;
      const words = [];
      const answer = [];
      for (let i = 0; i < wordsCount; i++) {
        const randomColorText = this.words[Math.floor(Math.random() * this.words.length)];
        const randomColorIndex = Math.floor(Math.random() * this.colors.length);
        const randomColor = this.colors[randomColorIndex];
        words.push({ text: randomColorText, color: randomColor });
        answer.push(this.words[randomColorIndex]);
      }
      this.taskWords = words;
      this.correctAnswer = answer;

      const options = [];
      const correctOption = [...answer];
      options.push(correctOption);

      while (options.length < 3) {
        const randomOption = []
        for(let i = 0; i < wordsCount; i++){
          randomOption.push(this.words[Math.floor(Math.random() * this.words.length)])
        }

        if (!options.some((opt) => JSON.stringify(opt) === JSON.stringify(randomOption))) {
          options.push(randomOption);
        }
      }

      this.options = options.sort(() => Math.random() - 0.5);
    },
    checkAnswer(selectedOption) {
      if (JSON.stringify(selectedOption) === JSON.stringify(this.correctAnswer)) {
        this.score++;
      }
      if (this.currentTask < this.totalTasks) {
        this.currentTask++;
        this.generateTask();
      } else {
        this.$emit('test-complete', this.score);
      }
    },
  },
  mounted() {
    this.generateTask();
  },
};
</script>

<style>
.test-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.words {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word {
  font-size: 24px;
  margin: 0 10px;
}
.options button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
.progress-bar {
  width: 100%;
  height: 10px;
  background: #ddd;
  margin-top: 20px;
  position: relative;
}
.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s;
}
</style>