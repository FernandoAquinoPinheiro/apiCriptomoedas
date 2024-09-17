import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCMo8K4vH6AuQNNr2XjoJFJOvEM7JTzB50",
  authDomain: "appcriptobd.firebaseapp.com",
  projectId: "appcriptobd",
  storageBucket: "appcriptobd.appspot.com",
  messagingSenderId: "727605727806",
  appId: "1:727605727806:web:6482c081425676b974776f"
};


const app = initializeApp(firebaseConfig);
export const firestore =getFirestore(app);