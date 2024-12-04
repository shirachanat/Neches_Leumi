import { useState } from 'react'
import Header from '../Header/Header'
import './Container.css'
import { MobileMain } from '../MobileScreens/MobileMain';
import dashboardIcon from '../../assetst/dashboard.png';
import { useMobileContext } from '../../contexts/MobileContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Navbar } from '../Navbar/Navbar';

<img className='HeaderIcons' src={dashboardIcon} alt="Dashboard icon" />


const Container = ({ children }) => {
    const { appStarted } = useMobileContext();
    const [opened, setOpened] = useState(false);
    useWebSocket();

    return (
        <>{
            !opened ? <div className='loader' onClick={() => setOpened(true)}></div> :
                !appStarted ? <MobileMain /> :
                    <div className='mega-container' >
                        <Header />
                        <div className='nav-content-container'>
                            <Navbar />
                            {children}
                        </div>
                    </div >}
        </>
    );
}
export default Container