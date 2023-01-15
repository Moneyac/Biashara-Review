import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_wrcvp4caBBQY4YdZmIqVOIXCimT-MCg",
  authDomain: "business-review-f364e.firebaseapp.com",
  storageBucket: "business-review-f364e.appspot.com",
  projectId: "business-review-f364e",
  messagingSenderId: "107315296760",
  appId: "1:107315296760:web:bcbb8409303503d38ffe0d"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);