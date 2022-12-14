<template>
  <v-banner class="dashboard-banner" sticky no-gutters>
    <v-container>
      <v-row>
        <v-col cols="col-10" sm="6" xl="10" lg="9" md="8">
          <span class="results-title-text">
            <v-icon>mdi-chart-donut</v-icon>
            Resultados
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-banner>
  <v-container>
    <v-row>
      <v-col sm="12" xl="8" lg="10" md="12" offset-lg="1" offset-xl="2">
        <v-card
          elevation="4"
          class="result-card"
          light
          tag="section"
          v-for="question in pollQuestions"
          :key="question.id"
        >
          <v-card-title class="nav-bar" primary-title>
            <v-layout align-center justify-space-between>
              <span class="text-white new-poll-title">
                {{ question.name }}
              </span>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="8">
                {{ generatedColors }}
                <v-card>
                  <v-table>
                    <thead>
                      <tr>
                        <th class="text-left">Opção</th>
                        <th class="text-left">Votos (%)</th>
                        <th class="text-left">Absoluto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="option in question.options" :key="option.id">
                        <td>{{ option.name }}</td>
                        <td>
                          <span
                            >{{
                              (
                                (option.votes_count /
                                  questionVoteSum(question)) *
                                100
                              ).toFixed(1)
                            }}%</span
                          >
                        </td>
                        <td>
                          <span>
                            <v-chip label variant="elevated">
                              {{ option.votes_count }}
                            </v-chip>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card>
              </v-col>
              <v-col cols="4">
                <question-chart :questionOptions="question.options" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PollHelperVue from "@/mixins/PollHelper.vue";
import QuestionChart from "@/components/atoms/QuestionChart.vue";

export default {
  name: "ResultsView",
  mixins: [PollHelperVue],
  components: {
    QuestionChart,
  },
  data() {
    return {
      loaded: false,
      //chartData: null,
      generatedColors: null,
    };
  },
  methods: {
    questionVoteSum(question) {
      let sum = 0;
      question.options.forEach((option) => {
        sum += option.votes_count;
      });
      return sum;
    },
  },
  computed: {
    pollQuestions() {
      return this.selectedPoll.questions;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.results-title-text {
  font-size: 1.5rem;
  font-weight: 300;
}
.result-card {
  margin-bottom: 3rem;
  margin-top: 1rem;
}
</style>
