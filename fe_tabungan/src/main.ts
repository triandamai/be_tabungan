import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/app.css";
import "virtual:windi.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
