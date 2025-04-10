import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdateMovieModal from "./UpdateMovieModal";
import AddSlotModal from "./AddSlotModal";

const EditMovieCard = ({ movie }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:44316/api/movies/delete/${movie.movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Movie deleted successfully.");
        window.location.reload();
      } else {
        alert("Failed to delete movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <Card
        style={{
          width: '20rem',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
          <Card.Img
            src={movie.imageUrl}
            alt={movie.title}
            style={{
              marginTop: "15px",
              height: '350px',
              width: '250px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </div>

        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {movie.title}
          </Card.Title>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'grey',
            padding: '0 10px',
          }}>
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
          </div>

          <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>
            {movie.description}
          </Card.Text>

          <div className="d-flex justify-content-around mb-2">
            <Button
              variant="warning"
              onClick={() => setShowUpdateModal(true)}
            >
              Update
            </Button>

            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>

          <Button
            variant="info"
            className="mb-2"
            style={{ width: "80%" }}
            onClick={() => setShowSlotModal(true)}
          >
            Add Slot
          </Button>

          <Button
            variant="secondary"
            style={{ width: "80%" }}
            onClick={() => window.location.href = `/edit-slots/${movie.movieId}`}
          >
            Edit Slots
          </Button>
        </Card.Body>
      </Card>

      {showUpdateModal && (
        <UpdateMovieModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          movie={movie}
        />
      )}

      {showSlotModal && (
        <AddSlotModal
          show={showSlotModal}
          handleClose={() => setShowSlotModal(false)}
          movieId={movie.movieId}
        />
      )}
    </>
  );
};

export default EditMovieCard;
