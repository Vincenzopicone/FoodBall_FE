import { useEffect, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const PersonalPage = () => {
  const myUsername = useSelector((state) => state.app.myProfile.username);
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const [invioOK, setInvioOK] = useState(false);
  const [invioNOT_OK, setInvioNOT_OK] = useState(false);
  const [profilo, setProfilo] = useState({});
  const [invioModifica, setInvioModifica] = useState(false);
  const [name, setName] = useState();
  const [eMail, setEMail] = useState();
  const [indirizzo, setIndirizzo] = useState();
  const [citta, setCitta] = useState();
  const [telefono, setTelefono] = useState();
  const clickModifyProfile = () => {
    setInvioModifica(true);
  };

  const getProfilo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/profilo/${myUsername}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProfilo(data);
        setName(data.name);
        setEMail(data.email);
        setIndirizzo(data.indirizzo);
        setCitta(data.citta);
        setTelefono(data.numerotelefono);
      } else {
      }
    } catch (error) {}
  };

  const modificaProfilo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/profilo/modifica`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: profilo.username,
            name: name,
            email: eMail,
            indirizzo: indirizzo,
            citta: citta,
            numerotelefono: telefono,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfilo(data);
        setInvioModifica(false);
        setInvioOK(true);
        setInvioNOT_OK(false);
      } else {
        setInvioModifica(false);
        setInvioNOT_OK(true);
        setInvioOK(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getProfilo();
  }, []);

  useEffect(() => {
    setInvioModifica(false);
    if (invioModifica === true) {
      modificaProfilo();
    }
  }, [invioModifica]);

  return (
    <>
      <Row>
        {invioOK === true && (
          <Alert variant={"success"}>Modifica effettuata.</Alert>
        )}

        {invioNOT_OK === true && (
          <Alert variant={"danger"}>
            Modifica non effettuata. Controllare i dati inseriti.
          </Alert>
        )}
      </Row>
      <Row className="border border-secondary rounded p-3 justify-content-center bg-light ">
        <Col xs={12} className="text-center">
          <h2>I miei dati personali</h2>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center mb-3"
        >
          <div>Nome e cognome</div>
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={profilo.name}
            className="rounded p-2"
            type="text"
            placeholder="Nome e cognome"
          ></input>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center mb-3"
        >
          <div>eMail</div>
          <input
            onChange={(e) => setEMail(e.target.value)}
            defaultValue={profilo.email}
            className="rounded p-2"
            type="email"
            placeholder="eMail"
          ></input>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center mb-3"
        >
          <div>Indirizzo</div>
          <input
            onChange={(e) => setIndirizzo(e.target.value)}
            defaultValue={profilo.indirizzo}
            className="rounded p-2"
            type="text"
            placeholder="Indirizzo"
          ></input>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center mb-3"
        >
          <div>Città</div>
          <input
            onChange={(e) => setCitta(e.target.value)}
            defaultValue={profilo.citta}
            className="rounded p-2"
            type="text"
            placeholder="Città"
          ></input>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center mb-3"
        >
          <div>Numero di telefono</div>
          <input
            onChange={(e) => setTelefono(e.target.value)}
            defaultValue={profilo.numerotelefono}
            className="rounded p-2"
            type="text"
            placeholder="Numero di telefono"
          ></input>
        </Col>
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Button variant="success" onClick={() => clickModifyProfile()}>
            {" "}
            Modifica
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PersonalPage;
