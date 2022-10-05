import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from "./Contexts/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
