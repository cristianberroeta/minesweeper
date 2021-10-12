import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './components/Header';
import {Main} from './components/Main';
import {User} from './store/models/User';

function App() {
    // const user: User | null = {id: "123", name: "John Doe"};
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <BrowserRouter>
            <div>
                <Header user={user} />
                <Main user={user} />
            </div>
        </BrowserRouter>
    );
}

export default App;