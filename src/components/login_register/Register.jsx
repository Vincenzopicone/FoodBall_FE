import { useEffect, useState } from "react";
import { Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SHOW_HOME, SHOW_NEWS, SHOW_REGISTER } from "../../redux/action";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [citta, setCitta] = useState("");
  const [ntelefono, setNtelefono] = useState("");

  const [tipolocale, setTipoLocale] = useState("");

  const [roleSelect, setRoleSelect] = useState("");
  const [registerOK, setRegisterOK] = useState(false);
  const [registerNotOK, setRegisterNotOK] = useState(false);
  const [msg, setMsg] = useState("");
  const [invioRegisterLocale, setInvioRegisterLocale] = useState(false);

  const handleSelect = (event) => {
    setRoleSelect(event);
    setRole([event]);
  };
  const handleSelectLocale = (e) => {
    setTipoLocale(e);
  };
  const sendRegister = () => {
    postRegister();
  };

  const registerComplete = () => {
    dispatch({ type: SHOW_HOME, payload: true });
  };

  const clickShowHome = () => {
    dispatch({ type: SHOW_HOME, payload: true });
    dispatch({ type: SHOW_NEWS, payload: false });
    dispatch({ type: SHOW_REGISTER, payload: false });
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
          indirizzo: indirizzo,
          citta: citta,
          numerotelefono: ntelefono,
          roles: role,
        }),
      });

      if (response.ok) {
        const data = response.json();
        setMsg(data.message);
        setRegisterNotOK(false);
        setRegisterOK(true);
        if (roleSelect === "ROLE_USER") {
          registerComplete();
        }

        if (roleSelect === "ROLE_ADMIN") {
          postRegisterAdmin();
        }
      } else {
        const data = await response.json();
        setMsg(data.message);
        setRegisterNotOK(true);
        setRegisterOK(false);
      }
    } catch (error) {}
  };

  const postRegisterAdmin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/register/locale`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            nomelocale: nome,
            indirizzolocale: indirizzo,
            citta: citta,
            tipolocale: tipolocale,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        registerComplete();
      } else {
        const data = await response.json();
      }
    } catch {}
  };

  return (
    <Row className="justify-content-center pt-5">
      <Col
        xs={11}
        xl={10}
        className="rounded bg-light border border-secondary rounded py-3"
      >
        <Row className="text-center">
          <h2>Registrati a FoodBall</h2>
        </Row>
        <Row className="mb-2 justify-content-center text-center fw-bold">
          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-items-center text-center mt-4"
          >
            <select
              className="p-1 rounded-pill text-center"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option selected>Utente o ristoratore?</option>
              <option value={"ROLE_USER"}>UTENTE</option>
              <option value={"ROLE_ADMIN"}> RISTORATORE </option>
            </select>
          </Col>
          {roleSelect === "ROLE_ADMIN" && (
            <Col
              xs={12}
              sm={6}
              md={4}
              className="d-flex justify-content-center align-content-center mt-4"
            >
              <div className="text-center">
                <select
                  className="p-1 rounded-pill text-center"
                  onChange={(e) => handleSelectLocale(e.target.value)}
                >
                  <option selected>Che tipo di locale è?</option>
                  <option value={"RISTORANTE"}>RISTORANTE</option>
                  <option value={"PIZZERIA"}>PIZZERIA</option>
                  <option value={"PUB"}>PUB</option>
                  <option value={"BURGER"}>BURGER</option>
                </select>
              </div>
            </Col>
          )}
          {roleSelect === "ROLE_USER" && (
            <Col
              xs={12}
              sm={6}
              md={4}
              className="d-flex justify-content-center align-content-center text-center"
            >
              <div className="user-box">
                <div>Nome e Cognome</div>
                <input
                  className="rounded-pill p-1"
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </Col>
          )}

          {roleSelect === "ROLE_ADMIN" && (
            <Col
              xs={12}
              sm={6}
              md={4}
              className="d-flex justify-content-center align-content-center text-center"
            >
              <div className="user-box">
                <div>Nome Ristorante</div>
                <input
                  className="rounded-pill p-1"
                  type="text"
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </Col>
          )}

          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            {" "}
            <div class="user-box">
              <div>Username</div>
              <input
                className="rounded-pill p-1"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            <div class="user-box">
              <div>Password</div>
              <input
                className="rounded-pill p-1"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            <div class="user-box">
              <div>Email</div>
              <input
                className="rounded-pill p-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Col>

          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            <div class="user-box">
              <div>Indirizzo</div>
              <input
                className="rounded-pill p-1"
                type="text"
                onChange={(e) => setIndirizzo(e.target.value)}
              />
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            <div class="user-box">
              <div>Città</div>
              <input
                className="rounded-pill p-1"
                type="text"
                onChange={(e) => setCitta(e.target.value)}
              />
            </div>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={4}
            className="d-flex justify-content-center align-content-center"
          >
            <div class="user-box">
              <div>Telefono</div>
              <input
                className="rounded-pill p-1"
                type="text"
                onChange={(e) => setNtelefono(e.target.value)}
              />
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-center align-content-center my-3"
          >
            {/* {roleSelect === "ROLE_USER" && ( */}
            <Button
              variant="outline-secondary rounded-pill"
              onClick={() => sendRegister()}
            >
              REGISTRATI
            </Button>
            {/* // )}
            // {roleSelect === "ROLE_ADMIN" && (
            //   <Button
            //     variant="outline-secondary rounded-pill"
            //     onClick={() => sendRegisterAdmin()}
            //   >
            //     REGISTRATI
            //   </Button>
            // )} */}
          </Col>
        </Row>

        <Col
          xs={12}
          className="d-flex justify-content-center align-content-center text-secondary"
        >
          Sei registrato?{" "}
          <Link
            onClick={() => clickShowHome()}
            class="ms-2 fw-bold text-decoration-none text-dark"
          >
            Torna alla home
          </Link>
        </Col>
        <Col xs={12} className="text-center">
          {registerOK === true && <p className="text-success"> {msg} </p>}
          {registerNotOK === true && <p className="text-danger"> {msg} </p>}
        </Col>
      </Col>
    </Row>
  );
};

export default Register;
