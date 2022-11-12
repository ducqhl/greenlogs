import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import * as ENV from "../constants";

export const COLLECTIONS = {
  USERS: "users",
  BLOG_POSTS: "blogPosts",
};

const firebaseConfig = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const timestamp = serverTimestamp();

export default getFirestore(firebaseApp);
