import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAX_XQrVSOoGOdL4bA2EsnwfPH-qt9lNZ0",
    authDomain: "riteshsihag-17-movie-website.firebaseapp.com",
    projectId: "riteshsihag-17-movie-website",
    storageBucket: "riteshsihag-17-movie-website.appspot.com",
    messagingSenderId: "123885130980",
    appId: "1:123885130980:web:0829c04a7e33b6e1b148f1",
    measurementId: "G-M54S93X53C"
  };
  
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;