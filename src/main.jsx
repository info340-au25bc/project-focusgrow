import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUM9Di8ixcUxGTx1HH54iqwkRgJSPic2Q",
  authDomain: "focusgrow-d1169.firebaseapp.com",
  databaseURL: "https://focusgrow-d1169-default-rtdb.firebaseio.com",
  projectId: "focusgrow-d1169",
  storageBucket: "focusgrow-d1169.firebasestorage.app",
  messagingSenderId: "100452289594",
  appId: "1:100452289594:web:f40fb095eb1b8adba13903"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);