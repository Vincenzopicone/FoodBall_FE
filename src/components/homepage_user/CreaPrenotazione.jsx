import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import CardEvento from "./CardEvento";
import { SHOW_CARD_EVENT } from "../../redux/action";

const CreaPrenotazione = () => {
  // const dispatch = useDispatch();
  // const [eventCity, setEventCity] = useState("");
  // const handleChangeEvent = (e) => {
  //   setEventCity(e);
  // };
  // const showCardEventState = useSelector((state) => state.show.showCardEvent);
  // const [eventState, setEventState] = useState(false);
  // const clickShowEvent = () => {
  //   setEventState(true);
  //   dispatch({ type: SHOW_CARD_EVENT, payload: eventState });
  // };
  return (
    <>
      {/* <Row className="border border-secondary rounded justify-content-center searchSection">
        <Col
          md={7}
          lg={4}
          className="text-center d-flex flex-column justify-content-center p-3"
        >
          <div className="d-flex flex-column bg-light p-3 rounded">
            <h5 className="fw-bold">Prenota un tavolo</h5>
            <input
              className="rounded p-1 mb-1"
              type="text"
              placeholder="Ricerca per città"
              onChange={(e) => handleChangeEvent(e.target.value)}
            ></input>

            <Button variant={"secondary"} onClick={() => clickShowEvent()}>
              {" "}
              <span>
                <BsSearch />
              </span>{" "}
              Cerca
            </Button>
          </div>
        </Col>
        {/* <Col xs={6} className="backgroundSearch">
          <div></div>
        </Col> */}
      {/* </Row> */}
      {/* <Row> */}
      {/* {showCardEventState === true && <CardEvento citta={eventCity} />} */}
      {/* <CardEvento citta={eventCity} />
      </Row> */}
    </>
  );
};
export default CreaPrenotazione;
