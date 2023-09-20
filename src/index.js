import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider, { FirebaseContext } from './store/Context'
import firebase from './firebase/config'
import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={firebase}>
            <AuthContextProvider>
                <Router>
                    <App />
                </Router>
            </AuthContextProvider>
        </FirebaseContext.Provider>
    </React.StrictMode>
);
