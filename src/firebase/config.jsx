import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCoSczr89rDDqf-qvnK_23L5vv4wnpumyY",
  authDomain: "johnblog-6ae81.firebaseapp.com",
  projectId: "johnblog-6ae81",
  storageBucket: "johnblog-6ae81.firebasestorage.app",
  messagingSenderId: "525355561238",
  appId: "1:525355561238:web:364f4e9aae39263e9e6037"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };