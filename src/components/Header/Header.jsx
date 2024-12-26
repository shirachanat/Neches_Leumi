import react from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
// import iconLogo from '../../assetst/Icon.svg';
// import ShabasLogo from '../../assetst/logoShabas-removebg-preview.png';
import ShabasLogo from '../../assetst/ShabasLogo.png';
import DigitalIcon from '../../assetst/חטל.png';
// import NechesLeumiTxt from '../../assetst/NechesLeumiTxt.png';
import LogoNL from  '../../assetst/LogoNL.svg';
import NechesLeumiTxt from '../../assetst/NechesLeumiTxt.png';
import Soher from '../../assetst/SoherImg2.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img className='logoTxt' src={NechesLeumiTxt} alt="לוגו חירום" />
                {/* <h3>נכס לאומי</h3> */}
                <img className='logo' src={LogoNL} alt="לוגו חירום" />
                <img className='logoShabas' src={ShabasLogo} alt="לוגו שבס" />
                <img className='logoDigital' src={DigitalIcon} alt="לוגו דיגיטל" />
            </div>
            <div className="User">
                <h4>אשר יפרח</h4>
                <img className='Soher' src={Soher} alt="תמונת סוהר" />
            </div>
        </header >
    );
};

export default Header;