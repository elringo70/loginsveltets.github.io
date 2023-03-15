import admin from 'firebase-admin';

import ServiceAccount from 'C:/Users/elrin/Documents/GitHub/login-svelte-ts/firebase.json';
const serviceAccount = ServiceAccount as admin.ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

export default admin;
