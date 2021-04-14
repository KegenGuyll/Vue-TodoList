<template>
  <v-col v-if="search.includes(allTags[id]) || !tagSearchActive.length">
    <v-card
      :class="{ completeBorder: completed, inProgressBorder: !completed }"
      elevation="2"
      class="mx-auto"
      width="344"
    >
      <div class="tagRow">
        <div style="flex-grow:1">
          <v-chip v-if="allTags[id]">{{ allTags[id] }}</v-chip>
        </div>
        <TagDialog @createTag="createTag" />
      </div>
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
  </v-col>
</template>

<script>
import DeleteDialog from './deleteDialog';
import TagDialog from './tagDialog';
import { mapGetters } from 'vuex';
export default {
  components: { DeleteDialog, TagDialog },
  name: 'todoItem',
  props: ['title', 'completed', 'id', 'search', 'tagSearchActive'],
  data() {
    return {
      editedValue: '',
      editMode: false,
    };
  },
  computed: {
    ...mapGetters(['allTags']),
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
    createTag(value) {
      this.$emit('createTag', value);
    },
  },
};
</script>

<style scoped>
.completeBorder {
  border-top: 5px solid #4caf50;
}

.tagIcon {
  float: right;
}

.tagRow {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
}

.inProgressBorder {
  border-top: 5px solid #fe9f13;
}
</style>
