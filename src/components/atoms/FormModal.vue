<template>
  <v-dialog v-model="dialog" persistent activator="parent" class="form-modal">
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
        <v-btn color="red" variant="text" @click="dialog = false">
          Fechar
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save">
          Salvar
        </v-btn>
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
    save() {
      this.$emit("clickSave");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.form-modal {
  max-width: 1000px;
}
</style>
