import {Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {BiFootball} from 'react-icons/bi';
import {IoIosFootball} from 'react-icons/io';
import './Navbar.css'

const NavBar = () => {

    return(

    <nav className='navBar py-3'>
      <div className=' d-flex justify-content-center'>
      <h1 className='titleNav'>F<span><IoIosFootball/></span><span><IoIosFootball/></span>dBall</h1>
      </div>
     </nav>
    )

}

export default NavBar;