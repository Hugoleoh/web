<template>
  <v-dialog v-model="dialog" activator="parent">
    <v-card>
      <v-card-title>
        <slot name="card-title"></slot>
      </v-card-title>
      <v-card-subtitle>
        <slot name="card-subtitle"></slot>
      </v-card-subtitle>
      <v-card-text>
        <slot name="card-text"></slot>
      </v-card-text>
      <v-card-actions>
        <slot name="card-actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FormModal",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
