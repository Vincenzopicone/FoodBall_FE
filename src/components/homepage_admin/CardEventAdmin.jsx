import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const CardEvent = () => {
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const idLocale = useSelector((state) => state.app.myProfile.locale.id);
  const [locale, setLocale] = useState({});
  const [eventi, setEventi] = useState([]);
  const [showPrenotazione, setShowPrenotazione] = useState();
  const [show, setShow] = useState(false);

  const clickShowReservation = (p) => {
    setShowPrenotazione(p);
    setShow(!show);
  };

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

      <Row className=" text-center py-3">
        {eventi &&
          eventi.map((e) => (
            <>
              <Col xs={12} className="border border-secondary rounded mb-3">
                <Row key={e.id} className="align-items-center ">
                  <Col xs={10}>
                    <Row>
                      <Col xs={4}>EVENTO </Col>
                      <Col xs={4}>DATA EVENTO</Col>
                      <Col xs={2}>DISPONIBILI</Col>
                      <Col xs={2}>PRENOTAZIONI</Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        {e.partita.squadra1} vs {e.partita.squadra1}{" "}
                      </Col>
                      <Col xs={4}>{moment(e.data).format("DD-MMM-YYYY")}</Col>
                      <Col xs={2}>{e.postidisponibili}</Col>
                      <Col xs={2}>{e.prenotazione.length}</Col>
                    </Row>
                  </Col>
                  <Col xs={2}>
                    {" "}
                    <Button onClick={() => clickShowReservation(e.id)}>
                      Dettaglio
                    </Button>
                  </Col>
                </Row>
                <div className="listReservation rounded border border-secondary">
                  <Row>
                    {showPrenotazione === e.id && show === true && (
                      <>
                        <Col xs={1}>N°</Col>
                        <Col xs={3}>Data</Col>
                        <Col xs={5}>Nome</Col>
                        <Col xs={3}>Persone</Col>
                      </>
                    )}
                  </Row>
                  <Row>
                    {showPrenotazione === e.id &&
                      show === true &&
                      e.prenotazione &&
                      e.prenotazione.map((p, i) => (
                        <>
                          <Col key={p.id} xs={1}>
                            {i + 1}
                          </Col>
                          <Col xs={3}>
                            {moment(p.dataprenotazione).format("DD-MMM-YYYY")}
                          </Col>
                          <Col xs={5}>{p.utente.name}</Col>
                          <Col xs={3}>{p.numeropersone}</Col>
                        </>
                      ))}
                  </Row>
                </div>
              </Col>
            </>
          ))}
      </Row>
    </Container>
  );
};
export default CardEvent;
