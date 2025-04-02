import MovieList from "../Componants/MovieList"
import Label from "../Componants/Label"
import NavBar from "../Componants/NavBar";
import Slot from "../Componants/Slot";
import SlotList from "../Componants/SlotList"
import MovieInfoCard from "../Componants/MovieInfoCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";



    
const SlotPage = () =>
{

  const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const[slots,setSlots]=useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://localhost:44316/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    useEffect(() => {
      const fetchSlots = async () => {
          try {
              const response = await fetch(`https://localhost:44316/api/movies/slots/${id}`);
              const data = await response.json();
              setSlots(data);
          } catch (error) {
              console.error("Error fetching movie:", error);
          }
      };

      fetchSlots();
  }, [id]);
  

    if (!movie) return <p>Loading...</p>;

    return (
    <>
    <NavBar/>
    <MovieInfoCard movie={movie}/>
    <SlotList slots={slots}/>
    </>);
};

export default SlotPage;