import firebase from 'firebase/app'
import 'firebase/auth'

 var firebaseConfig = {
    apiKey: "",
    authDomain: "admin-toynovo.firebaseapp.com",
    databaseURL: "https://admin-toynovo.firebaseio.com",
    projectId: "admin-toynovo",
    storageBucket: "admin-toynovo.appspot.com",
    messagingSenderId: "",
    appId: ""

  };

  const fb = firebase.initializeApp(firebaseConfig);
  export default fb;
  
