import react, { useState } from 'react'
import Header from '../Header/Header'
import { Link, NavLink } from 'react-router-dom';
import './Container.css'
import { MobileMain } from '../MobileScreens/MobileMain';
import dashboardIcon from '../../assetst/dashboard.png';
import haznakaIcon from '../../assetst/haznaka2.png';
import conanimIcon from '../../assetst/conanim.png';
import { useMobileContext } from '../../contexts/MobileContext';
import { useWebSocket } from '../../hooks/useWebSocket';

<img className='HeaderIcons' src={dashboardIcon} alt="Dashboard icon" />


const Container = ({ children }) => {
    const {appStarted, setHuzneku, setAppStarted, setIconIphoneClicked} = useMobileContext();
    const [opened, setOpened] = useState(false);
    useWebSocket();
    const handleHaznakaNav=()=>{
        setHuzneku(false);
        setAppStarted(false);
        setIconIphoneClicked(true);
    }
    return (
        <>{
            !opened ? <div className='loader' onClick={() => setOpened(true)}></div> :
                !appStarted ? <MobileMain /> :
                        <div className='mega-container' >
                            <Header />
                            <nav className="nav">
                                <ul className="ul">
                                    <li className="li">
                                        <NavLink to="/conanim" className={({ isActive }) => `link ${isActive ? 'active' : ''}`}>
                                            ניהול כוננים
                                            <img className='HeaderIcons' src={conanimIcon} alt="conanim icon" />
                                        </NavLink>
                                    </li>
                                    <li className="li">
                                        <NavLink  className={({ isActive }) => `link`} onClick={handleHaznakaNav}>
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
                            {children}
                        </div >}
        </>
    );
}
export default Container