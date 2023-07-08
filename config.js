import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRkuKQfrbNeOTgDfsuOyYrpGrXzOomD9E",
  authDomain: "otobilet-4610c.firebaseapp.com",
  projectId: "otobilet-4610c",
  storageBucket: "otobilet-4610c.appspot.com",
  messagingSenderId: "794878967198",
  appId: "1:794878967198:web:0769ca4acaae161848aa8f",
  measurementId: "G-W5TB9ZEJG4"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
