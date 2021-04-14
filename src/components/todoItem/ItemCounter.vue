<template>
  <v-chip-group show-arrows>
    <v-chip v-on:click="$emit('displayAll')" text-color="white" color="blue">
      {{ `Total Tasks ${allTasksCount}` }}
    </v-chip>
    <v-chip
      v-on:click="$emit('displayCompleted')"
      text-color="white"
      color="green"
    >
      {{ `Tasks Completed ${completedTasksCount}` }}
    </v-chip>
    <v-chip
      v-on:click="$emit('displayInProgress')"
      text-color="white"
      color="orange"
    >
      {{ `Tasks In Progress ${inProgressTasksCount}` }}
    </v-chip>
  </v-chip-group>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ItemCounter',
  computed: {
    ...mapGetters([
      'completedTasksCount',
      'inProgressTasksCount',
      'allTasksCount',
    ]),
  },
};
</script>
