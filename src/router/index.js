import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import CreatePost from "../views/CreatePost.vue";
import EditBlog from "../views/EditBlog.vue";
import { firebaseApp } from "../firebase";
import { getAuth } from "firebase/auth";
// import Admin from "../views/Admin.vue";

export const ROUTE_NAMES = {
  HOME: "Home",
  BLOGS: "Blogs",
  CREATE_POST: "CreatePost",
  LOGIN: "Login",
  REGISTER: "Register",
  FORGOT_PASSWORD: "ForgotPassword",
  PROFILE: "Profile",
  BLOG_PREVIEW: "BlogPreview",
  VIEW_BLOG: "ViewBlog",
  EDIT_BLOG: "EditBlog",
  // ADMIN: "Admin",
};

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  base: import.meta.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
    {
      path: "/profile",
      name: ROUTE_NAMES.PROFILE,
      component: Profile,
      meta: {
        title: "Profile",
        requiresAuth: true,
      },
    },
    // {
    //   path: "/admin",
    //   name: ROUTE_NAMES.ADMIN,
    //   component: Admin,
    //   meta: {
    //     title: "Admin",
    //   },
    // },
    {
      path: "/create-post",
      name: ROUTE_NAMES.CREATE_POST,
      component: CreatePost,
      meta: {
        title: "Create Post",
        requiresAuth: true,
        // requiresAdmin: true,
      },
    },
    {
      path: "/blog-preview",
      name: ROUTE_NAMES.BLOG_PREVIEW,
      component: BlogPreview,
      meta: {
        title: "Preview Blog Post",
        requiresAuth: true,
        // requiresAdmin: true,
      },
    },
    {
      path: "/view-blog/:blog_id",
      name: ROUTE_NAMES.VIEW_BLOG,
      component: ViewBlog,
      meta: {
        title: "View Blog Post",
        requiresAuth: false,
      },
    },
    {
      path: "/edit-blog/:blog_id",
      name: ROUTE_NAMES.EDIT_BLOG,
      component: EditBlog,
      meta: {
        title: "Edit Blog Post",
        requiresAuth: true,
        // requiresAdmin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | GreenLogs`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth(firebaseApp);
  let user = auth.currentUser;
  // let admin = null;
  // if (user) {
  //   let token = await user.getIdTokenResult();
  //   admin = token.claims.admin;
  // }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      // if (to.matched.some((res) => res.meta.requiresAdmin)) {
      //   if (admin) {
      //     return next();
      //   }
      //   return next({ name: "Home" });
      // }
      return next();
    }
    return next({ name: ROUTE_NAMES.HOME });
  }

  return next();
});

export default router;
