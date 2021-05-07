import {
  ref,
  defineComponent,
  PropType,
  onMounted,
  watch,
  h,
  CanvasHTMLAttributes,
} from "vue-demi";
import { Chart as Chartjs } from "chart.js";
import type {
  ChartType,
  ChartData,
  ChartOptions,
  UpdateMode,
  ChartTypeRegistry,
  Plugin,
} from "chart.js";
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
    updateMode: {
      type: String as PropType<UpdateMode | undefined>,
      default: undefined,
    },
    plugins: {
      type: Array as PropType<Array<Plugin<keyof ChartTypeRegistry, unknown>>>,
      default: (): [] => [],
    },
    canvasProps: {
      type: Object as PropType<CanvasHTMLAttributes>,
      default: undefined,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chartjs | null = null;

    onMounted(() => {
      const { type, data, options, plugins } = cloneDeep(props);
      if (canvas.value) {
        chart = new Chartjs(canvas.value, {
          type,
          data,
          options,
          plugins,
        });
      }
    });

    watch(
      () => cloneDeep(props),
      (newProps) => {
        if (chart) {
          const { data, options } = newProps;
          chart.data = data;
          if (options) {
            chart.options = options;
          }
          chart.update(props.updateMode);
        }
      }
    );

    return {
      canvas,
    };
  },
  render() {
    return h("canvas", {
      ...this.canvasProps,
      ref: "canvas",
    });
  },
});
