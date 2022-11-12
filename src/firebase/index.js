import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

export const COLLECTIONS = {
  USERS: "users",
  BLOG_POSTS: "blogPosts",
};

const firebaseConfig = {
  apiKey: "AIzaSyCYBPDOx3inrH9cepV96beoTVcJ4RY5Lus",
  authDomain: "greenlogs-749f1.firebaseapp.com",
  projectId: "greenlogs-749f1",
  storageBucket: "greenlogs-749f1.appspot.com",
  messagingSenderId: "350841341819",
  appId: "1:350841341819:web:41755865761bc7791b5fde",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const timestamp = serverTimestamp();

export default getFirestore(firebaseApp);
