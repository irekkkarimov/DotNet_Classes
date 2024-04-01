import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../main.jsx";
import setToLocalStorage from "../utils/setToLocalStorage.js";

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return (
        <>
            <form>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} required/>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
            </form>
            <button
                onClick={() => {
                    if (login === '' || password === '')
                        return

                    setToLocalStorage('token', login)
                    navigate('/home')
                }}>
                Login
            </button>
        </>
    )
}

export default LoginPage