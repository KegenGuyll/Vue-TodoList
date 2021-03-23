<template>
  <div class="card" v-bind:class="{ complete }">
    <h3>{{ title }}</h3>
    <button v-on:click="setComplete">Complete</button>
  </div>
</template>

<script>
export default {
  name: 'todoItem',
  props: ['title', 'complete', 'id'],
  methods: {
    setComplete() {
      this.$emit('complete', !this.complete);
    },
  },
};
</script>

<style scoped>
.card {
  padding: 4em;
  color: black;
  border: 2px solid black;
  max-width: 150px;
  background-color: white;
}

.complete {
  background-color: blueviolet;
}
</style>
