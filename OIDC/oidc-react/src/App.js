import './App.css';
import {useEffect, useState} from "react";
import authUser from "./utils/authUser";
import {jwtDecode} from "jwt-decode";
import refreshToken from "./utils/refreshToken";

function App() {
    const urlParams = new URLSearchParams(window.location.search)
    const [isAuth, setIsAuth] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const code = urlParams.get('code')
    const clientId = '978422021864-g93f7fm3vo59hau5c99vapr398pke8bh.apps.googleusercontent.com'

    useEffect(() => {
        if (code)
            authUser(code)
                .then(data => {
                    setIsAuth(true)
                    localStorage.setItem('identity_token', data.identityToken)
                    localStorage.setItem('access_token', data.accessToken)
                    setUserEmail(jwtDecode(data.identityToken).email)
                })
                .catch(() => {
                    refreshToken(localStorage.getItem('access_token'))
                        .then(data => {
                            setIsAuth(true)
                            setUserEmail(data.email)
                        })
                })
        else
            if (localStorage.getItem('access_token'))
                refreshToken(localStorage.getItem('access_token'))
                    .then(data => {
                        setIsAuth(true)
                        setUserEmail(data.email)
                    })
    }, []);

    return (
        <div className="App">
            {
                !isAuth &&
                <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&prompt=consent&access_type=offline&response_type=code&scope=openid%20profile%20email&redirect_uri=http://localhost:3000/`}>Войти</a>
            }
            {
                isAuth &&
                <p>{userEmail}</p>
            }
            {
                isAuth &&
                <button
                    onClick={() => {
                        localStorage.removeItem('identity_token')
                        localStorage.removeItem('access_token')
                        setIsAuth(false)
                        setUserEmail('')
                    }}
                    >
                    Log out
                </button>
            }
        </div>
    );
}

export default App;
