<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model.trim="v$.question.name.$model"
          :error-messages="nameErrors"
          label="Nome da questão*"
          hint="Insira o nome da sua questão"
          required
          @input="$emit('changeForm', question) && v$.question.name.$touch()"
          @blur="v$.question.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          name="description"
          :error-messages="descriptionErrors"
          label="Descrição"
          v-model="v$.question.description.$model"
          @input="$emit('changeForm', question)"
          hint="Insira uma descrição"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-select
          v-model="v$.question.type.$model"
          :error-messages="typeErrors"
          @input="$emit('changeForm', question)"
          :items="['Questão de múltipla escolha']"
          label="Tipo*"
          required
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: ["questionToEdit", "method"],
  validations() {
    return {
      question: {
        name: { required },
        description: { required },
        type: { required },
      },
    };
  },
  data() {
    return {
      question: {
        name: "",
        description: "",
        type: "Questão de múltipla escolha",
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.v$.question.name.$dirty) return errors;
      this.v$.question.name.required.$invalid &&
        errors.push("O campo nome da questão é obrigatório");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.v$.question.description.$dirty) return errors;
      this.v$.question.description.required.$invalid &&
        errors.push("O campo descrição é obrigatório");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.v$.question.type.$dirty) return errors;
      this.v$.question.type.required.$invalid &&
        errors.push("O campo Tipo é obrigatório");
      return errors;
    },
  },
  mounted() {
    if (this.method === "edit") {
      this.question = this.questionToEdit;
      this.question.type = "Questão de múltipla escolha";
    }
  },
};
</script>
