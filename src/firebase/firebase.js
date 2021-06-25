import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDrq2_5KSoeZyOC8P6egc6_GUPy2AbyN60",
  authDomain: "lockify-dfc1d.firebaseapp.com",
  projectId: "lockify-dfc1d",
  storageBucket: "lockify-dfc1d.appspot.com",
  messagingSenderId: "129842587678",
  appId: "1:129842587678:web:a57a153c61dd776e10a60f",
  measurementId: "G-X4W7YZ6MSC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db=firebase.firestore();
export const auth=firebase.auth();

const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => auth.signInWithPopup(Provider);
