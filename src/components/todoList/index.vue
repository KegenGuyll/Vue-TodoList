<template>
  <div>
    <CreateTodo @create="createTask" />
    <TodoItem
      v-for="task in tasks"
      :title="task.title"
      :complete="task.complete"
      :key="task.id"
      @complete="completedTask($event, task.id)"
    />
  </div>
</template>

<script>
import CreateTodo from '../createTodo';
import TodoItem from '../todoItem';
export default {
  name: 'todoList',
  components: {
    TodoItem,
    CreateTodo,
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Testing',
          complete: false,
        },
      ],
    };
  },
  methods: {
    createTask(task) {
      console.log(task);
      this.tasks = [
        {
          id: this.tasks.length + 1,
          title: task.title,
          complete: false,
        },
        ...this.tasks,
      ];
    },
    completedTask(status, id) {
      const index = this.tasks.findIndex((t) => t.id === id);

      this.tasks[index].complete = status;
    },
  },
};
</script>
