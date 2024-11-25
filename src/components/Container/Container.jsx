import react from 'react'
import Header from '../Header/Header'
import { Link, NavLink } from 'react-router-dom';
import './Container.css'

const Container = ({ children }) => {
    return (
        <div className="layout-container">
            <div>
                <Header />
                <nav className="nav">
                    <ul className="ul">
                        <li className="li">
                            <NavLink to="/conanim" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            ניהול כוננים
                            </NavLink>
                        </li>
                        <li className="li">
                            <NavLink to="/" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            הזנקת כוננים
                            </NavLink>
                        </li>
                        <li className="li">
                            <NavLink to="/filtered-responders" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            לוח הבקרה
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {children}
            </div>
        </div>
    );
}
export default Container