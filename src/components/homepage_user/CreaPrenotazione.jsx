import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import CardEvento from "./CardEvento";
import { SHOW_CARD_EVENT } from "../../redux/action";

const CreaPrenotazione = () => {
  const dispatch = useDispatch();
  const [eventCity, setEventCity] = useState("Milano");
  const handleChangeEvent = (e) => {
    setEventCity(e);
  };
  const showCardEventState = useSelector((state) => state.show.showCardEvent);
  const [eventState, setEventState] = useState();
  const clickShowEvent = () => {
    setEventState(!eventState);
    dispatch({ type: SHOW_CARD_EVENT, payload: eventState });
  };
  return (
    <>
      <Row className="text-center">
        <Col xs={12}>
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
      <Row>
        {showCardEventState === true && <CardEvento citta={eventCity} />}
      </Row>
    </>
  );
};
export default CreaPrenotazione;
