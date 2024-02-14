const firebase = require('firebase/app');
const { getFirestore, connectFirestoreEmulator } = require('firebase/firestore');
const firebaseConfig = require('./firebase_config.json');

const app = firebase.initializeApp(firebaseConfig);

let db = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, 'localhost', 8081);
}

module.exports = { db };
