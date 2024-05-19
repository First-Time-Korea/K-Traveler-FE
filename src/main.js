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

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
// app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(VCalendar, {});

router.isReady().then(() => {
  app.mount("#app");
});
