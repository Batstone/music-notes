// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCSuCFIe2ch2hRdRIHk3tQYh0MzQBJx-8A",
    authDomain: "music-notes-app-3a127.firebaseapp.com",
    databaseURL: "https://music-notes-app-3a127.firebaseio.com",
    projectId: "music-notes-app-3a127",
    storageBucket: "music-notes-app-3a127.appspot.com",
    messagingSenderId: "36567821030",
    appId: "1:36567821030:web:f97f5aec5248fdefcd6927"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;