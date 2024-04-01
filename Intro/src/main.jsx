import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import items from "./data/items.js";

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{items: items}}>
      <BrowserRouter>
          <React.StrictMode>
              <App />
          </React.StrictMode>
      </BrowserRouter>
  </Context.Provider>
)
