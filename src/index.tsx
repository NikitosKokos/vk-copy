import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './components/routes/Routes'
import './index.css'

import * as firebase from 'firebase/app'
import { AuthProvider } from './components/providers/AuthProvider'

firebase.initializeApp({
    apiKey: 'AIzaSyACfXMQtGfsOWklbqO54jGxHiC2wviBNP8',
    authDomain: 'vk-copy-9ff5b.firebaseapp.com',
    projectId: 'vk-copy-9ff5b',
    storageBucket: 'vk-copy-9ff5b.appspot.com',
    messagingSenderId: '941730831546',
    appId: '1:941730831546:web:ad9fedda6d47ade613b683',
});

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Routes />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
