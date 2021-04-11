<template>
  <button @click="onClick">Randomize</button>
  <div style="width: 100vw; height: 100vh">
    <chart-component type="bar" :data="data" :options="options" />
  </div>
</template>

<script lang="ts">
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { defineComponent, Ref, ref } from "vue";
import ChartComponent from "./index.vue";

// register all controllers, elements, scales and plugins
// To register only necessary components, see: https://www.chartjs.org/docs/master/getting-started/integration.html#bundlers-webpack-rollup-etc
Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    ChartComponent,
  },
  setup() {
    const backgroundColor = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ];

    const borderColor = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    const data: Ref<ChartData> = ref({
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: Array.from({ length: 6 }, () =>
            Math.floor(Math.random() * 100)
          ),
          backgroundColor,
          borderColor,
          borderWidth: Math.random(),
        },
      ],
    });

    const options: Ref<ChartOptions> = ref({
      plugins: {
        title: {
          display: true,
          text: "Example Chart",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });

    const onClick = () => {
      data.value.datasets = [
        {
          label: "# of Votes",
          data: Array.from({ length: 6 }, () =>
            Math.floor(Math.random() * 100)
          ),
          backgroundColor: backgroundColor.sort(() => Math.random()),
          borderColor: borderColor.sort(() => Math.random()),
          borderWidth: Math.random(),
        },
      ];
    };

    return {
      data,
      options,
      onClick,
    };
  },
});
</script>
