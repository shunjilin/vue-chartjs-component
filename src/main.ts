import { createApp } from "vue-demi";
import App from "./App.vue";

import { createVueChartjsComponentPlugin } from "./index";

const VueChartPlugin = createVueChartjsComponentPlugin();

createApp(App).use(VueChartPlugin).mount("#app");
