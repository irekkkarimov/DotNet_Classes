import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoadingStore from "./stores/loadingStore";

const DefaultContext = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DefaultContext.Provider value={new LoadingStore()}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </DefaultContext.Provider>
);

export default DefaultContext
