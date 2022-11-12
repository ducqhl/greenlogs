<template>
  <AuthWrapper :isLoading="isLoading">
    <div class="forgot-password">
      <Modal
        v-if="modalActive"
        :modalMessage="modalMessage"
        v-on:close-modal="closeModal"
      />
      <div class="form-wrap">
        <form class="reset">
          <p class="login-register">
            Back to
            <router-link class="router-link" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </p>
          <h2>Reset Password</h2>
          <p>Forgot your password? Enter your email to reset it</p>
          <div class="inputs">
            <div class="input">
              <input type="text" placeholder="Email" v-model="email" />
              <email class="icon" />
            </div>
          </div>
          <div v-show="errorMessage" class="error">{{ this.errorMessage }}</div>
          <button @click.prevent="resetPassword">Reset</button>
        </form>
      </div>
    </div>
  </AuthWrapper>
</template>

<script>
import { ROUTE_NAMES } from "@/router";
import Email from "@/assets/images/Icons/envelope-regular.svg";
import Modal from "@/components/Modal.vue";
import AuthWrapper from "@/views/layouts/AuthWrapper.vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "@/firebase";

export default {
  name: "forgot-password",
  components: {
    Email,
    AuthWrapper,
    Modal,
  },
  data() {
    return {
      email: null,
      modalActive: false,
      modalMessage: "",
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    resetPassword() {
      if (!this.email) {
        this.errorMessage = "Please fill the email field!";
        return;
      }

      this.isLoading = true;
      this.errorMessage = "";
      const auth = getAuth(firebaseApp);

      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive a email";
        })
        .catch((err) => {
          const message =
            err?.code === "auth/user-not-found"
              ? "User not found"
              : err?.message;
          this.modalMessage = message;
        })
        .finally(() => {
          this.isLoading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = false;
    },
  },
  created() {
    this.ROUTE_NAMES = ROUTE_NAMES;
  },
};
</script>

<style lang="scss" scoped>
.forgot-password {
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
