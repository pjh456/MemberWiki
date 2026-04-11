import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Home from "@/pages/Home"
import Profile from "@/pages/Profile"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />, // 外层是导航栏布局
        children: [
            { index: true, element: <Home /> }, // 里面填入首页！千万不能填 Layout
            { path: "profile", element: <Profile /> } // 里面填入个人履历
        ]
    }
])