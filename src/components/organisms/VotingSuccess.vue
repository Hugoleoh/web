<template>
  <v-container>
    <v-row align-content="center">
      <v-col
        sm="12"
        xl="6"
        lg="8"
        md="8"
        offset-md="2"
        offset-lg="2"
        offset-xl="3"
      >
        <v-card class="success-card">
          <v-card-text>
            <p class="text-center mb-5 mt-5">
              Seu voto foi computado! Obrigado por votar.
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <router-link to="/">
                  <v-btn
                    color="success"
                    variant="flat"
                    width="-webkit-fill-available"
                    >Voltar para o ínicio</v-btn
                  >
                </router-link>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "VotingSuccess",
  data() {
    return {};
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  font-size: 1rem;
}
.success-card {
  margin-top: 5rem;
}
</style>
