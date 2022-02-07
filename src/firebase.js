import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD7SN_BwLswWvUHgNPxCcu_Z_esJ7_wkSM',
	authDomain: 'todosapp-7adc9.firebaseapp.com',
	databaseURL: 'https://todosapp-7adc9-default-rtdb.firebaseio.com',
	projectId: 'todosapp-7adc9',
	storageBucket: 'todosapp-7adc9.appspot.com',
	messagingSenderId: '400850968171',
	appId: '1:400850968171:web:1028e56624bed783d51b2e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
