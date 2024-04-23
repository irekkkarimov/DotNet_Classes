import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {DefaultContext} from "../index";
import {Route, Routes} from "react-router";
import {routes, authRoutes} from "../utils/routes";


const AppRouter = observer(() => {
    const {userStore} = useContext(DefaultContext)
    console.log(userStore.user.role)
    let userRole = userStore.user.role.toLowerCase()

    return (
        <Routes>
            {routes.map(({Path, Component}) => (
                <Route path={Path} element={<Component />} />
            ))}
            {userRole === 'admin' && authRoutes.map(({Path, Component}) => (
                <Route path={Path} element={<Component />} />
            ))}
        </Routes>
    )
});

export default AppRouter