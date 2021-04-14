import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import removeDuplicates from '../utils/removeDup';
import statusSorter from '../utils/statusSorter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    isLoading: false,
    error: {},
    tags: {},
  },
  mutations: {
    SET_TASKS(state, tasks) {
      Vue.set(state, 'tasks', tasks.sort(statusSorter));
    },
    CREATE_TASK(state, task) {
      task.id = state.tasks.length + 1;
      state.tasks = [{ ...task }, ...state.tasks];
    },
    UPDATE_TASK(state, task) {
      const index = state.tasks.findIndex((t) => t.id === task.id);

      state.tasks[index] = task;

      if (state.tasks[index].completed === true) {
        state.tasks.push(state.tasks.splice(index, 1)[0]);
      }
    },
    REMOVE_TASK(state, id) {
      const index = state.tasks.findIndex((t) => t.id === id);

      state.tasks.splice(index, 1);
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERRORS(state, e) {
      state.error = e;
    },
    CREATE_TAG(state, payload) {
      state.tags = { ...state.tags, [payload.id]: payload.tag };
    },
  },
  actions: {
    createTag(context, payload) {
      context.commit('CREATE_TAG', payload);
    },
    fetchTasks(context) {
      context.commit('SET_LOADING', true);
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((response) => {
          context.commit('SET_LOADING', false);
          context.commit('SET_TASKS', response.data);
        })
        .catch((e) => {
          context.commit('SET_LOADING', false);
          context.commit('SET_ERRORS', e);
        });
    },
    postTask(context, task) {
      context.commit('SET_LOADING', true);
      axios
        .post('https://jsonplaceholder.typicode.com/todos', task)
        .then((response) => {
          context.commit('SET_LOADING', false);
          context.commit('CREATE_TASK', response.data);
        })
        .catch((e) => {
          context.commit('SET_LOADING', false);
          context.commit('SET_ERRORS', e);
        });
    },
    putTask(context, task) {
      context.commit('SET_LOADING', true);
      axios
        .put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task)
        .then((response) => {
          context.commit('SET_LOADING', false);
          context.commit('UPDATE_TASK', response.data);
        })
        .catch((e) => {
          context.commit('SET_LOADING', false);
          context.commit('SET_ERRORS', e);
        });
    },
    deleteTask(context, id) {
      context.commit('SET_LOADING', true);
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
          context.commit('SET_LOADING', false);
          context.commit('REMOVE_TASK', id);
        })
        .catch((e) => {
          context.commit('SET_LOADING', false);
          context.commit('SET_ERRORS', e);
        });
    },
  },
  getters: {
    allTasksCount(state) {
      return state.tasks.length;
    },
    completedTasksCount(state) {
      return state.tasks.filter((task) => task.completed === true).length;
    },
    inProgressTasksCount(state) {
      return state.tasks.filter((task) => task.completed === false).length;
    },
    allTags(state) {
      return state.tags;
    },
    sortableTags(state) {
      const tags = Object.entries(state.tags).map((value) => {
        return {
          name: value[1],
        };
      });

      return removeDuplicates(tags);
    },
    sortLists(state) {
      const list = {
        allTasks: state.tasks,
        completed: state.tasks.filter((task) => task.completed === true),
        inProgress: state.tasks.filter((task) => task.completed === false),
      };

      return list;
    },
    loadingStatus(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    },
  },
  modules: {},
});
