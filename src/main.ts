import { createApp } from "vue-demi";
import App from "./App.vue";

import { createVueChartPlugin } from "./index";

const VueChartPlugin = createVueChartPlugin();

createApp(App).use(VueChartPlugin).mount("#app");
