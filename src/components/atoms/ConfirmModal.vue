<template>
  <v-dialog
    v-model="dialog"
    persistent
    activator="parent"
    class="form-modal"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="nav-bar">
        <slot name="card-title"></slot>
      </v-card-title>
      <v-card-subtitle>
        <slot name="card-subtitle"></slot>
      </v-card-subtitle>
      <v-card-text>
        <slot name="card-text"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Não
        </v-btn>
        <v-btn color="red" variant="text" @click="confirm"> Sim </v-btn>
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
  methods: {
    confirm() {
      this.$emit("clickConfirm");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.form-modal {
  max-width: 500px;
}
</style>
