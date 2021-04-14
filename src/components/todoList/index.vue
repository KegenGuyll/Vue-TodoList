<template>
  <div>
    <div class="sticky">
      <v-card elevation="0">
        <LoadingBar />
        <v-container>
          <CreateTodo @create="createTask" />
          <ItemCounter
            @displayInProgress="displayInProgress"
            @displayAll="displayAll"
            @displayCompleted="displayCompleted"
          />
          <v-chip-group v-model="tagSearchActive" multiple>
            <v-chip
              v-for="tag in sortTags"
              :key="tag.id"
              v-on:click="searchTag(tag.name)"
              filter
              outlined
            >
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </v-container>
      </v-card>
    </div>
    <v-container>
      <v-row>
        <template>
          <TodoItem
            v-for="task in tasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :completed="task.completed"
            :search="search"
            :tagSearchActive="tagSearchActive"
            @complete="completedTask($event, task)"
            @delete="deleteTask(task.id)"
            @edit="editTask($event, task)"
            @createTag="createTag($event, task.id)"
          />
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
      activeSortTasks: 'allTasks',
      tagSearchActive: [],
      search: [],
    };
  },
  computed: {
    tasks: function() {
      return this.$store.getters.sortLists[this.activeSortTasks];
    },
    sortTags: function() {
      return this.$store.getters.sortableTags;
    },
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
    searchTag(name) {
      if (this.search.includes(name)) {
        const index = this.search.indexOf((s) => s === name);
        this.search.splice(index, 1);
      } else {
        this.search.push(name);
      }
    },
    createTag(tag, id) {
      store.dispatch('createTag', { id, tag });
    },
    editTask(title, task) {
      task.title = title;
      store.dispatch('putTask', task);
    },
    displayInProgress() {
      this.activeSortTasks = 'inProgress';
    },
    displayAll() {
      this.activeSortTasks = 'allTasks';
    },
    displayCompleted() {
      this.activeSortTasks = 'completed';
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
