import { GOOGLE_APPLICATION_CREDENTIALS } from '$env/static/private';
import admin from 'firebase-admin';

const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
