import { Button, Col, Container, Row } from "react-bootstrap";
import { VscLocation } from "react-icons/vsc";
import { BsCalendar3 } from "react-icons/bs";
import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CardEvento = (props) => {
  const myProfile = useSelector((state) => state.app.myProfile);
  const [utente, setUtente] = useState({
    username: myProfile.username,
  });
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [postiSelezionati, setPostiSelezionati] = useState("");

  const [invioReservation, setInvioReservation] = useState(false);
  moment.locale("it");
  // setto numero max posti prenotabili
  const postiPrenotati = [];
  for (let i = 1; i < 16; i++) {
    postiPrenotati.push(i);
  }
  const [reservation, setReservation] = useState({});
  const [dataPartita, setDataPartita] = useState();

  const saveReservation = (e) => {
    setReservation(e);
    setDataPartita(reservation.partita?.data);
    setInvioReservation(true);
    console.log("evento", reservation);
    console.log("utente", utente);
    console.log("data", today);
    console.log("dataevento", dataPartita);
    console.log("postiselezionati", postiSelezionati);
  };

  const handleSelectChange = (e) => {
    setPostiSelezionati(e);
  };

  const postAddRservation = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/prenotazione/prenotaora",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            body: JSON.stringify({
              utente: utente,
              evento: reservation,
              // dataevento: dataPartita,
              // dataprenotazione: today,
              numeropersone: postiSelezionati,
            }),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setInvioReservation(false);
      } else {
        setInvioReservation(false);
      }
    } catch {}
  };

  useEffect(() => {
    if (invioReservation === true) {
      postAddRservation();
    }
  }, [invioReservation]);
  return (
    <Container fluid>
      <Row className="py-2">
        <h6>
          Ecco gli eventi a: <strong>{props.evento[0]?.citta}</strong>
        </h6>
      </Row>
      {props.evento &&
        props.evento.map((e, i) => (
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
                <Col xs={8} className="d-flex align-items-center">
                  <div>Per quanti vuoi prenotare?</div>
                </Col>
                <Col xs={1}>
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
                      onClick={() => saveReservation(e)}
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
