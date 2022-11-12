<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="branding__header" to="{ name: ROUTE_NAMES.HOME }"
          >GreenLogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul v-show="!isOnMobile">
          <router-link class="link" :to="{ name: ROUTE_NAMES.HOME }"
            >Home</router-link
          >
          <router-link class="link" :to="{ name: ROUTE_NAMES.BLOGS }"
            >Blogs</router-link
          >
          <router-link class="link" :to="{ name: ROUTE_NAMES.CREATE_POST }"
            >Create Blog</router-link
          >
          <router-link class="link" :to="{ name: ROUTE_NAMES.LOGIN }"
            >Login/Register</router-link
          >
        </ul>
      </div>
    </nav>
    <MenuIcon class="menu-icon" @click="toggleMobileNav" v-show="isOnMobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNavOpening">
        <router-link class="link" :to="{ name: ROUTE_NAMES.HOME }"
          >Home</router-link
        >
        <router-link class="link" :to="{ name: ROUTE_NAMES.BLOGS }"
          >Blogs</router-link
        >
        <router-link class="link" :to="{ name: ROUTE_NAMES.CREATE_POST }"
          >Create Blog</router-link
        >
        <router-link class="link" :to="{ name: ROUTE_NAMES.LOGIN }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import MenuIcon from "@/assets/images/Icons/bars-regular.svg";
import { ROUTE_NAMES } from "@/router";

export default {
  name: "vue-navigation",
  components: {
    MenuIcon,
  },
  data() {
    return {
      isOnMobile: false,
      mobileNavOpening: false,
      windowWidth: 0,
    };
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      this.isOnMobile = this.windowWidth <= 750;
      if (!this.isOnMobile) this.mobileNavOpening = false;
    },
    toggleMobileNav() {
      this.mobileNavOpening = !this.mobileNavOpening;
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  unmounted() {
    window.removeEventListener("resize", this.checkScreen);
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      &__header {
        font-weight: 500;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 28px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: white;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 0.5s ease;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}
</style>
