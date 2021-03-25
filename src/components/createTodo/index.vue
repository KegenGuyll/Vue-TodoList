<template>
  <v-form v-on:submit.prevent="submit">
    <v-text-field
      solo
      required
      v-model="value"
      placeholder="Create Task"
      :value="this.value"
    >
      <template v-slot:append>
        <v-btn :disabled="!value" icon type="input">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </v-form>
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
    submit() {
      if (this.value === '') return;

      this.$emit('create', { title: this.value });

      this.value = '';
    },
  },
};
</script>
