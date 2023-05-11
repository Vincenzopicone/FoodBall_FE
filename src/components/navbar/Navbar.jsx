import {Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const NavBar = () => {

    return(

    <Row className='navBar py-3'>
      <div className=' d-flex justify-content-center'>
      <h1 className='titleNav'>FoodBall</h1>
      </div>
     </Row>
    )

}

export default NavBar;