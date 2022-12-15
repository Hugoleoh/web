<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model.trim="v$.voter.name.$model"
          :error-messages="nameErrors"
          label="Nome do votante*"
          name="name"
          hint="Insira o nome da sua questão"
          required
          @input="$emit('changeForm', voter) && v$.voter.name.$touch()"
          @blur="v$.voter.name.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model.trim="v$.voter.email.$model"
          :error-messages="emailErrors"
          label="Email do votante"
          name="email"
          hint="Insira seu endereço de email"
          required
          @input="$emit('changeForm', voter) && v$.voter.email.$touch()"
          @blur="v$.voter.email.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <div class="text-caption">Peso do voto</div>
        <v-slider
          prepend-icon="mdi-weight"
          v-model="voter.vote_weight"
          :min="1"
          :max="10"
          :step="1"
          thumb-label
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      voter: {
        name: { required },
        email: { required, email },
      },
    };
  },
  data() {
    return {
      voter: {
        name: "",
        email: "",
        vote_weight: 1,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.v$.voter.name.$dirty) return errors;
      this.v$.voter.name.required.$invalid &&
        errors.push("O campo nome da questão é obrigatório");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.v$.voter.email.$dirty) return errors;
      this.v$.voter.email.required.$invalid &&
        errors.push("O campo endereço de email é obrigatório");
      this.v$.voter.email.email.$invalid &&
        errors.push("Por favor, insira um email válido");
      return errors;
    },
  },
};
</script>
