<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <h4>Questão</h4>
        <p>{{ question.name }}</p>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model.trim="v$.option.name.$model"
          :error-messages="nameErrors"
          label="Nome da opção*"
          hint="Insira o nome da sua opção"
          required
          @input="$emit('changeForm', option) && v$.option.name.$touch()"
          @blur="v$.option.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-textarea
          name="description"
          :error-messages="descriptionErrors"
          label="Descrição"
          v-model="v$.option.description.$model"
          hint="Insira uma descrição"
          required
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-select
          v-model="v$.option.type.$model"
          :error-messages="typeErrors"
          :items="['Padrão']"
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
  validations() {
    return {
      option: {
        name: { required },
        description: { required },
        type: { required },
      },
    };
  },
  props: ["question", "optionToEdit", "method"],
  data() {
    return {
      option: {
        name: "",
        description: "",
        type: "Padrão",
        questionId: this.question.id,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.v$.option.name.$dirty) return errors;
      this.v$.option.name.required.$invalid &&
        errors.push("O campo nome da opção é obrigatório");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.v$.option.description.$dirty) return errors;
      this.v$.option.description.required.$invalid &&
        errors.push("O campo descrição é obrigatório");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.v$.option.type.$dirty) return errors;
      this.v$.option.type.required.$invalid &&
        errors.push("O campo Tipo é obrigatório");
      return errors;
    },
  },
  mounted() {
    if (this.method === "edit") {
      this.option = this.optionToEdit;
      this.option.type = "Padrão";
    }
  },
};
</script>
