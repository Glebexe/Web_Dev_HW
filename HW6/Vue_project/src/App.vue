<template>
  <div id="app">
    <h1>Список дел</h1>
    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Добавьте новое дело"
    />
    <button @click="addTask">Добавить</button>

    <ul>
      <li
        v-for="(task, index) in tasks"
        :class="{ completed: task.completed }"
      >
        <span @click="toggleCompletion(task)">{{ task.text }}</span>
        <button @click="removeTask(index)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    toggleCompletion(task) {
      task.completed = !task.completed;
    }
  }
};
</script>

<style>
.completed {
  color: green;
  text-decoration: line-through;
}
</style>
