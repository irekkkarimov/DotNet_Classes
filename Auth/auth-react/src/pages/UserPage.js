import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {DefaultContext} from "../index";


const UserPage = observer(() => {
    const {userStore} = useContext(DefaultContext)

    return (
        <div className="user-page">
            <h1>It's user page</h1>
            <h2>User's email: {userStore.user.email}</h2>
        </div>
    )
})

export default UserPage