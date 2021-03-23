<template>
  <form v-on:submit.prevent="submit">
    <input placeholder="Create Task" :value="this.value" @change="onChange" />
    <button type="input">Add Task</button>
  </form>
</template>

<script>
export default {
  name: 'createTodo',
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onChange(e) {
      this.value = e.currentTarget.value;
    },
    submit() {
      this.$emit('create', { title: this.value });
      console.log(this.value);
    },
  },
};
</script>
