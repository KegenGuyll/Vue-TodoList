<template>
  <div class="set-height">
    <v-progress-linear
      v-if="loadingStatus"
      indeterminate
      color="blue"
    ></v-progress-linear>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LoadingBar',
  computed: {
    ...mapGetters(['loadingStatus']),
  },
};
</script>

<style scoped>
.set-height {
  min-height: 4px;
}
</style>
