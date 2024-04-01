import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import getFromLocalStorage from "../utils/getFromLocalStorage.js";
import clearLocalStorage from "../utils/clearLocalStorage.js";


const ItemPage = () => {
    const {items} = useContext(Context)
    const navigate = useNavigate()
    const {id} = useParams()
    let thisItem = items.filter(i => i.id === parseInt(id))[0]
    let isAuth = getFromLocalStorage('token')

    return (
        isAuth ? <>
            <div>
                <h1>My id: {thisItem.id}</h1>
                <p>My name: {thisItem.name}</p>
                <p>My description: {thisItem.desc}</p>
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

export default ItemPage