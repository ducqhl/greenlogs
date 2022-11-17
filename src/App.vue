<template>
  <div class="app-wrapper">
    <div class="app">
      <VueNavigation v-if="!navigation" />
      <router-view />
      <FooterVue />
    </div>
  </div>
</template>

<script>
import VueNavigation from "./components/Navigation.vue";
import FooterVue from "./components/Footer.vue";
import { ROUTE_NAMES } from "./router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebase";
import { ACTIONS, MUTATIONS } from "./stores";

export default {
  name: "app",
  components: {
    VueNavigation,
    FooterVue,
  },
  data() {
    return {
      navigation: null,
    };
  },
  methods: {
    checkRoute() {
      this.navigation =
        this.$route.name === ROUTE_NAMES.LOGIN ||
        this.$route.name === ROUTE_NAMES.REGISTER ||
        this.$route.name === ROUTE_NAMES.FORGOT_PASSWORD;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  created() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      this.$store.commit(MUTATIONS.UPDATE_USER, user);

      if (user) {
        this.$store.dispatch(ACTIONS.GET_CURRENT_USER, user);
      }

      this.checkRoute();
      this.$store.dispatch(ACTIONS.GET_POSTS, user);
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import url("@vueup/vue-quill/dist/vue-quill.snow.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #ffffff;
  &:hover {
    border-bottom-color: #ffffff;
  }
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}

.arrow-light {
  color: #fff;

  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 0.5s ease all;
  cursor: pointer;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
}
.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
