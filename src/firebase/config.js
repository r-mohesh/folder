import { initializeApp } from "firebase/compat/app";
// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqTmumiDRAD67aQfuhHyyHBM35xdOHZNo",
  authDomain: "emco-gallary.firebaseapp.com",
  projectId: "emco-gallary",
  storageBucket: "emco-gallary.appspot.com",
  messagingSenderId: "1020620512952",
  appId: "1:1020620512952:web:0216424f4d712503d39e4d",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp };
