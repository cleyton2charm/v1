import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_PROJECT_ID+".firebaseapp.com",
  databaseURL: "https://"+process.env.VUE_APP_FIREBASE_PROJECT_ID+".firebaseio.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_PROJECT_ID+".appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

const db = app.database();
const auth = app.auth();
const storageRef = app.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storageRef, provider}