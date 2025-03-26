import { Outlet } from "react-router-dom/dist"
import Modal from "../components/Modal"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
    return (

            <Outlet />

    )
}

export default Layout;