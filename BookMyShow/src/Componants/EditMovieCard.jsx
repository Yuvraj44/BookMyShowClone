import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import UpdateMovieModal from "./UpdateMovieModal";
import AddSlotModal from "./AddSlotModal";

const EditMovieCard = ({ movie }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showSlotModal, setShowSlotModal] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://localhost:44316/api/movies/delete/${movie.movieId}`, {
                method: "DELETE",
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
                    transition: 'transform 0.3s ease-in-out'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
                    <Card.Img
                        src={movie.imageUrl}
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
                        padding: '0 10px'
                    }}>
                        <span>{movie.genre}</span>
                        <span>{movie.duration}</span>
                    </div>

                    <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>
                        {movie.description}
                    </Card.Text>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                        <Button
                            variant="warning"
                            style={{ fontWeight: "bold", border: "none", padding: "10px 15px", fontSize: "1rem", borderRadius: "5px" }}
                            onClick={() => setShowUpdateModal(true)}
                        >Update</Button>
                        
                        <Button
                            variant="danger"
                            style={{ fontWeight: "bold", border: "none", padding: "10px 15px", fontSize: "1rem", borderRadius: "5px" }}
                            onClick={handleDelete}
                        >Delete</Button>
                    </div>

                    {/* Add Slot Button */}
                    <Button
                        variant="info"
                        style={{ fontWeight: "bold", border: "none", padding: "10px 15px", fontSize: "1rem", borderRadius: "5px", width: "80%" }}
                        onClick={() => setShowSlotModal(true)}
                    >
                        Add Slot
                    </Button>

                </Card.Body>
            </Card>

            {showUpdateModal && (
                <UpdateMovieModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} movie={movie} />
            )}

            {showSlotModal && (
                <AddSlotModal show={showSlotModal} handleClose={() => setShowSlotModal(false)} movieId={movie.movieId} />
            )}
        </>
    );
}

export default EditMovieCard;
