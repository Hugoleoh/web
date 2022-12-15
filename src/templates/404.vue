<template>
  <app-header :hasSidebar="false" />
  <v-container class="login-card">
    <v-row no-gutters>
      <!-- <v-col cols="12"> -->
      <v-col
        sm="12"
        xl="4"
        lg="6"
        md="8"
        offset-md="2"
        offset-lg="3"
        offset-xl="4"
      >
        <v-card elevation="4" light tag="section">
          <v-card-title class="nav-bar" primary-title>
            <v-layout align-center justify-space-between>
              <h3 class="text-white">404</h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h1 class="mb-2">
              Desculpe! Não encontramos o que você procurava.
            </h1>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "@/components/atoms/AppHeader.vue";

export default {
  name: "404Page",
  components: {
    AppHeader,
  },
};
</script>

<style>
.login-card {
  margin-top: 5rem;
}
</style>
