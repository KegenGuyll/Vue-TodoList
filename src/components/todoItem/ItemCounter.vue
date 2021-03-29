<template>
  <v-chip-group show-arrows>
    <v-chip text-color="white" color="blue">
      {{ `Total Tasks ${inProgress + completed}` }}
    </v-chip>
    <v-chip text-color="white" color="green">
      {{ `Tasks Completed ${completed}` }}
    </v-chip>
    <v-chip text-color="white" color="orange">
      {{ `Tasks In Progress ${inProgress}` }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: ['inProgress', 'completed'],
};
</script>
