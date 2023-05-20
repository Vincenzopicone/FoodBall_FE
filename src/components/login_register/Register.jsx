import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [citta, setCitta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipolocale, setTipoLocale] = useState("");
  const [role, setRole] = useState([]);
  const [roleSelect, setRoleSelect] = useState("");
  const [invioRegister, setInvioRegister] = useState(false);
  const [invioRegisterLocale, setInvioRegisterLocale] = useState(false);
  const handleSelect = (event) => {
    setRoleSelect(event);
    role.push(event);
  };

  const handleSelectLocale = (e) => {
    setTipoLocale(e);
  };
  const sendRegister = () => {
    setInvioRegister(!invioRegister);
  };
  const sendRegisterAdmin = () => {
    setInvioRegister(!invioRegister);
    setInvioRegisterLocale(true);
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
          indirizzo: indirizzo,
          citta: citta,
          telefono: telefono,
          roles: role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
      } else {
      }
    } catch (error) {
    } finally {
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/register/locale`,
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`,
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
      const data = await response.json();
      if (response.ok) {
        setInvioRegisterLocale(false);
      } else {
      }
    } catch {}
  };
  // const creaLocale = async () => {
  // try {
  //   const response = await fetch(
  //     `http://localhost:8080/api/auth/register/locale`,
  //     {
  //       method: "POST",
  //       headers: {
  //         // Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         nomelocale: nome,
  //         indirizzolocale: indirizzo,
  //         citta: citta,
  //         tipolocale: tipolocale,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   if (response.ok) {
  //     setInvioRegisterLocale(false);
  //   } else {
  //   }
  // } catch {}
  // };

  useEffect(() => {
    if (invioRegister === true) {
      postRegister();
      navigate("/");
    }
  }, [invioRegister]);

  // useEffect(() => {
  //   if (invioRegisterLocale === true) {
  //     creaLocale();
  //   }
  // }, [invioRegisterLocale]);

  return (
    <>
      <div className="bodyRegister">
        <Container className="d-flex flex-column justify-content-center py-5 bodyRegister">
          <div className="d-flex flex-column justify-content-center align-items-center rounded fieldRegister py-3">
            <Row>
              <h2>Registrati a FoodBall</h2>
            </Row>
            <Row className="mb-2">
              <Col className="d-flex justify-content-center align-content-center mt-4">
                <div>
                  <select
                    className="p-1 rounded"
                    onChange={(e) => handleSelect(e.target.value)}
                  >
                    <option selected>Utente o ristoratore?</option>
                    <option value={"ROLE_USER"}>UTENTE</option>
                    <option value={"ROLE_ADMIN"}> RISTORATORE </option>
                  </select>
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center mt-4">
                <div>
                  {roleSelect === "ROLE_ADMIN" && (
                    <select
                      className="p-1 rounded"
                      onChange={(e) => handleSelectLocale(e.target.value)}
                    >
                      <option selected>Che tipo di locale è?</option>
                      <option value={"RISTORANTE"}>RISTORANTE</option>
                      <option value={"PIZZERIA"}>PIZZERIA</option>
                      <option value={"PUB"}>PUB</option>
                      <option value={"BURGER"}>BURGER</option>
                    </select>
                  )}
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center">
                {roleSelect === "ROLE_USER" && (
                  <div className="user-box">
                    <div>Nome e Cognome</div>
                    <input
                      className="rounded p-1"
                      type="text"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                )}
                {roleSelect === "ROLE_ADMIN" && (
                  <div className="user-box">
                    <div>Nome Ristorante</div>
                    <input
                      className="rounded p-1"
                      type="text"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                )}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="d-flex justify-content-center align-content-center">
                {" "}
                <div class="user-box">
                  <div>Username</div>
                  <input
                    className="rounded p-1"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center">
                <div class="user-box">
                  <div>Email</div>
                  <input
                    className="rounded p-1"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center">
                <div class="user-box">
                  <div>Password</div>
                  <input
                    className="rounded p-1"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="d-flex justify-content-center align-content-center">
                <div class="user-box mt-3">
                  <div>Indirizzo</div>
                  <input
                    className="rounded p-1"
                    type="text"
                    onChange={(e) => setIndirizzo(e.target.value)}
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center">
                <div class="user-box mt-3">
                  <div>Città</div>
                  <input
                    className="rounded p-1"
                    type="text"
                    onChange={(e) => setCitta(e.target.value)}
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center align-content-center">
                <div class="user-box mt-3">
                  <div>Telefono</div>
                  <input
                    className="rounded p-1"
                    type="text"
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="py-2">
              <Col
                xs={12}
                className="d-flex justify-content-center align-content-center mb-3"
              >
                {roleSelect === "ROLE_USER" && (
                  <Button
                    variant="outline-light"
                    onClick={() => sendRegister()}
                  >
                    REGISTRATI
                  </Button>
                )}
                {roleSelect === "ROLE_ADMIN" && (
                  <Button
                    variant="outline-light"
                    onClick={() => sendRegisterAdmin()}
                  >
                    REGISTRATI
                  </Button>
                )}
              </Col>

              <Col
                xs={12}
                className="d-flex justify-content-center align-content-center text-secondary"
              >
                Sei registrato?{" "}
                <Link
                  to={"/login"}
                  class="ms-2 fw-bold text-decoration-none text-light"
                >
                  Torna al login
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Register;

// <Row className="d-flex align-items-center m-0 p-0">
// <div class="login-box">
//   <p>Registrati a FoodBall</p>
//   <form>
//     <select
//       className="p-1 rounded mb-2"
//       onChange={(e) => handleSelect(e.target.value)}
//     >
//       <option selected>Sei un utente o un ristoratore?</option>
//       <option value={"ROLE_USER"}>UTENTE</option>
//       <option value={"ROLE_ADMIN"}> RISTORATORE </option>
//     </select>
//     {roleSelect === "ROLE_ADMIN" && (
//       <select
//         className="p-1 rounded mb-2"
//         onChange={(e) => handleSelectLocale(e.target.value)}
//       >
//         <option selected>Che tipo di locale è?</option>
//         <option value={"RISTORANTE"}>RISTORANTE</option>
//         <option value={"PIZZERIA"}>PIZZERIA</option>
//         <option value={"PUB"}>PUB</option>
//         <option value={"BURGER"}>BURGER</option>
//       </select>
//     )}
//     {roleSelect === "ROLE_USER" && (
//       <div className="user-box mt-2">
//         <input
//           required=""
//           name=""
//           type="text"
//           onChange={(e) => setNome(e.target.value)}
//         />
//         <label>Nome e Cognome</label>
//       </div>
//     )}
//     {roleSelect === "ROLE_ADMIN" && (
//       <div className="user-box mt-2">
//         <input
//           required=""
//           name=""
//           type="text"
//           onChange={(e) => setNome(e.target.value)}
//         />
//         <label>Nome Ristorante</label>
//       </div>
//     )}
//     <div class="user-box mt-3">
//       <input
//         required=""
//         name=""
//         type="text"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <label>Username</label>
//     </div>
//     <div class="user-box">
//       <input
//         required=""
//         name=""
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <label>Password</label>
//     </div>
//     <div class="user-box">
//       <input
//         required=""
//         name=""
//         type="email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label>Email</label>
//     </div>

//     <div class="user-box mt-3">
//       <input
//         required=""
//         name=""
//         type="text"
//         onChange={(e) => setIndirizzo(e.target.value)}
//       />
//       <label>Indirizzo</label>
//     </div>
//     <div class="user-box mt-3">
//       <input
//         required=""
//         name=""
//         type="text"
//         onChange={(e) => setCitta(e.target.value)}
//       />
//       <label>Città</label>
//     </div>
//     <div class="user-box mt-3">
//       <input
//         required=""
//         name=""
//         type="text"
//         onChange={(e) => setTelefono(e.target.value)}
//       />
//       <label>Telefono</label>
//     </div>

//     {roleSelect === "ROLE_USER" && (
//       <a onClick={() => sendRegister()}>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         Registrati
//       </a>
//     )}
//     {roleSelect === "ROLE_ADMIN" && (
//       <a onClick={() => sendRegisterAdmin()}>
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//         Registrati
//       </a>
//     )}
//   </form>
//   <p>
//     Sei registrato?{" "}
//     <a class="a2" onClick={() => navigate("/")}>
//       Torna al login
//     </a>
//   </p>
// </div>
// </Row>
