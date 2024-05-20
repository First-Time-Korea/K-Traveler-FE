// import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "/style.css";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(VCalendar, {});
app.use(pinia);

pinia.use(piniaPluginPersistedstate);

router.isReady().then(() => {
  app.mount("#app");
});
