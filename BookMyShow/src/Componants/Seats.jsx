import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Counter from "./Counter";
import { useNavigate } from "react-router-dom";

const Seats = ({ slot, show, handleClose }) => {
  const [count, setCount] = useState(0);
  const totalprice = count * slot.price;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;

  const handlePayment = async () => {
    const payload = {
      userId: Number(userId),
      showId: slot.showId,
      tickets: count,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:44316/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json",  Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const ticket = await response.json(); 
        navigate("/ticket", { state: { ticket } }); 
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Your Seats</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h4>{slot.availableSeats} seats are available</h4>
        <div className="d-flex justify-content-center my-3">
          <Counter availableSeats={slot.availableSeats} price={slot.price} onCountChange={setCount} />
        </div>
        <h5 className="mt-3">Total price: ₹{totalprice}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" disabled={count === 0} onClick={handlePayment}>
          Pay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Seats;
