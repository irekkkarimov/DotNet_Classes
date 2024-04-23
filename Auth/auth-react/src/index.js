import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./stores/userStore";

export const DefaultContext = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DefaultContext.Provider  value={{
        userStore: new UserStore()
    }}>
        <App/>
    </DefaultContext.Provider>
);

