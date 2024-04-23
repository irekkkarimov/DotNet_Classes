import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";

export const routes = [
    {
        Path: '/user',
        Component: UserPage
    }
]

export const authRoutes = [
    {
        Path: '/admin',
        Component: AdminPage
    }
]