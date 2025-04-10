import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EditSlotModal from './EditSlotModal';

const EditSlot = ({ slot }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this slot?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:44316/api/movies/slot/delete/${slot.showId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Slot deleted successfully.");
        window.location.reload();
      } else {
        alert("Failed to delete slot.");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

 

  return (
    <>
      <Card style={{ width: "100%", position: "relative", padding: "15px" }} className="mb-4 shadow-sm rounded">
        <Card.Body>
          <Card.Title style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            {slot.cinemaHall}
          </Card.Title>

          <span style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#000",
            position: "absolute",
            top: "15px",
            right: "15px"
          }}>
            ₹{slot.price}
          </span>

          <Card.Text style={{ marginTop: "8px", fontSize: "1rem", color: "#555" }}>
            {formatDate(slot.date)} <br />
            {slot.timing}
          </Card.Text>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="warning" onClick={() => setShowModal(true)}>Edit</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Card.Body>
      </Card>

      <EditSlotModal show={showModal} handleClose={() => setShowModal(false)} slot={slot} />
    </>
  );
};

export default EditSlot;
