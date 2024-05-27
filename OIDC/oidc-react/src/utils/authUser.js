
const authUser = async (code) => {
    let data = await fetch('https://localhost:7288/auth/auth?' + new URLSearchParams({
        codeGoogle: code
    }), {
        method: 'post'
    })
        .then(response => response.json())

    return data
}

export default authUser