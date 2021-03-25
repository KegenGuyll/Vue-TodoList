<template>
  <v-chip-group>
    <v-chip class="text-white" color="blue">
      {{ `Total Tasks ${inProgress + completed}` }}
    </v-chip>
    <v-chip class="text-white" color="green">
      {{ `Tasks Completed ${completed}` }}
    </v-chip>
    <v-chip class="text-white" color="orange">
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

<style scoped>
.text-white {
  color: white !important;
}
</style>
