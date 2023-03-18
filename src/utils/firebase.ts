// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	browserLocalPersistence,
	inMemoryPersistence
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCgZ03AqzzGw42SXerWa-RNG8ozX2wM7ZY',
	authDomain: 'nodejs-firebase-7a6fc.firebaseapp.com',
	projectId: 'nodejs-firebase-7a6fc',
	storageBucket: 'nodejs-firebase-7a6fc.appspot.com',
	messagingSenderId: '686413994044',
	appId: '1:686413994044:web:5115f470fd8ec8343dcb39'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'CLIENT');
export const auth = getAuth(app);
