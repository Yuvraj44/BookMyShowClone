import MovieList from "../Componants/MovieList"
import Label from "../Componants/Label"
import NavBar from "../Componants/NavBar";
import { useState, useEffect } from "react";
import EditMovieList from "../Componants/EditMovieList";

const EditMoviePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://localhost:44316/api/movies");
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
      <Label text="Edit movies" />
      <EditMovieList movies={movies} />
    </>
  );
};

export default EditMoviePage;
