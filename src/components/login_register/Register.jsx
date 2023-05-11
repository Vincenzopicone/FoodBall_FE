import { useEffect, useState } from "react";
import { Container, Row, Col, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");
    const [role, setRole] = useState([]);
    const [invioRegister, setInvioRegister] = useState(false);
    const handleSelect = (event) => {
        role.push(event)
    }
    const sendRegister = () => {
        setInvioRegister(!invioRegister);
      };

    const postRegister = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
              name: nome,
              surname: cognome,
              roles: role,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            
       
          } else {
          }
        } catch (error) {}
      };

      useEffect(() => {

        if(invioRegister === true) {     
         postRegister();
         navigate("/");
        }

      }, [invioRegister]);

    return (
        <>
        <div className="bodyLogin"></div>
        <Container className="d-flex justify-content-center align-item-center bg-login pt-5">
          <Row className="d-flex align-items-center m-0 p-0">
          <div class="login-box">
            <p>Registrati a FoodBall</p>
            <form>
              <div class="user-box">
                <input required="" name="" type="text" onChange={(e)=> setUsername(e.target.value)}/>
                <label>Username</label>
              </div>
              <div class="user-box">
                <input required="" name="" type="password" onChange={(e)=> setPassword(e.target.value)}/>
                <label>Password</label>
              </div>
              <div class="user-box">
                <input required="" name="" type="email" onChange={(e)=> setEmail(e.target.value)}/>
                <label>Email</label>
              </div>
              <div class="user-box">
                <input required="" name="" type="text" onChange={(e)=> setNome(e.target.value)}/>
                <label>Nome</label>
              </div>
              <div class="user-box">
                <input required="" name="" type="text" onChange={(e)=> setCognome(e.target.value)}/>
                <label>Cognome</label>
              </div>
              <select className="p-1 rounded" onChange={(e) => handleSelect(e.target.value)}>
                <option selected>Sei un utente o un ristoratore?</option>
                <option value={"ROLE_USER"}>UTENTE</option>
                <option value={"ROLE_ADMIN"}> RISTORATORE </option>
              </select>
              <a onClick={() => sendRegister()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Registrati
              </a>
            </form>
            <p>
               Sei registrato?{" "}
              <a class="a2" onClick={() => navigate("/")}>
                Torna al login
              </a>
            </p>
          </div>

          </Row>
        </Container>
      </>
    )

}

export default Register;