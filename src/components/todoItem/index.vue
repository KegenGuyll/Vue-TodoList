<template>
  <div>
    <v-card
      :class="{ completeBorder: completed, inProgressBorder: !completed }"
      elevation="2"
      class="mx-auto"
      width="344"
    >
      <v-card-text>
        <p v-if="!editMode" class="display-1 text--primary">{{ title }}</p>
        <v-form v-if="editMode" v-on:submit.prevent="editTask">
          <v-text-field
            autofocus
            :color="completed ? 'green' : 'orange'"
            :label="title"
            :value="title"
            v-on:change="onChange"
          >
            <template v-slot:append>
              <v-btn :disabled="!editedValue" icon type="input">
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
          <v-icon :color="completed ? 'green' : 'orange'">
            {{ completed ? 'mdi-progress-check' : 'mdi-progress-clock' }}
          </v-icon>
        </v-btn>
        <v-btn v-on:click="toggleEditMode" icon>
          <v-icon color="blue">
            mdi-circle-edit-outline
          </v-icon>
        </v-btn>
        <DeleteDialog @deleteTask="deleteTask" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import DeleteDialog from './deleteDialog';
export default {
  components: { DeleteDialog },
  name: 'todoItem',
  props: ['title', 'completed', 'id'],
  data() {
    return {
      editedValue: '',
      editMode: false,
    };
  },
  methods: {
    onChange(value) {
      this.editedValue = value;
    },
    setComplete() {
      this.$emit('complete', !this.completed);
    },
    editTask() {
      if (!this.editedValue) return;

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
