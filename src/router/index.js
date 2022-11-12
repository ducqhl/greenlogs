import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

export const ROUTE_NAMES = {
  HOME: "Home",
  BLOGS: "Blogs",
  CREATE_POST: "CreatePost",
  LOGIN: "Login",
  REGISTER: "Register",
  FORGOT_PASSWORD: "ForgotPassword",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: ROUTE_NAMES.HOME,
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/blogs",
      name: ROUTE_NAMES.BLOGS,
      component: Blogs,
      meta: {
        title: "Blogs",
      },
    },
    {
      path: "/create-post",
      name: ROUTE_NAMES.CREATE_POST,
      component: Blogs,
      meta: {
        title: "Create Post",
      },
    },
    {
      path: "/login",
      name: ROUTE_NAMES.LOGIN,
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      name: ROUTE_NAMES.REGISTER,
      component: Register,
      meta: {
        title: "Register",
      },
    },
    {
      path: "/forgot-password",
      name: ROUTE_NAMES.FORGOT_PASSWORD,
      component: ForgotPassword,
      meta: {
        title: "Forgot Password",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

export default router;
