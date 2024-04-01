import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import clearLocalStorage from "./utils/clearLocalStorage.js";

function App() {
    const navigate = useNavigate()

    return (
        <>
            <header>
                It's header
            </header>
            <Routes>
                <Route path="/" element={LoginPage()}></Route>
                <Route path="/home" element={HomePage()}></Route>
                <Route path="/item/:id" element={<ItemPage/>}></Route>
            </Routes>
        </>
    )
}

export default App
