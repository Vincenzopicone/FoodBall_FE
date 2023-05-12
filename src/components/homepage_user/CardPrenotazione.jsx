import { Card, Col, Container, Row } from "react-bootstrap";
import PlaceHolderRistorante from "../assets/PlaceHolderRistorante.png";
import moment from "moment";
import "moment/locale/it";

const CardPrenotazione = (props) => {
  moment.locale("it");
  return (
    <Container className="py-3 cardPrenotazione px-0">
      {props.prenotazione &&
        props.prenotazione.map((e) => (
          <Row
            key={e.id}
            className=" d-flex justify-content-between border border-tertiary rounded mb-1"
          >
            <Col xs={2}>
              <img
                style={{ height: "130px", width: "130px" }}
                src={PlaceHolderRistorante}
                alt="Placeholder ristorante"
              />
            </Col>
            <Col xs={10} className="d-flex flex-column justify-content-around">
              <Row>
                <strong>{e.evento.locale.nomelocale}</strong>
              </Row>
              <Row>
                <strong>
                  {e.evento.locale.citta} - {e.evento.locale.indirizzo}
                </strong>
              </Row>
              <Row className="border-top">
                <Col className="text-center" xs={3}>
                  DATA
                </Col>
                <Col className="text-center" xs={4}>
                  PERSONE
                </Col>
                <Col className="text-center" xs={5}>
                  PARTITA
                </Col>
              </Row>
              <Row>
                <Col className="text-center" xs={3}>
                  <strong>{moment(e.evento.data).format("ddd-DD-MMM")}</strong>
                </Col>
                <Col className="text-center" xs={4}>
                  <strong>{e.numeropersone}</strong>
                </Col>
                <Col className="text-center" xs={5}>
                  <strong>
                    {e.evento.partita.squadra1} vs {e.evento.partita.squadra2}
                  </strong>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default CardPrenotazione;
