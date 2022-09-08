import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const apiKey = process.env.REACT_APP_API_KEY
const authDomain = process.env.REACT_APP_AUTH_DOMAIN
const projectId = process.env.REACT_APP_PROJECT_ID
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID
const appId = process.env.REACT_APP_APP_ID

let firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;