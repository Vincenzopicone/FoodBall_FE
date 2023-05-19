import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import PlaceHolderRistorante from "../assets/PlaceHolderRistorante.png";
import moment from "moment";
import "moment/locale/it";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SAVE_MY_RESERVATION } from "../../redux/action";

const CardPrenotazione = () => {
  moment.locale("it");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const prenotazione = useSelector((state) => state.app.myReservation);
  const [utente, setUtente] = useState(myProfile.username);
  const [idDelete, setIdDelete] = useState();
  const [invioDelete, setInvioDelete] = useState(false);
  const [deleteOK, setDeleteOK] = useState(false);
  const [msg, setMsg] = useState("");

  // const [prenotazione, setPrenotazione] = useState();
  const refreshPersonalReservation = useSelector(
    (state) => state.show.refreshReservation
  );

  const handleClickDelete = (e) => {
    setInvioDelete(true);
    setIdDelete(e);
    console.log(e);
  };
  const getProfilo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/profilo/${utente}`,
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
        dispatch({ type: SAVE_MY_RESERVATION, payload: data.prenotazioni });
      } else {
      }
    } catch (error) {}
  };
  const deleteReservation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/prenotazione/rimuovi/${idDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.json();
      if (response.ok) {
        setInvioDelete(false);
        setDeleteOK(true);
      } else {
        setDeleteOK(true);
        const data = await response.json();
        setMsg(data.message);
      }
    } catch {}
  };
  useEffect(() => {
    if (invioDelete === true) {
      deleteReservation();
    }
  }, [invioDelete, deleteOK]);

  useEffect(() => {
    getProfilo();
  }, [refreshPersonalReservation, invioDelete]);
  return (
    <>
      <Row className="d-flex text-center justify-content-center">
        <Col xs={12}>
          <h2>Le mie prenotazioni</h2>
        </Col>
        {deleteOK === true && (
          <Row className="justify-content-end">
            <Col xs={12} md={8} lg={6}>
              <Alert variant={"danger"}>
                La prenotazione è stata cancellata con successo!
              </Alert>
            </Col>
          </Row>
        )}
      </Row>
      {prenotazione &&
        prenotazione.map((e) => (
          <Row
            key={e.id}
            className=" d-flex justify-content-between pt-1 border border-tertiary rounded mb-1 cardPrenotazione"
          >
            <Col xs={2}>
              <img
                style={{ height: "130px", width: "130px" }}
                src={PlaceHolderRistorante}
                alt="Placeholder ristorante"
              />
            </Col>
            <Col xs={10} className="d-flex flex-column justify-content-around">
              <Row className="nameRestaurantCard">
                <div className="d-flex align-item-center">
                  <strong>{e.evento.locale.nomelocale}</strong>
                </div>
              </Row>
              <Row>
                <Col xs={9}>
                  <strong>
                    {e.evento.locale.citta} - {e.evento.locale.indirizzo}
                  </strong>
                </Col>
                <Col xs={3} className="d-flex align-item-center">
                  <Button
                    variant={"danger"}
                    onClick={() => handleClickDelete(e.id)}
                  >
                    Cancella
                  </Button>
                </Col>
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
                  <strong>{moment(e.evento.data).format("DD-MMM")}</strong>
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
    </>
  );
};

export default CardPrenotazione;
