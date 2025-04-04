import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddSlotModal = ({ show, handleClose, movieId }) => {
    const [slotData, setSlotData] = useState({
        movieId: movieId,
        cinemaHall: "",
        date: "",
        timing: "",
        availableSeats: 0,
        price: 0
    });

    const handleChange = (e) => {
        setSlotData({ ...slotData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:44316/api/movies/slots/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slotData),
            });

            if (response.ok) {
                alert("Slot added successfully!");
                handleClose();
            } else {
                alert("Failed to add slot.");
            }
        } catch (error) {
            console.error("Error adding slot:", error);
            alert("An error occurred.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Cinema Hall</Form.Label>
                        <Form.Control
                            type="text"
                            name="cinemaHall"
                            value={slotData.cinemaHall}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={slotData.date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Timing</Form.Label>
                        <Form.Control
                            type="text"
                            name="timing"
                            value={slotData.timing}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Available Seats</Form.Label>
                        <Form.Control
                            type="number"
                            name="availableSeats"
                            value={slotData.availableSeats}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={slotData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">Add Slot</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddSlotModal;
