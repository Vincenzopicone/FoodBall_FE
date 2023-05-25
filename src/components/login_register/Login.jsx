import { useEffect, useState } from "react";
import "./LoginRegister.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_MY_PROFILE, REFRESH_RESERVATION } from "../../redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroreLogin, setErroreLogin] = useState(false);
  const [responseLogin, setResponseLogin] = useState();
  const [invioLogin, setInvioLogin] = useState(false);

  const fieldClickError = () => {
    setErroreLogin(false);
  };

  const handleClick = (e) => {
    setInvioLogin(!invioLogin);
  };

  const postLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseLogin(data.roles[0].roleName);
        dispatch({ type: SAVE_MY_PROFILE, payload: data });
        dispatch({ type: REFRESH_RESERVATION, payload: false });
        setInvioLogin(false);
        setErroreLogin(false);
      } else {
        setErroreLogin(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (invioLogin === true) {
      postLogin();
    }

    if (responseLogin === "ROLE_USER") {
      navigate("/homepageuser");
    } else if (responseLogin === "ROLE_ADMIN") {
      navigate("/homepageadmin");
    }
    setErroreLogin(false);
  }, [invioLogin]);

  return (
    <>
      <div className="bodyLogin"></div>
      <Container className="d-flex justify-content-center align-item-center bg-login">
        <Row className="d-flex align-items-center m-0 p-0">
          <div className="login-box">
            <p>Accedi a FoodBall</p>
            <form>
              <div className="user-box">
                <input
                  defaultValue={username}
                  required=""
                  name=""
                  type="text"
                  onClick={() => fieldClickError()}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  defaultValue={password}
                  required=""
                  name=""
                  type="password"
                  onClick={() => fieldClickError()}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password </label>
              </div>
              <a onClick={() => handleClick()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Accedi
              </a>
            </form>
            <p>
              Non sei registrato?{" "}
              <a className="a2" onClick={() => navigate("/register")}>
                Registrati!
              </a>
            </p>

            <a onClick={() => navigate("/")}>Torna alla Homepage</a>

            {erroreLogin === true && (
              <p className="text-danger"> Username o password errata!</p>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Login;
