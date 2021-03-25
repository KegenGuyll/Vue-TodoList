<template>
  <div>
    <v-chip-group>
      <v-chip class="text-white" label color="blue">
        {{ `Total Tasks ${inProgress + completed}` }}
      </v-chip>
      <v-chip class="text-white" label color="green">
        {{ `Tasks Completed ${completed}` }}
      </v-chip>
      <v-chip class="text-white" label color="orange">
        {{ `Tasks In Progress ${inProgress}` }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script>
export default {
  name: 'ItemCounter',
  props: ['tasks'],
  data() {
    return {
      completed: 0,
      inProgress: 0,
    };
  },
  watch: {
    tasks: {
      handler: function(newVal) {
        let tempCompleted = 0;
        let tempInProgress = 0;
        newVal.forEach((task) => {
          if (task.completed) {
            tempCompleted = tempCompleted + 1;
          } else {
            tempInProgress = tempInProgress + 1;
          }

          this.completed = tempCompleted;
          this.inProgress = tempInProgress;
        });
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.text-white {
  color: white !important;
}
</style>
