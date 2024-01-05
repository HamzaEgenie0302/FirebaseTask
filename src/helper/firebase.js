import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAsLe7b2sARQM8f0zm4WkeUfhqKmHfRBVU",
    authDomain: "reactapp-a91d0.firebaseapp.com",
    projectId: "reactapp-a91d0",
    storageBucket: "reactapp-a91d0.appspot.com",
    messagingSenderId: "1062745484762",
    appId: "1:1062745484762:web:f1d06d80b94a6d36b464e3",
    measurementId: "G-THY31QTFTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage =  getStorage(app)
