import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC2-moMe4ybuiNJ9C4R8i4LPADLr_xHakY",
  authDomain: "insta-clone-react-ea816.firebaseapp.com",
  projectId: "insta-clone-react-ea816",
  storageBucket: "insta-clone-react-ea816.appspot.com",
  messagingSenderId: "829697877900",
  appId: "1:829697877900:web:aa68c9d4baaf89086018a9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };