import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {DefaultContext} from "../index";


const AdminPage = observer(() => {
    const {userStore} = useContext(DefaultContext)

    return (
        <div className="admin-page">
            <h1>It's admin page</h1>
            <h2>User's email: {userStore.user.email}</h2>
        </div>
    )
})

export default AdminPage