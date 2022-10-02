import { createApp } from "vue";

import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
