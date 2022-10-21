import { createApp } from "vue";

import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import moment from "moment";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);
app.config.globalProperties.$filters = {
  formatDate(value) {
    if (value) {
      return moment(String(value)).format("DD/MM/YYYY hh:mm");
    }
  },
};

app.mount("#app");
