<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="branding__header" :to="{ name: ROUTE_NAMES.HOME }"
          >GREEN LOGS</router-link
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
          <router-link
            v-if="user"
            class="link"
            :to="{ name: ROUTE_NAMES.CREATE_POST }"
            >Create Blog</router-link
          >
          <router-link
            v-if="!user"
            class="link"
            :to="{ name: ROUTE_NAMES.LOGIN }"
            >Login/Register</router-link
          >
        </ul>
        <div
          v-if="user"
          :class="{ 'mobile-user-menu': isOnMobile }"
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
        >
          <span>{{ userProfile.initials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ userProfile.initials }}</p>
              <div class="right">
                <p>
                  {{ userProfile.firstName }}
                  {{ userProfile.lastName }}
                </p>
                <p>
                  {{ userProfile.username }}
                </p>
                <p>
                  {{ userProfile.email }}
                </p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link
                  class="option-link"
                  :to="{ name: ROUTE_NAMES.PROFILE }"
                >
                  <UserIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <!-- <div v-if="admin" class="option">
                <router-link
                  class="option-link"
                  :to="{ name: ROUTE_NAMES.ADMIN }"
                >
                  <AdminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div> -->
              <div @click="signOut" class="option">
                <SignOutIcon class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
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
        <router-link
          v-if="user"
          class="link"
          :to="{ name: ROUTE_NAMES.CREATE_POST }"
          >Create Blog</router-link
        >
        <router-link v-if="!user" class="link" :to="{ name: ROUTE_NAMES.LOGIN }"
          >Login/Register</router-link
        >
      </ul>
    </transition>
  </header>
</template>

<script>
import MenuIcon from "@/assets/images/icons/bars-regular.svg";
import UserIcon from "@/assets/images/icons/user-alt-light.svg";
// import AdminIcon from "@/assets/images/Icons/user-crown-light.svg";
import SignOutIcon from "@/assets/images/icons/sign-out-alt-regular.svg";
import { ROUTE_NAMES } from "../router";
import { getAuth, signOut } from "@firebase/auth";
import { firebaseApp } from "../firebase";

export default {
  name: "vue-navigation",
  components: {
    MenuIcon,
    UserIcon,
    // AdminIcon,
    SignOutIcon,
  },
  data() {
    return {
      profileMenu: null,
      isOnMobile: false,
      mobileNavOpening: false,
      windowWidth: 0,
    };
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
    user() {
      return this.$store.state.user;
    },
    userProfile() {
      return this.$store.state.profile;
    },
    // admin() {
    //   return this.$store.state.admin;
    // },
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
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      const auth = getAuth(firebaseApp);
      signOut(auth);
      window.location.reload();
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

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        span {
          pointer-events: none;
        }
        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;
            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }
          .options {
            padding: 15px;

            .option,
            .option-link {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
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
