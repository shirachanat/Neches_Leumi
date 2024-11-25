import react from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img className='logo' src="./Icon.svg" alt="לוגו חירום" />
            </div>
        </header>
    );
};

export default Header;