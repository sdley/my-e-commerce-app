import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
        <div className="navbar fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 z-50">
        {/* <div className="navbar bg-gray-800 fixed w-full z-10 top-0 shadow-lg"> */}
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">My e-commerce App</Link>
        </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="products">Products</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </div>
        </div>

        <div className="min-h-screen bg-base-200 py-4 px-8">
            <Outlet />
        </div>
    
        <footer className="footer footer-center bg-gray-800 text-base-content rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                <a 
                    href="https://sdley.github.io/about"
                    target="_blank"
                    rel="noreferrer"
                    className="link link-hover">About me</a>
                <a
                    href="https://sdley.github.io/contact"
                    target="_blank"
                    rel="noreferrer"
                    className="link link-hover">Contact me</a>
            </nav>
            {/* <nav>
                <div className="grid grid-flow-col gap-1">
                    <a>
                                                
                    </a>
                </div>
            </nav> */}
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by &nbsp; 
                    <a href="https://sdley.github.io/"
                        target="_blank"
                        rel="noreferrer"
                        className="link link-hover"
                    >sdley</a>
                </p>
            </aside>
        </footer>
    </>
  )
}
