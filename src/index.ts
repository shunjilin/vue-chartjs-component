import { App, inject, InjectionKey } from "vue-demi";
import { Chart } from "./components/Chart";

export interface VueChartPlugin {
  install(app: App): void;
}

export const VueChartPluginSymbol: InjectionKey<VueChartPlugin> = Symbol();

export function VueChartPlugin(): VueChartPlugin {
  const VueChartPlugin = inject(VueChartPluginSymbol);
  if (!VueChartPlugin) throw new Error("No VueChartPlugin provided!!!");

  return VueChartPlugin;
}

export function createVueChartPlugin(): VueChartPlugin {
  const plugin: VueChartPlugin = {
    install(app: App) {
      app.component("vue-chart-wrapper", Chart);
      app.provide(VueChartPluginSymbol, this);
    },
  };

  return plugin;
}
