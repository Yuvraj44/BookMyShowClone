import MovieList from "../Componants/MovieList"
import Label from "../Componants/Label"
import NavBar from "../Componants/NavBar";
import { useState, useEffect } from "react";


const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:44316/api/movies", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <NavBar />
      <Label text="Now In Cinemas" />
      <MovieList movies={movies} />
    </>
  );
};

export default MoviePage;
