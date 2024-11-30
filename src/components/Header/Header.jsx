import react from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import iconLogo from '../../assetst/Icon.svg';
import logoShabas from '../../assetst/logoShabas.png';
import DigitalIcon from '../../assetst/Digital.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img className='logo' src={iconLogo} alt="לוגו חירום" />
            </div>
            <div className="imeages">
                <img className='logoShabas' src={logoShabas} alt="לוגו שבס" />
                <img className='logoDigital' src={DigitalIcon} alt="לוגו דיגיטל" />
            </div>
        </header >
    );
};

export default Header;