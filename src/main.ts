import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "timevoyer.firebaseapp.com",
  projectId: "timevoyer",
  storageBucket: "timevoyer.appspot.com",
  messagingSenderId: "414168373022",
  appId: "1:414168373022:web:d976ebfbcc820f366f9b0f",
  measurementId: "G-1H1DNMC22C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
