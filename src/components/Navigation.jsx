import { NavLink } from 'react-router-dom'
import './Navigation.module.css'

export default function Navigation() {
    return (
        <nav className="nav">
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
                Home
            </NavLink>
            <NavLink
                to="/movies"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
                Movies
            </NavLink>
        </nav>
    )
}
