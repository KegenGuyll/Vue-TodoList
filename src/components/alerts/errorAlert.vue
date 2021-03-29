<template>
  <v-alert v-if="error.message" dense text dismissible type="error">
    {{ error.message }}
  </v-alert>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Error Alert',
  computed: {
    ...mapGetters({
      error: 'getError',
    }),
  },
};
</script>
