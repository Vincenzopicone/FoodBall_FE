import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { VscLocation } from "react-icons/vsc";
import { BsCalendar3 } from "react-icons/bs";
import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_CARD_EVENT } from "../../redux/action";

const CardEvento = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const [eventState, setEventState] = useState();
  const [utente, setUtente] = useState(myProfile.username);
  const [event, setEvent] = useState([]);
  const showCardEventState = useSelector((state) => state.show.showCardEvent);
  const [postiSelezionati, setPostiSelezionati] = useState();
  const [invioReservation, setInvioReservation] = useState(false);
  const [invioOK, setInvioOK] = useState(false);
  const [invioNOT_OK, setInvioNOT_OK] = useState(false);
  const [msg, setMsg] = useState("");
  moment.locale("it");
  const postiPrenotati = [];
  for (let i = 1; i < 16; i++) {
    postiPrenotati.push(i);
  }
  const [reservation, setReservation] = useState();
  const saveReservation = (e) => {
    setReservation(e);
    setInvioReservation(true);
  };
  const handleSelectChange = (e) => {
    setPostiSelezionati(e);
  };
  const postAddRservation = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/prenotazione/crea",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idevento: reservation,
            usernameutente: utente,
            numeropersone: postiSelezionati,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setInvioReservation(false);
        setInvioOK(true);
        setInvioNOT_OK(false);
      } else {
        setInvioReservation(false);
        setInvioNOT_OK(true);
        setInvioOK(false);

        setMsg(data.message);
      }
    } catch (error) {}
  };

  const getEventByCity = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/citta/${props.citta}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      }
    } catch {}
  };

  useEffect(() => {
    if (showCardEventState === true) {
      getEventByCity();
    }
  }, [eventState, invioOK]);

  useEffect(() => {
    if (invioReservation === true) {
      postAddRservation();
    }
  }, [invioReservation]);
  return (
    <Container fluid>
      <Row className="py-2">
        <h6>
          Ecco gli eventi a: <strong>{event[0]?.citta}</strong>
        </h6>
      </Row>
      {invioOK === true && (
        <Alert variant={"success"}>Prenotazione effettuata</Alert>
      )}
      {invioNOT_OK === true && <Alert variant={"danger"}>{msg}</Alert>}
      {event &&
        event.map((e) => (
          <Row key={e.id} className="border border-tertiary mb-2 p-2 rounded">
            <Col xs={12}>
              <Row xs={12}>
                <Col>
                  <span className="me-2">
                    <BsCalendar3 />
                  </span>
                  <strong>{moment(e.data).format("DD-MMM-YYYY")}</strong>
                </Col>
                <Col>Posti Disponibili: {e.postidisponibili}</Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  <Row>
                    <div className="fst-italic">
                      <span className="fw-bold text-uppercase">
                        {e.locale?.nomelocale}
                      </span>{" "}
                      <span>
                        <VscLocation />
                      </span>{" "}
                      {e.citta}, {e.locale?.indirizzo}
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row>
                <strong>
                  {e.partita?.squadra1} vs {e.partita?.squadra2}
                </strong>
              </Row>
              <Row className="d-flex align-item-baseline">
                <Col
                  xs={8}
                  className="d-flex align-items-center justify-content-end"
                >
                  <div>Per quanti vuoi prenotare?</div>
                </Col>
                <Col
                  xs={1}
                  className="d-flex align-items-center justify-content-start"
                >
                  <select onChange={(e) => handleSelectChange(e.target.value)}>
                    {postiPrenotati.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>
                </Col>
                <Col xs={3}>
                  <div className="d-flex align-item-center">
                    <Button
                      variant="success"
                      onClick={() => saveReservation(e.id)}
                    >
                      {" "}
                      Prenota
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
    </Container>
  );
};

export default CardEvento;
