import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FRB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FRB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FRB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FRB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FRB_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FRB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(config)
const db = getFirestore(app)

export default db
