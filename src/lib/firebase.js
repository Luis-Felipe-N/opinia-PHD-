import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABSE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    // storageBucket: "blog-630f5.appspot.com",
    // messagingSenderId: "535024159436",
    // appId: "1:535024159436:web:a44aa081837d0a47b7d069",
    // measurementId: "G-PFDJYXKF5Y"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp({});
}

const auth = firebase.auth()
const db = firebase.database()
const db_firestore = firebase.firestore()

export { auth, db_firestore, db }