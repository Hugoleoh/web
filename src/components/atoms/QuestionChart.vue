<template>
  <v-container>
    <Doughnut :data="chartData" />
  </v-container>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip);
export default {
  name: "QuestionChart",
  props: ["questionOptions"],
  components: {
    Doughnut,
  },
  computed: {
    chartData() {
      let data = [];
      let labels = [];
      this.questionOptions.forEach((option) => {
        data.push(option.votes_count);
        labels.push(option.name);
      });
      let optionVotes = {
        labels: labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data: data,
          },
        ],
      };

      return optionVotes;
    },
    colors() {
      var colors = [];
      while (colors.length < this.questionOptions.length) {
        do {
          var color = Math.floor(Math.random() * 1000000 + 1);
        } while (colors.indexOf(color) >= 0);
        colors.push("#" + ("000000" + color.toString(16)).slice(-6));
      }
      return colors;
    },
  },
};
</script>
