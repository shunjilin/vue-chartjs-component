import { createApp } from "vue";
import App from "./App.vue";

import { createVueChartPlugin } from "./index";

const VueChartPlugin = createVueChartPlugin();

createApp(App).use(VueChartPlugin).mount("#app");
