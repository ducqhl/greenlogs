import { createStore } from "vuex";
import { getAuth } from "firebase/auth";
import firestore, { firebaseApp, COLLECTIONS } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const MUTATIONS = {
  SET_POST: "SET_POST",
  OPEN_PHOTO_PREVIEW: "OPEN_PHOTO_PREVIEW",
  TOGGLE_EDIT_POST: "TOGGLE_EDIT_POST",
  FILTER_BLOG_POST: "FILTER_BLOG_POST",
  UPDATE_USER: "UPDATE_USER",
  SET_PROFILE: "SET_PROFILE",
  SET_ADMIN: "SET_ADMIN",
};

export const ACTIONS = {
  GET_CURRENT_USER: "GET_CURRENT_USER",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  DELETE_POST: "DELETE_POST",
  UPDATE_USER_SETTINGS: "UPDATE_USER_SETTINGS",
};

const defaultState = {
  sampleBlogCards: [
    {
      id: "1",
      title: "Blog Card #1",
      photo: "src/assets/images/blogCards/stock-1.jpg",
      date: "May 1, 2022",
    },
    {
      id: "2",
      title: "Blog Card #2",
      photo: "src/assets/images/blogCards/stock-2.jpg",
      date: "May 1, 2022",
    },
    {
      id: "3",
      title: "Blog Card #3",
      photo: "src/assets/images/blogCards/stock-3.jpg",
      date: "May 1, 2022",
    },
    {
      id: "4",
      title: "Blog Card #4",
      photo: "src/assets/images/blogCards/stock-4.jpg",
      date: "May 1, 2022",
    },
  ],
  blogPosts: [],
  postLoaded: null,
  editPostMode: false,
  user: null,
  blog: {
    title: "",
    html: "Write your blog title here...",
    photoName: "",
    photoFileURL: null,
    isOnPhotoReview: null,
  },
  admin: null,
  profile: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    initials: null,
  },
};

export const store = createStore({
  state() {
    return defaultState;
  },
  mutations: {
    [MUTATIONS.SET_POST](state, payload) {
      state.blog = payload;
    },
    [MUTATIONS.OPEN_PHOTO_PREVIEW](state) {
      state.blog.isOnPhotoReview = true;
    },
    [MUTATIONS.TOGGLE_EDIT_POST](state, payload) {
      state.editPostMode = payload;
    },
    [MUTATIONS.FILTER_BLOG_POST](state, payload) {
      state.blogPosts = state.blogPosts?.filter((post) => post.id !== payload);
    },
    [MUTATIONS.UPDATE_USER](state, payload) {
      state.user = payload;
    },
    [MUTATIONS.SET_PROFILE](state, payload) {
      state.profile = payload;
    },
    [MUTATIONS.SET_ADMIN](state, payload) {
      state.admin = payload;
    },
  },
  actions() {
    return {
      async [ACTIONS.GET_CURRENT_USER]({ commit }, user) {
        const auth = getAuth(firebaseApp);
        const docRef = doc(
          collection(firestore, COLLECTIONS.USERS),
          auth.currentUser.uid
        );

        const dbResults = getDoc(docRef);
        const profile = fromDocumentToProfile(dbResults);
        commit(MUTATIONS.SET_PROFILE, profile);

        const token = await user.getIdTokenResult();
        const admin = await token.claims.admin;
        commit(MUTATIONS.SET_PROFILE, admin);
      },
      async [ACTIONS.GET_POSTS]({ state }) {
        const blogPostsRef = collection(firestore, COLLECTIONS.BLOG_POSTS);
        const q = query(blogPostsRef, orderBy("date", "desc"));
        onSnapshot(q, (doc) => {
          if (!state.blogPosts.some((post) => post.id === doc.id)) {
            const data = {
              id: doc.data().id,
              html: doc.data().html,
              coverPhoto: doc.data().coverPhoto,
              title: doc.data().title,
              date: doc.data().date,
              coverPhotoName: doc.data().coverPhotoName,
            };
            state.blogPosts.push(data);
          }
        });
        state.postLoaded = true;
      },
      async [ACTIONS.UPDATE_POST]({ commit, dispatch }, payload) {
        commit(MUTATIONS.FILTER_BLOG_POST, payload);
        await dispatch(ACTIONS.GET_POSTS);
      },
      async [ACTIONS.DELETE_POST]({ commit }, payload) {
        const blogPostsRef = collection(firestore, COLLECTIONS.BLOG_POSTS);
        const docRef = doc(blogPostsRef, payload);
        await deleteDoc(docRef);
        commit(MUTATIONS.FILTER_BLOG_POST, payload);
      },
      async [ACTIONS.UPDATE_USER_SETTINGS]({ state }) {
        const userRef = collection(firestore, COLLECTIONS.USERS);
        const docRef = doc(userRef, state.profile.id);
        await updateDoc(docRef, {
          firstName: state.profile.firstName,
          lastName: state.profile.lastName,
          username: state.profile.username,
          initials: generateProfileInitials(
            state.profile.firstName,
            state.profile.lastName
          ),
        });
      },
    };
  },
  modules() {},
});

const fromDocumentToProfile = (doc) => {
  if (!document) return {};

  const profile = {
    id: document?.id,
    email: doc.data().email,
    firstName: doc.data().firstName,
    lastName: doc.data().lastName,
    userName: doc.data().username,
  };

  profile.initials = generateProfileInitials(
    profile.firstName,
    profile.lastName
  );

  return profile;
};

const generateProfileInitials = (firstName, lastName) =>
  firstName.match(/(\b\S)?/g).join("") + lastName.match(/(\b\S)?/g).join("");
