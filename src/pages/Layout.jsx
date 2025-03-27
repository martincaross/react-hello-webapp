import { Outlet } from "react-router-dom/dist"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
    return (
            <Outlet />
    )
}

export default Layout;