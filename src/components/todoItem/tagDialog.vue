<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon class="tagIcon">
          mdi-tag-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Create a Tag
      </v-card-title>
      <v-card-text>
        <v-form v-on:submit.prevent="submit()">
          <v-text-field
            color="black"
            autofocus
            v-model="input"
            v-on:change="onChange"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="blue" text :disabled="!input" @click="submit()">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'tagDialog',
  data() {
    return {
      dialog: false,
      input: '',
    };
  },
  methods: {
    onChange(value) {
      this.input = value;
    },
    submit() {
      if (!this.input) return;

      this.dialog = false;
      this.$emit('createTag', this.input);
      this.input = '';
    },
  },
};
</script>

<style scoped>
.tagIcon {
  float: right;
}
</style>
