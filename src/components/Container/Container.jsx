import react from 'react'
import Header from '../Header/Header'
import { Link, NavLink } from 'react-router-dom';
import './Container.css'

const Container = ({ children }) => {
    return (
        <div>
            <Header />
            <nav className="nav">
                <ul className="ul">
                    <li className="li">
                        <NavLink to="/conanim" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            ניהול כוננים
                            <img className='HeaderIcons' src="./conanim.png" alt="conanim icon" />
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            הזנקת כוננים
                            <img className='HeaderIcons' src="./haznaka.png" alt="haznaka icon" />
                        </NavLink>
                    </li>
                    <li className="li">
                        <NavLink to="/filtered-responders" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                            לוח הבקרה
                            <img className='HeaderIcons' src="./dashboard.png" alt="Dashboard icon" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {children}
        </div >
    );
}
export default Container