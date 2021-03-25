<template>
  <div>
    <v-container>
      <CreateTodo @create="createTask" />
      <ItemCounter :tasks="tasks" />
      <v-row>
        <v-col style="flex-grow:0" v-for="task in tasks" :key="task.id">
          <TodoItem
            :title="task.title"
            :completed="task.completed"
            @complete="completedTask($event, task.id)"
            @delete="deleteTask(task.id)"
            @edit="editTask($event, task.id)"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateTodo from '../createTodo';
import TodoItem from '../todoItem';
import ItemCounter from '../todoItem/ItemCounter';
import axois from 'axios';
export default {
  name: 'todoList',
  components: {
    TodoItem,
    CreateTodo,
    ItemCounter,
  },
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    axois
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        this.tasks = response.data.sort(this.sortAllTasks);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    createTask(task) {
      this.tasks = [
        {
          id: this.tasks.length + 1,
          title: task.title,
          completed: false,
        },
        ...this.tasks,
      ];
    },
    findElement(id) {
      const index = this.tasks.findIndex((t) => t.id === id);

      return index;
    },
    completedTask(status, id) {
      this.tasks[this.findElement(id)].completed = status;

      if (this.tasks[this.findElement(id)].completed === true) {
        this.tasks.push(this.tasks.splice(this.findElement(id), 1)[0]);
      }
    },
    deleteTask(id) {
      this.tasks.splice(this.findElement(id), 1);
    },
    editTask(title, id) {
      this.tasks[this.findElement(id)].title = title;
    },
    sortAllTasks(a) {
      if (a.completed === false) {
        return -1;
      }
      if (a.complete != false) {
        return 1;
      }

      return;
    },
  },
};
</script>
