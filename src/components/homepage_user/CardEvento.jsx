import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { VscLocation } from "react-icons/vsc";
import { BsCalendar3 } from "react-icons/bs";
import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CardEvento = (props) => {
  const dispatch = useDispatch();
  const dateToStart = moment().format("YYYY-MM-DD");
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const [eventState, setEventState] = useState();
  const [utente, setUtente] = useState(myProfile.username);
  const [event, setEvent] = useState([]);
  const showCardEventState = useSelector((state) => state.show.showCardEvent);
  const [postiSelezionati, setPostiSelezionati] = useState(1);
  const [invioReservation, setInvioReservation] = useState(false);
  const [invioOK, setInvioOK] = useState(false);
  const [invioNOT_OK, setInvioNOT_OK] = useState(false);
  const [msg, setMsg] = useState("");
  moment.locale("it");
  const [pageable, setPageable] = useState(0);
  const postiPrenotati = [];
  for (let i = 1; i < 16; i++) {
    postiPrenotati.push(i);
  }
  const [reservation, setReservation] = useState();
  const saveReservation = (e) => {
    setReservation(e);
    setInvioReservation(true);
    setEventState(true);
  };
  const handleSelectChange = (e) => {
    setPostiSelezionati(e);
    setInvioNOT_OK(false);
    setInvioOK(false);
  };
  const forwardButton = () => {
    setPageable(pageable + 1);
  };
  const backButton = () => {
    setPageable(pageable - 1);
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
        setEventState(false);
        setPostiSelezionati(1);
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
        `http://localhost:8080/api/eventi/pageable/order/${props.citta}/data/${dateToStart}/page/${pageable}/size/9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvent(data.content);
      }
    } catch {}
  };

  useEffect(() => {
    if (showCardEventState === true) {
      getEventByCity();
    }
  }, [eventState, invioOK, pageable]);

  useEffect(() => {
    if (invioReservation === true) {
      postAddRservation();
    }
  }, [invioReservation]);
  return (
    <Container fluid>
      <Row className="py-2 justify-content-center align-items-baseline bg-light rounded py-2 mt-2">
        <Col xs={4} md={4}>
          <h6>
            Ecco gli eventi a: <strong>{event[0]?.citta}</strong>
          </h6>
        </Col>
        <Col xs={4} md={2}>
          <Button variant="outline-secondary" onClick={() => backButton()}>
            INDIETRO
          </Button>
        </Col>
        <Col xs={4} md={2}>
          <Button variant="outline-secondary" onClick={() => forwardButton()}>
            AVANTI
          </Button>
        </Col>
      </Row>
      {invioOK === true && (
        <Alert variant={"success"}>Prenotazione effettuata</Alert>
      )}
      {invioNOT_OK === true && <Alert variant={"danger"}>{msg}</Alert>}
      <Row className="d-flex justify-content-around bg-light rounded py-3 my-2">
        {event &&
          event.map((e) => (
            <>
              {/* <Row key={e.id} className="border border-tertiary mb-2 p-2 rounded"> */}
              <Col
                xs={11}
                md={5}
                className="border border-secondary rounded m-1 p-2 cardEvento"
              >
                <Row xs={12} className="py-1">
                  <Col xs={6} className="fst-italic">
                    {" "}
                    {e.locale.tipolocale}
                  </Col>
                  <Col xs={6} className="text-end">
                    <span className="me-2">
                      <BsCalendar3 />
                    </span>
                    <strong>{moment(e.data).format("DD-MMM-YYYY")}</strong>
                  </Col>
                </Row>
                <Row className="text-center">
                  <div className="fst-italic">
                    <span className="fw-bold text-uppercase">
                      {e.locale?.nomelocale}
                    </span>{" "}
                  </div>
                  <div>
                    <span>
                      <VscLocation />
                    </span>{" "}
                    {e.citta}, {e.locale?.indirizzo}
                  </div>
                </Row>
                <Row className="text-center py-2">
                  <strong>
                    {e.partita?.squadra1} vs {e.partita?.squadra2}
                  </strong>
                </Row>
                <Row className="text-center">
                  <div> Posti Disponibili: {e.postidisponibili}</div>
                  <div>Per quanti vuoi prenotare?</div>
                </Row>
                <Row className="py-2 d-flex justify-content-center">
                  <Col xs={5} className="d-flex justify-content-center">
                    <select
                      className="rounded p-1"
                      onChange={(e) => handleSelectChange(e.target.value)}
                    >
                      {postiPrenotati.map((e) => (
                        <option key={e.id} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xs={5}>
                    <div className="d-flex align-items-center">
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
            </>
            // </Row>
          ))}
      </Row>
    </Container>
  );
};

export default CardEvento;
