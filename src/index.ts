import { App, inject, InjectionKey } from "vue-demi";
import { Chart } from "./components/Chart";

export interface VueChartjsComponentPlugin {
  install(app: App): void;
}

export const VueChartjsComponentPluginSymbol: InjectionKey<VueChartjsComponentPlugin> = Symbol();

export function VueChartjsComponentPlugin(): VueChartjsComponentPlugin {
  const VueChartjsComponentPlugin = inject(VueChartjsComponentPluginSymbol);
  if (!VueChartjsComponentPlugin)
    throw new Error("No VueChartjsComponentPlugin provided!!!");

  return VueChartjsComponentPlugin;
}

export function createVueChartjsComponentPlugin(): VueChartjsComponentPlugin {
  const plugin: VueChartjsComponentPlugin = {
    install(app: App) {
      app.component("vue-chartjs-component", Chart);
      app.provide(VueChartjsComponentPluginSymbol, this);
    },
  };

  return plugin;
}
