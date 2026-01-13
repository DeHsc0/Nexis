import { createBrowserRouter } from "react-router-dom"
import { PATHS } from "./paths"
import Home from "@/pages/Home"
import Dashboard from "@/pages/Dashboard"

export const router = createBrowserRouter([
    {
        path : PATHS.ROOT,
        element : <Home/>
    },
    {
        path : PATHS.DASHBOARD,
        element : <Dashboard/>
    }
])