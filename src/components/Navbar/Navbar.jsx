
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import dashboardIcon from '../../assetst/dashboard.png';
import haznakaIcon from '../../assetst/haznaka2.png';
import conanimIcon from '../../assetst/conanim.png';
import { useMobileContext } from '../../contexts/MobileContext';
export const Navbar = () => {
    const { setHuzneku, setAppStarted, setIconIphoneClicked} = useMobileContext();
    const handleHaznakaNav=()=>{
        setHuzneku(false);
        setAppStarted(false);
        setIconIphoneClicked(true);
    }
    return (
        <nav className="nav">
            <ul className="ul">
                <li className="li">
                    <NavLink to="/conanim" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                        ניהול כוננים
                        <img className='HeaderIcons' src={conanimIcon} alt="conanim icon" />
                    </NavLink>
                </li>
                <li className="li">
                    <NavLink className={({ isActive }) => `link`} onClick={handleHaznakaNav}>
                        הזנקת כוננים
                        <img className='HeaderIcons' src={haznakaIcon} alt="haznaka icon" />
                    </NavLink>
                </li>
                <li className="li">
                    <NavLink to="/filtered-responders" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                        לוח הבקרה
                        <img className='HeaderIcons' src={dashboardIcon} alt="Dashboard icon" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}