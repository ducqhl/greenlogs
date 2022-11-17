<template>
  <AuthWrapper :isLoading="isLoading">
    <form class="login-form">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: ROUTE_NAMES.REGISTER }"
          >Register</router-link
        >
      </p>
      <h2>Login to GreenBlogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <Email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <Password class="icon" />
        </div>
        <div v-show="errorMessage" class="error">{{ this.errorMessage }}</div>
      </div>
      <router-link
        class="forgot-password"
        :to="{ name: ROUTE_NAMES.FORGOT_PASSWORD }"
        >Forgot you password?</router-link
      >
      <button @click.prevent="signIn">Sign In</button>
    </form>
  </AuthWrapper>
</template>

<script>
import { ROUTE_NAMES } from "@/router";
import Email from "@/assets/images/icons/envelope-regular.svg";
import Password from "@/assets/images/icons/lock-alt-solid.svg";
import AuthWrapper from "@/views/layouts/AuthWrapper.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/firebase";

export default {
  name: "vue-login",
  components: {
    Email,
    Password,
    AuthWrapper,
  },
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null,
      isLoading: false,
    };
  },
  methods: {
    async signIn() {
      if (!this.email || !this.password) {
        this.errorMessage = "Please fill all the fields";
        return;
      }

      this.errorMessage = "";
      this.isLoading = true;
      const auth = getAuth(firebaseApp);

      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push({ name: ROUTE_NAMES.HOME });
      } catch (error) {
        console.error(error);
        this.errorMessage = error?.message ?? error;
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.ROUTE_NAMES = ROUTE_NAMES;
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  h2 {
    text-align: center;
    font-size: 32px;
    color: #303030;
    margin-bottom: 40px;

    @media (min-width: 900px) {
      font-size: 40px;
    }
  }

  .inputs {
    width: 100%;
    max-width: 350px;

    .input {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;

      input {
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 40px;
        height: 50px;

        &:focus {
          outline: none;
        }
      }

      .icon {
        width: 12px;
        position: absolute;
        left: 14px;
      }
    }
  }

  .forgot-password {
    text-decoration: underline;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 1rem;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
  }
}
</style>
