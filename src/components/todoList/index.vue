<template>
  <div>
    <div class="sticky">
      <v-card elevation="0">
        <LoadingBar :isLoading="isLoading" />
        <v-container>
          <CreateTodo @create="createTask" :totalCount="allTasksCount" />
          <ItemCounter
            :completed="completedCount"
            :inProgress="inProgressCount"
            :totalCount="allTasksCount"
            @displayInProgress="displayInProgress"
            @displayAll="displayAll"
            @displayCompleted="displayCompleted"
          />
        </v-container>
      </v-card>
    </div>
    <v-container>
      <v-row>
        <template v-if="activeSort === 'allTasks'">
          <v-col style="flex-grow:0" v-for="task in alltasks" :key="task.id">
            <TodoItem
              :title="task.title"
              :completed="task.completed"
              @complete="completedTask($event, task)"
              @delete="deleteTask(task.id)"
              @edit="editTask($event, task)"
            />
          </v-col>
        </template>
        <template v-if="activeSort === 'completed'">
          <v-col style="flex-grow:0" v-for="task in completed" :key="task.id">
            <TodoItem
              :title="task.title"
              :completed="task.completed"
              @complete="completedTask($event, task)"
              @delete="deleteTask(task.id)"
              @edit="editTask($event, task)"
            />
          </v-col>
        </template>
        <template v-if="activeSort === 'inProgress'">
          <v-col style="flex-grow:0" v-for="task in inProgress" :key="task.id">
            <TodoItem
              :title="task.title"
              :completed="task.completed"
              @complete="completedTask($event, task)"
              @delete="deleteTask(task.id)"
              @edit="editTask($event, task)"
            />
          </v-col>
        </template>
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
    return {
      activeSort: 'allTasks',
    };
  },
  computed: {
    ...mapGetters({
      alltasks: 'allTasks',
      completed: 'completedTasks',
      inProgress: 'inProgressTasks',
      completedCount: 'completedTasksCount',
      inProgressCount: 'inProgressTasksCount',
      isLoading: 'loadingStatus',
      allTasksCount: 'allTasksCount',
    }),
  },
  created() {
    store.dispatch('fetchTasks');
  },
  methods: {
    createTask(task) {
      console.log(task);
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
    displayInProgress() {
      this.activeSort = 'inProgress';
    },
    displayAll() {
      this.activeSort = 'allTasks';
    },
    displayCompleted() {
      this.activeSort = 'completed';
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
