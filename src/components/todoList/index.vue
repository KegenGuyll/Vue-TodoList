<template>
  <div>
    <v-container>
      <CreateTodo @create="createTask" />
      <ItemCounter :tasks="tasks" />
      <v-row>
        <v-col style="flex-grow:0" v-for="task in tasks" :key="task.id">
          <TodoItem
            :title="task.title"
            :complete="task.complete"
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
  methods: {
    createTask(task) {
      this.tasks = [
        {
          id: this.tasks.length + 1,
          title: task.title,
          complete: false,
        },
        ...this.tasks,
      ];
    },
    findElement(id) {
      const index = this.tasks.findIndex((t) => t.id === id);

      return index;
    },
    completedTask(status, id) {
      this.tasks[this.findElement(id)].complete = status;

      if (this.tasks[this.findElement(id)].complete === true) {
        this.tasks.push(this.tasks.splice(this.findElement(id), 1)[0]);
      }
    },
    deleteTask(id) {
      this.tasks.splice(this.findElement(id), 1);
    },
    editTask(title, id) {
      this.tasks[this.findElement(id)].title = title;
    },
  },
};
</script>
