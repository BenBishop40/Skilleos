// Import the functions you need from the SDKs you need
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBMMxARiYur5oYgVBu9nv7SwjKFstPhBvo",
    authDomain: "recettes-app-c59ca.firebaseapp.com",
    databaseURL: "https://recettes-app-c59ca-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recettes-app-c59ca",
    storageBucket: "recettes-app-c59ca.appspot.com",
    messagingSenderId: "561280568928",
    appId: "1:561280568928:web:6f1526de682bcc1458bd05",
    measurementId: "G-VS09QVX2WS",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//   Gestion dB firebase via compo classe
const base = getDatabase(firebaseApp);

export default base;
export { firebaseApp };
