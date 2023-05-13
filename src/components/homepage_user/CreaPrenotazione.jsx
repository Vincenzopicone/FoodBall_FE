import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { SHOW_CARD_EVENT } from "../../redux/action";
import CardEvento from "./CardEvento";

const CreaPrenotazione = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.myProfile.accessToken);

  // stati per ricerca evento
  const [eventState, setEventState] = useState();
  const [eventCity, setEventCity] = useState("Milano");
  const [event, setEvent] = useState([]);
  const showCardEventState = useSelector((state) => state.show.showCardEvent);
  const handleChangeEvent = (e) => {
    setEventCity(e);
  };
  const clickShowEvent = () => {
    setEventState(!eventState);
    dispatch({ type: SHOW_CARD_EVENT, payload: eventState });
  };
  // fine stati per ricerca evento
  const getEventByCity = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/citta/${eventCity}`,
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
  }, [eventState]);
  return (
    <>
      <Row>
        <Col xs={12} md={8} lg={6}>
          <h2>Dove vuoi prenotare?</h2>
        </Col>
      </Row>
      <Row className="border border-secondary rounded justify-content-around py-3">
        <Col md={3} lg={3} className="text-center">
          <input
            className="rounded p-1 mb-1"
            type="text"
            placeholder="Ricerca per città"
            onChange={(e) => handleChangeEvent(e.target.value)}
          ></input>
        </Col>
        {/* <Col md={3} lg={3} className="text-center">
          <input
            className="rounded p-1 mb-1"
            type="text"
            placeholder="Ricerca per locale"
          ></input>
        </Col>
        <Col md={3} lg={3} className="text-center">
          <input
            className="rounded p-1 mb-2"
            type="text"
            placeholder="Ricerca per partita"
          ></input>
        </Col> */}
        <Col ms={3} lg={3} className="text-center">
          <Button variant={"secondary"} onClick={() => clickShowEvent()}>
            {" "}
            <span>
              <BsSearch />
            </span>{" "}
            Cerca
          </Button>
        </Col>
      </Row>
      <Row>{showCardEventState === true && <CardEvento evento={event} />}</Row>
    </>
  );
};
export default CreaPrenotazione;
