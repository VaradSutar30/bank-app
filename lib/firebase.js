// ✅ Modular Firebase v9+ imports (NOT v12)
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Your config...
  apiKey: "AIzaSyAYOLt8eFRiSB2SowiSrEX-divRlUAj1vQ",
  authDomain: "bank-cashier-app-c93fa.firebaseapp.com",
  projectId: "bank-cashier-app-c93fa",
  storageBucket: "bank-cashier-app-c93fa.firebasestorage.app",
  messagingSenderId: "771054035586",
  appId: "1:771054035586:web:62ef7d363b87b250f80a9b"
};



const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();