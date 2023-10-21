// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpeufD099yQFKqe9aV8kk3PJ-utWcKrq0",
  authDomain: "blogsapp-be4c3.firebaseapp.com",
  projectId: "blogsapp-be4c3",
  storageBucket: "blogsapp-be4c3.appspot.com",
  messagingSenderId: "543559432604",
  appId: "1:543559432604:web:bb86477c7e48c2a949b059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);