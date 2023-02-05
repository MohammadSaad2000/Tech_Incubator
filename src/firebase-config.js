import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyAyIL9dK_Ox2-4Ot2KCaFUXEzAN7ueFv7M",
    authDomain: "tech-incubator-62c3d.firebaseapp.com",
    projectId: "tech-incubator-62c3d",
    storageBucket: "tech-incubator-62c3d.appspot.com",
    messagingSenderId: "710018254200",
    appId: "1:710018254200:web:56ea50b8f7ed8569ff748d",
    measurementId: "G-G5KWX7TXL5"
  };

export default function initializeFirebase() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
