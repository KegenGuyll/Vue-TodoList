<template>
  <v-app>
    <v-main>
      <ErrorAlert />
      <TodoList />
    </v-main>
  </v-app>
</template>

<script>
import TodoList from './components/todoList';
import ErrorAlert from './components/alerts/errorAlert';

export default {
  name: 'App',
  components: {
    TodoList,
    ErrorAlert,
  },
};
</script>
