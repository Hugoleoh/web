<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          :model-value="questionName"
          label="Nome da questão*"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          :model-value="option.name"
          label="Nome da opção*"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          label="Descrição"
          :model-value="option.description"
          readonly
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["questionName", "option"],

  data() {
    return {};
  },

  /*  mounted() {
    this.question = this.questionToEdit;
  }, */
};
</script>
