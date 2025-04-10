import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditSlotModal = ({ show, handleClose, slot }) => {
  const [movieId, setMovieId] = useState(slot.movieId);
  const [cinemaHall, setCinemaHall] = useState(slot.cinemaHall);
  const [date, setDate] = useState(slot.date);
  const [timing, setTiming] = useState(slot.timing);
  const [availableSeats, setAvailableSeats] = useState(slot.availableSeats);
  const [price, setPrice] = useState(slot.price);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:44316/api/movies/slots/update/${slot.showId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: parseInt(movieId),
          cinemaHall,
          date,
          timing,
          availableSeats: parseInt(availableSeats),
          price: parseFloat(price),
        }),
      });

      if (response.ok) {
        alert("Slot updated successfully.");
        window.location.reload();
      } else {
        alert("Failed to update slot.");
      }
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formMovieId">
            <Form.Label>Movie ID</Form.Label>
            <Form.Control
              type="number"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCinemaHall" className="mt-3">
            <Form.Label>Cinema Hall</Form.Label>
            <Form.Control
              type="text"
              value={cinemaHall}
              onChange={(e) => setCinemaHall(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDate" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTiming" className="mt-3">
            <Form.Label>Timing</Form.Label>
            <Form.Control
              type="text"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSeats" className="mt-3">
            <Form.Label>Available Seats</Form.Label>
            <Form.Control
              type="number"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSlotModal;
