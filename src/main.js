import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueEditor from "vue3-editor";
import { store } from "./stores/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebase";

let app;
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(VueEditor);
    app.use(store);
    app.mount("#app");
  }
});
