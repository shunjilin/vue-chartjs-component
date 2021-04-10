import { ref, defineComponent, h, PropType, onMounted, watch } from "vue-demi";
import { Chart as Chartjs } from "chart.js";
import type { ChartType, ChartData, ChartOptions } from "chart.js";
import cloneDeep from "lodash.clonedeep";

export const Chart = defineComponent({
  name: "Chart",
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
      required: true,
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
          chart.options = options;
          chart.update();
        }
      }
    );

    return () =>
      h("canvas", {
        ref: canvas,
        width: props.width,
        height: props.height,
      });
  },
});
