<template>
  <v-chip-group show-arrows>
    <v-chip v-on:click="$emit('displayAll')" text-color="white" color="blue">
      {{ `Total Tasks ${totalCount}` }}
    </v-chip>
    <v-chip
      v-on:click="$emit('displayCompleted')"
      text-color="white"
      color="green"
    >
      {{ `Tasks Completed ${completed}` }}
    </v-chip>
    <v-chip
      v-on:click="$emit('displayInProgress')"
      text-color="white"
      color="orange"
    >
      {{ `Tasks In Progress ${inProgress}` }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: ['inProgress', 'completed', 'totalCount'],
};
</script>
