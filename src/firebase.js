import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8EUGuSeBfyZcyuI8ND_G1aDYXs5ftsfs",
  authDomain: "loveguru-834ac.firebaseapp.com",
  projectId: "loveguru-834ac",
  storageBucket: "loveguru-834ac.appspot.com",
  messagingSenderId: "881632233061",
  appId: "1:881632233061:web:f3059dd33da39d3902a88c",
  measurementId: "G-5G74G136CH"
};

export const app = initializeApp(firebaseConfig)