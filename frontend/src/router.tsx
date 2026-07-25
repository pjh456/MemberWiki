import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Activity from "@/pages/Activity"
import ActivityDetail from "@/pages/ActivityDetail"
import Profile from "@/pages/Profile"
import ProfileEdit from "@/pages/ProfileEdit"
import MemberDetail from "@/pages/MemberDetail"
import Drafts from "@/pages/Drafts"
import Settings from "@/pages/Settings"
import SettingsPanel from "@/pages/SettingsPanel"
import AdminReview from "@/pages/AdminReview"
import VerifyCode from "@/pages/VerifyCode"
import Login from "@/pages/Login"

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "activity", element: <Activity /> },
      { path: "activity/:id", element: <ActivityDetail /> },
      { path: "profile", element: <Profile /> },
      { path: "member/:id", element: <MemberDetail /> },
      { path: "profile/edit", element: <ProfileEdit /> },
      { path: "drafts", element: <Drafts /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/:section", element: <SettingsPanel /> },
      { path: "admin/review", element: <AdminReview /> },
      { path: "verify", element: <VerifyCode /> },
    ],
  },
])
