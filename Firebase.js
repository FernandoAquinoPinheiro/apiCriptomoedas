
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA1xf2QphTyeXo11rHcpVyLi-1qO0z-Kjw",
  authDomain: "appcripto-a8bf2.firebaseapp.com",
  projectId: "appcripto-a8bf2",
  storageBucket: "appcripto-a8bf2.appspot.com",
  messagingSenderId: "863987981485",
  appId: "1:863987981485:web:e41d2cfebbdd669493fa24"
};


const app = initializeApp(firebaseConfig);
export const firestore =getFirestore(app);