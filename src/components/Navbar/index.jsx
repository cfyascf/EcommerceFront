import styled from './styles.module.sass'
import { Link } from 'react-router-dom'
import logo from '/company.png'

export const Navbar = () => {
    return <>
        <div className={styled.navbarContainer}>
            <div className={styled.title}>
                <img src={logo}></img>
                <p>Flesque</p>
            </div>
            <ul className={styled.navbar}>
                <li>
                    <Link to='/home' className={styled.button}>Home</Link>
                </li>
                <li>
                    <Link to='/' className={styled.button}>Logout</Link>
                </li>
            </ul>
        </div>
    </>
}