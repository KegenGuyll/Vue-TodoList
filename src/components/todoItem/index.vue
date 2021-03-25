<template>
  <div>
    <v-card
      :class="{ completeBorder: complete, inProgressBorder: !complete }"
      elevation="2"
      class="mx-auto"
      width="344"
    >
      <v-card-text>
        <p v-if="!editMode" class="display-1 text--primary">{{ title }}</p>
        <v-form v-if="editMode" v-on:submit.prevent="editTask">
          <v-text-field
            autofocus
            color="grey darken-1"
            v-model="editedValue"
            :label="title"
          >
            <template v-slot:append>
              <v-btn icon type="input">
                <v-icon>
                  mdi-content-save
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn icon v-on:click="setComplete">
          <v-icon :color="complete ? 'green' : 'orange'">
            {{ complete ? 'mdi-progress-check' : 'mdi-progress-clock' }}
          </v-icon>
        </v-btn>
        <v-btn v-on:click="toggleEditMode" icon>
          <v-icon color="blue">
            mdi-circle-edit-outline
          </v-icon>
        </v-btn>
        <v-btn icon v-on:click="deleteTask">
          <v-icon color="red">
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'todoItem',
  props: ['title', 'complete', 'id'],
  data() {
    return {
      editedValue: '',
      editMode: false,
    };
  },
  methods: {
    setComplete() {
      this.$emit('complete', !this.complete);
    },
    editTask() {
      this.$emit('edit', this.editedValue);
      this.editMode = false;
    },
    deleteTask() {
      this.$emit('delete');
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style scoped>
.completeBorder {
  border-top: 5px solid #4caf50;
}

.inProgressBorder {
  border-top: 5px solid #fe9f13;
}
</style>
