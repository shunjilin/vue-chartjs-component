<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>

<script lang="ts">
import { ref, defineComponent, PropType, onMounted, watch } from "vue-demi";
import { Chart as Chartjs } from "chart.js";
import type { ChartType, ChartData, ChartOptions } from "chart.js";
import cloneDeep from "lodash.clonedeep";

export default defineComponent({
  name: "VueChartjsComponent",
  props: {
    type: {
      type: String as PropType<ChartType>,
      required: true,
    },
    data: {
      type: Object as PropType<ChartData>,
      required: true,
    },
    options: {
      type: Object as PropType<ChartOptions>,
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chartjs | null = null;

    onMounted(() => {
      const { type, data, options } = cloneDeep(props);
      if (canvas.value) {
        chart = new Chartjs(canvas.value, {
          type,
          data,
          options,
        });
      }
    });

    watch(
      () => cloneDeep(props),
      async (newProps) => {
        if (chart) {
          const { data, options } = newProps;
          chart.data = data;
          if (options) {
            chart.options = options;
          }
          chart.update();
        }
      }
    );

    return {
      canvas: canvas,
    };
  },
});
</script>
