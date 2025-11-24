import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy0ystbyFLfX4M5duv23icZp7G_tswETU",
  authDomain: "claimguard-622e1.firebaseapp.com",
  projectId: "claimguard-622e1",
  storageBucket: "claimguard-622e1.firebasestorage.app",
  messagingSenderId: "681127643966",
  appId: "1:681127643966:web:96a3fef0622068dc46fa6f",
  measurementId: "G-K8CNFRN0VZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;