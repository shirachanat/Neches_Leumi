import react from 'react'
import Header from '../Header/Header'
import './Container.css'
const Container = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
} 

export default Container