import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Componants/NavBar";
import EditSlotList from "../Componants/EditSlotList";

const EditSlotPage = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://localhost:44316/api/movies/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error("Failed to fetch movie. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://localhost:44316/api/movies/slots/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSlots(data);
        } else {
          console.error("Error fetching slots:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <h2 className="text-center my-4">Edit Slots for "{movie.title}"</h2>
      <EditSlotList slots={slots} />
    </>
  );
};

export default EditSlotPage;
