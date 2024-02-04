import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// My web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA7Busdaiuthg020xXl_WpoFEyyjbSbxE",
    authDomain: "ticproject-8fea2.firebaseapp.com",
    projectId: "ticproject-8fea2",
    storageBucket: "ticproject-8fea2.appspot.com",
    messagingSenderId: "551472165024",
    appId: "1:551472165024:web:43c74a5b7055f6abc699c5"
  };

// Inițializarea aplicației Firebase
const app = initializeApp(firebaseConfig);

// Inițializarea serviciului Firestore
const db = getFirestore(app);

// Initializarea serviciului Functions
const functions = getFunctions(app);

// Initializarea serviciului Storage
const storage = getStorage(app);

export { functions, serverTimestamp, storage };
export default db;