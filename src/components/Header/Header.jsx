import react from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="title">נכס לאומי</h1>
                <nav className="nav">
                    <ul className="ul">
                        <li className="li"><Link to="/conanim" className="link">ניהול כוננים</Link></li>
                        <li className="li"><Link to="/" className="link">הזנקת כוננים</Link></li>
                        <li className="li"><Link to="/filtered-responders" className="link">לוח הבקרה</Link></li>
                    </ul>
                </nav>
                <img className='logo' src="./emergency-icon.png" alt="לוגו חירום" />
            </div>
        </header>
    );
};

export default Header;