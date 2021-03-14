import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { resolveComponent } from "@vue/runtime-core";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBOo-s1-i_BcxU4EobnITuFW92wUVxWt2Q",
  authDomain: "myproject-64aac.firebaseapp.com",
  databaseURL: "https://myproject-64aac.firebaseio.com",
  projectId: "myproject-64aac",
  storageBucket: "myproject-64aac.appspot.com",
  messagingSenderId: "264573731963",
  appId: "1:264573731963:web:d7eca828e5b38b71be4ede",
  measurementId: "G-VFLQLMSC1P",
});
firebaseApp.analytics();

const auth = firebaseApp.auth();
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    }, reject);
  });
}

export { auth, getCurrentUser };
