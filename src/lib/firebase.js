import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBDciv8XcJ5dvdeOxf0n43AySFszwTYfGw",
    authDomain: "blog-630f5.firebaseapp.com",
    databaseURL: "https://blog-630f5-default-rtdb.firebaseio.com",
    projectId: "blog-630f5",
    storageBucket: "blog-630f5.appspot.com",
    messagingSenderId: "535024159436",
    appId: "1:535024159436:web:a44aa081837d0a47b7d069",
    measurementId: "G-PFDJYXKF5Y"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.initializeApp({});
}

const auth = firebase.auth()
const db = firebase.database()
const db_firestore = firebase.firestore()

export { auth, db_firestore, db }