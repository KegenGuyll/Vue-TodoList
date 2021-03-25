<template>
  <v-app>
    <v-main>
      <TodoList />
    </v-main>
  </v-app>
</template>

<script>
import TodoList from './components/todoList';

export default {
  name: 'App',
  components: {
    TodoList,
  },
};
</script>
