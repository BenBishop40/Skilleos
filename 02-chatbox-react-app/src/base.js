// import Rebase from "re-base";
// import firebase from "firebase/app";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBE8T-Q_nNQS4ub9n_6IgzJt8P46eRmIoY",
    authDomain: "chatbox-app-41509.firebaseapp.com",
    databaseURL: "https://chatbox-app-41509-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatbox-app-41509",
    storageBucket: "chatbox-app-41509.appspot.com",
    messagingSenderId: "943553491590",
    appId: "1:943553491590:web:32cdebb58e319a2edc9707",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//   Gestion dB firebase via compo classe
const base = getDatabase(firebaseApp);

export default base
export { firebaseApp }

