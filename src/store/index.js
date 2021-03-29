import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import statusSorter from '../utils/statusSorter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    isLoading: false,
    error: {},
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks.sort(statusSorter);
    },
    CREATE_TASK(state, task) {
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
  },
  actions: {
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
      console.log(task);
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
    completedTasksCount(state) {
      return state.tasks.filter((task) => task.completed === true).length;
    },
    inProgressTasksCount(state) {
      return state.tasks.filter((task) => task.completed === false).length;
    },
    completedTasks(state) {
      return state.tasks.filter((task) => task.completed === true);
    },
    inProgressTasks(state) {
      return state.tasks.filter((task) => task.completed === false);
    },
    allTasks(state) {
      return state.tasks;
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
