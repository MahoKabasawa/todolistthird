
import firebase from 'firebase/app';
import "firebase/firestore";


    const firebaseConfig = {
      apiKey: "AIzaSyDE24UUfhMcYUXRShVKVNIjeoWKY79pPn8",
      authDomain: "todolist201016.firebaseapp.com",
      databaseURL: "https://todolist201016.firebaseio.com",
      projectId: "todolist201016",
      storageBucket: "todolist201016.appspot.com",
      messagingSenderId: "747041832730",
      appId: "1:747041832730:web:0a72519f971414bc0c76a3",
      measurementId: "G-E9CBNCMM35"
    };

firebase.initializeApp(firebaseConfig);
 
export default firebase;
export const db = firebase.firestore();