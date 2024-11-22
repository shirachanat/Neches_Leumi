import react from 'react'
import Header from '../Header/Header'

const Container = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
} 

export default Container