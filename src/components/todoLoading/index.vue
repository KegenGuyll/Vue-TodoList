<template>
  <div class="set-height">
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="blue"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: 'LoadingBar',
  props: ['isLoading'],
};
</script>

<style scoped>
.set-height {
  min-height: 4px;
}
</style>
