<template>
  <v-container>
    <v-row>
      <v-col cols="3" xl="2">
        <v-list bg-color="#f6f8fa" active-color="#283e79" v-model="activeTab">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :title="item.title"
            :prepend-icon="item.prepend_icon"
            :value="item.value"
            @click="changeSubTab(item.routeName)"
            color="#f6f8fa"
          ></v-list-item>
        </v-list>
      </v-col>
      <v-col cols="9" xl="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PollSettings",
  data() {
    return {
      activeTab: "",
      items: [
        {
          title: "Informações gerais",
          value: "general",
          prepend_icon: "mdi-cog",
          routeName: "generalSettings",
        },
        {
          title: "Datas",
          value: "dates",
          prepend_icon: "mdi-calendar",
          routeName: "datesSettings",
        },
        {
          title: "Duplicar",
          value: "duplicate",
          prepend_icon: "mdi-refresh",
          routeName: "duplicatePoll",
        },
        {
          title: "Excluir",
          value: "delete",
          prepend_icon: "mdi-delete",
          routeName: "deletePoll",
        },
      ],
    };
  },
  methods: {
    changeSubTab(routeName) {
      this.$router.push({
        name: routeName,
      });
    },
  },
};
</script>
