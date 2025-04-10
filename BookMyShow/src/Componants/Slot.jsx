import Button from "react-bootstrap/Button";
import { useState } from "react";
import Card from "react-bootstrap/Card";

import Seats from "./Seats";

const Slot = ({ slot }) => {

  const isHousefull = slot.availableSeats === 0;
  const [show, setShow] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  

  return (
    <>
      <Card style={{
        width: "100%",
        position: "relative",
        padding: "15px"
      }}>
        <Card.Body>
          <Card.Title style={{
            fontSize: "1.3rem",
            fontWeight: "bold"
          }}>{slot.cinemaHall}</Card.Title>

          <span style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#000",
            position: "absolute",
            top: "15px",
            right: "15px"
          }}>₹{slot.price}</span>

          <Card.Text style={{
            marginTop: "8px",
            fontSize: "1rem",
            color: "#555"
          }}>
            {formatDate(slot.date)} <br />
            {slot.timing} <br />
          </Card.Text>

          <Button
            variant="primary"
            style={{
              position: "absolute",
              bottom: "35px",
              right: "15px",
              opacity: isHousefull ? 0.5 : 1,
              pointerEvents: isHousefull ? "none" : "auto"
            }}
            onClick={() => setShow(true)}
            disabled={isHousefull}
          >
            {isHousefull ? "Housefull" : "Proceed"}
          </Button>
        </Card.Body>
      </Card>

      <Seats slot={slot} show={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default Slot;
