import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const MovieInfoCard = ({ movie }) => {

    const navigate = useNavigate();

    return (
        <Card
            style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease-in-out'
            }}
            
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
                    <span>
                        {movie.duration}
                    </span>
                </div>



                <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>
                    {movie.description}
                </Card.Text>
                {/* <Button
                    variant="primary"
                    style={{
                        backgroundColor: "#1877F2",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "1rem",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        transition: "background-color 0.3s ease-in-out"
                    }}

                    onClick={() => navigate(`/book/${movie.movieId}`)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "red"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1877F2"}
                >Rating</Button> */}
            </Card.Body>
        </Card>
    );
}

export default MovieInfoCard;
