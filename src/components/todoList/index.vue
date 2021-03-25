<template>
  <div>
    <div class="sticky">
      <v-card elevation="0">
        <LoadingBar :isLoading="isLoading" />
        <v-container>
          <CreateTodo @create="createTask" />
          <ItemCounter
            :completed="completedCount"
            :inProgress="inProgressCount"
          />
        </v-container>
      </v-card>
    </div>

    <v-container>
      <v-row>
        <v-col style="flex-grow:0" v-for="task in tasks" :key="task.id">
          <TodoItem
            :title="task.title"
            :completed="task.completed"
            @complete="completedTask($event, task)"
            @delete="deleteTask(task.id)"
            @edit="editTask($event, task)"
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
import LoadingBar from '../todoLoading';
import { mapGetters } from 'vuex';
import store from '../../store';
export default {
  name: 'todoList',
  components: {
    TodoItem,
    CreateTodo,
    ItemCounter,
    LoadingBar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      tasks: 'allTasks',
      completedCount: 'completedTasksCount',
      inProgressCount: 'inProgressTasksCount',
      isLoading: 'loadingStatus',
    }),
  },
  created() {
    store.dispatch('fetchTasks');
  },
  methods: {
    createTask(task) {
      store.dispatch('postTask', task);
    },
    completedTask(status, task) {
      task.completed = status;
      store.dispatch('putTask', task);
    },
    deleteTask(id) {
      store.dispatch('deleteTask', id);
    },
    editTask(title, task) {
      task.title = title;
      store.dispatch('putTask', task);
    },
  },
};
</script>

<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
