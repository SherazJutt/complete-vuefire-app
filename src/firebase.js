import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseApp = initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
});

export const storage = getStorage(firebaseApp);
