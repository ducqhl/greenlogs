<template>
  <AuthWrapper :isLoading="isLoading">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: ROUTE_NAMES.LOGIN }"
          >Login</router-link
        >
      </p>
      <h2>Create Your GreenBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <User class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <User class="icon" />
        </div>
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
      <button @click.prevent="register">Sign Up</button>
    </form>
  </AuthWrapper>
</template>

<script>
import { ROUTE_NAMES } from "@/router";
import Email from "@/assets/images/icons/envelope-regular.svg";
import Password from "@/assets/images/icons/lock-alt-solid.svg";
import User from "@/assets/images/icons/user-alt-light.svg";
import AuthWrapper from "@/views/layouts/AuthWrapper.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firestore, { firebaseApp } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default {
  name: "vue-register",
  components: {
    Email,
    Password,
    User,
    AuthWrapper,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      errorMessage: "",
      isLoading: false,
    };
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
  },
  methods: {
    async register() {
      if (
        !this.email ||
        !this.password ||
        !this.firstName ||
        !this.lastName ||
        !this.username
      ) {
        this.errorMessage = "Please fill out all the fields!";
        return;
      }

      this.errorMessage = "";
      this.isLoading = true;
      const auth = getAuth(firebaseApp);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        const docRef = await doc(
          collection(firestore, "users"),
          userCredential.user.uid
        );

        await setDoc(docRef, {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        });

        this.$router.push({ name: ROUTE_NAMES.HOME });
      } catch (error) {
        console.error("Error adding document: ", error);
        this.errorMessage = error?.message ?? error;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
