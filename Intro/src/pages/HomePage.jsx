import Item from "../components/Item.jsx";
import {useContext} from "react";
import {Context} from "../main.jsx";
import getFromLocalStorage from "../utils/getFromLocalStorage.js";
import {useNavigate} from "react-router-dom";
import clearLocalStorage from "../utils/clearLocalStorage.js";


const HomePage = () => {
    const {items} = useContext(Context)
    const navigate = useNavigate()
    const isAuth = getFromLocalStorage('token')

    return (
        isAuth ? <>
            <p>Items:</p>
            <div>
                {items.map(i => <Item id={i.id} name={i.name}/>)}
                <button
                    onClick={() => {
                        clearLocalStorage()
                        navigate('/')
                    }}>
                    Выйти
                </button>
            </div>
        </> : <button onClick={() => navigate('/')}>Войти</button>
    )
}

export default HomePage