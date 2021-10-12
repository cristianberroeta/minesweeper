import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './components/Header';
import {Main} from './components/Main';
import {User} from './store/models/User';
import {FirebaseApp, initializeApp} from "firebase/app";
import FirebaseContext from './store/context/FirebaseContext';
import {getAuth, onAuthStateChanged} from "firebase/auth";

function App() {
    // const user: User | null = {id: "123", name: "John Doe"};
    const [user, setUser] = useState<User | null>(null);
    const [app, setApp] = useState<FirebaseApp | null>(null);
    console.log("user:", user);

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyCkyMWGqhq4s0shF-bpzbyUBfzPRedpCLc",
            authDomain: "mine-sweeper-deviget.firebaseapp.com",
            projectId: "mine-sweeper-deviget",
            storageBucket: "mine-sweeper-deviget.appspot.com",
            messagingSenderId: "138970065506",
            appId: "1:138970065506:web:abb625c76e182c6dcfff3b",
            measurementId: "G-WL4NX9DD0P"
        };
        const app = initializeApp(firebaseConfig);
        setApp(app);
    }, []);

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, user => {
            if (user) {
                const appUser: User = {
                    uid: user.uid,
                    email: user.email ?? "",
                };
                setUser(appUser);
            } else {
                setUser(null);
            }
        });
    }, []);

    return (
        <BrowserRouter>
            <FirebaseContext.Provider
                value={app}>
                <div>
                    <Header user={user} />
                    <Main user={user} setUser={setUser} />
                </div>
            </FirebaseContext.Provider>
        </BrowserRouter>
    );
}

export default App;