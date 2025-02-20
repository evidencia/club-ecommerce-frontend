import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDe6TB6ca-dguqUJ6FEjCPRGKgN75fOb7w',
  authDomain: 'club-ecommerce-967d3.firebaseapp.com',
  projectId: 'club-ecommerce-967d3',
  storageBucket: 'club-ecommerce-967d3.firebasestorage.app',
  messagingSenderId: '115631025835',
  appId: '1:115631025835:web:335449845f8f49d13b91ee'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
