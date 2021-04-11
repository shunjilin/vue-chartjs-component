declare module "vue-chartjs-component" {
  import { DefineComponent, PropType } from "vue";
  import { ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";

  export const VueChartjsComponent: DefineComponent<{
    type: {
      type: PropType<keyof ChartTypeRegistry>;
      required: true;
    };
    data: {
      type: PropType<ChartData>;
      required: true;
    };
    options: {
      type: PropType<ChartOptions>;
    };
    height: {
      type: StringConstructor;
      default: string;
    };
    width: {
      type: StringConstructor;
      default: string;
    };
  }>;
}
