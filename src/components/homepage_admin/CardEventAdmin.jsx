import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CardEvent = () => {
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const idLocale = useSelector((state) => state.app.myProfile.locale.id);
  const [locale, setLocale] = useState({});
  const [eventi, setEventi] = useState([]);

  const getEventi = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/locale/id/${idLocale}`,
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
        console.log(data);
        setLocale(data);
        setEventi(data.evento);
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    getEventi();
  }, []);

  return (
    <Container>
      <Row className="d-flex text-center justify-content-center border border-tertiary rounded">
        <Col xs={12}>
          <h2>I nostri eventi</h2>
        </Col>
      </Row>

      <Row className="border border-tertiary rounded">
        {eventi &&
          eventi.map((e) => (
            <>
              <Row key={e.id} className="mt-3">
                <Col xs={4}>EVENTO </Col>
                <Col xs={3}>DATA EVENTO</Col>
                <Col xs={3}>DISPONIBILI</Col>
                <Col xs={2}></Col>
              </Row>
              <Row>
                <Col xs={4}>
                  {e.partita.squadra1} vs {e.partita.squadra1}{" "}
                </Col>
                <Col xs={3}>{e.data}</Col>
                <Col xs={3}>{e.postidisponibili}</Col>
                <Col xs={2}>
                  {" "}
                  <Button>Prenotazioni {e.prenotazione.length}</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>N°</Col>
                <Col xs={2}>Data</Col>
                <Col xs={4}>Nome</Col>
                <Col xs={2}>Persone</Col>
              </Row>
              {e.prenotazione &&
                e.prenotazione.map((p, i) => (
                  <Row key={p.id}>
                    <Col xs={1}>{i + 1}</Col>
                    <Col xs={2}>{p.dataprenotazione}</Col>
                    <Col xs={4}>{p.utente.name}</Col>
                    <Col xs={2}>{p.numeropersone}</Col>
                  </Row>
                ))}
            </>
          ))}
      </Row>
    </Container>
  );
};
export default CardEvent;
