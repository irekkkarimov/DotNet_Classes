import {jwtDecode} from "jwt-decode";

const refreshToken = async (accessToken) => {
    let data = await fetch('https://localhost:7288/auth/refresh?' + new URLSearchParams({
        accessToken: accessToken
    }), {
        method: 'post'
    })
        .then(response => response.json())

    localStorage.setItem('identity_token', data.identityToken)
    localStorage.setItem('access_token', data.accessToken)
    return jwtDecode(data.identityToken)
}

export default refreshToken