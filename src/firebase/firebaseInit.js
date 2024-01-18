import firebase from 'firebase/app'
import 'firebase/firestore'

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA7Busdaiuthg020xXl_WpoFEyyjbSbxE",
    authDomain: "ticproject-8fea2.firebaseapp.com",
    projectId: "ticproject-8fea2",
    storageBucket: "ticproject-8fea2.appspot.com",
    messagingSenderId: "551472165024",
    appId: "1:551472165024:web:43c74a5b7055f6abc699c5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();