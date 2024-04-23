import './App.css';
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {DefaultContext} from "./index";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App = observer(() => {
    let {userStore} = useContext(DefaultContext)

    useEffect(() => {
        fetch('http://localhost:5139/User/GetInfo', {
            credentials: "include"
        })
            .then(response => response.json())
            .then(json => userStore.user = json)
    }, []);

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
