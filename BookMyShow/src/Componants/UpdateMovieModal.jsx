import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateMovieModal = ({ show, handleClose, movie }) => {
    const [updatedMovie, setUpdatedMovie] = useState({ ...movie });

    const handleChange = (e) => {
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch(`https://localhost:44316/api/movies/update/${movie.movieId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",  Authorization: `Bearer ${token}` },
                body: JSON.stringify(updatedMovie),
            });
            if (response.ok) {
                alert("Movie updated successfully.");
                handleClose();
                window.location.reload();
            } else {
                alert("Failed to update movie.");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            alert("An error occurred.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={updatedMovie.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="imageUrl" value={updatedMovie.imageUrl} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" value={updatedMovie.genre} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type="text" name="duration" value={updatedMovie.duration} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" value={updatedMovie.description} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleUpdate}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateMovieModal;
