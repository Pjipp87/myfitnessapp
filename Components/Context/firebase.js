// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAax0NXWEVTauwvCtyix-1N1hgrew89ac4",
  authDomain: "myfitnessapp-2186e.firebaseapp.com",
  databaseURL:
    "https://myfitnessapp-2186e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myfitnessapp-2186e",
  storageBucket: "myfitnessapp-2186e.appspot.com",
  messagingSenderId: "949015319057",
  appId: "1:949015319057:web:1c68456e39510161ffd7b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const database = getDatabase(app);
