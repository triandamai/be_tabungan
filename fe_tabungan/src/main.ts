import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getCurrentUser } from "./services/FirebaseServices";
import "./assets/app.css";
import "virtual:windi.css";

router.beforeEach(async (_, from, next) => {
  if (_.meta.requireAuth) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});
const app = createApp(App);
app.use(router);
app.mount("#app");
