<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="red">
          mdi-trash-can-outline
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Are you sure you would like to delete this Task?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">
          Disagree
        </v-btn>
        <v-btn color="blue" text @click="$emit('deleteTask')">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'deleteDialog',
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
