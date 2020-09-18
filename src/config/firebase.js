import firebase from 'firebase/app'
import 'firebase/auth'

 var firebaseConfig = {
    apiKey: "AIzaSyCb_QSCHbxO1FR7Sgxx3us5MMc24pFJc1I",
    authDomain: "admin-toynovo.firebaseapp.com",
    databaseURL: "https://admin-toynovo.firebaseio.com",
    projectId: "admin-toynovo",
    storageBucket: "admin-toynovo.appspot.com",
    messagingSenderId: "770088891947",
    appId: "1:770088891947:web:b9c5665221c1469ecc5c6e"

  };

  const fb = firebase.initializeApp(firebaseConfig);
  export default fb;
  