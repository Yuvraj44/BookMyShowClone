import { useEffect, useState } from "react";
import HomeCarousel from "../Componants/HomeCarousel";
import MovieCarousal from "../Componants/MovieCarousal";
import NavBar from "../Componants/NavBar";

const HomePage = () => {

  //object with key as genre and values as array of JSON objects.
  const [movies, setMovies] = useState({
    Anime: [],
    Horror: [],
    SciFi: [],
    RomCom: [],
  });

  useEffect(() => 
  {
    const fetchMovies = async (genre) => 
    {
      try 
      {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://localhost:44316/api/movies?genre=${genre}`
        , {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        setMovies((prev) => ({ ...prev, [genre]: data }));// prev is the current state; Keep the stae normal(...prev); genre:data=new change
      }
      catch (error) 
      {
        console.error(`Error fetching ${genre} movies:`, error);
      }
    };
    //Call the function with the following paranmeter
    ["Anime", "Horror", "SciFi", "RomCom"].forEach(fetchMovies);
  }, []);

  return (
    <>
      <NavBar />
      <HomeCarousel />
      <MovieCarousal movies={movies.Anime} text="Anime" />
      <MovieCarousal movies={movies.RomCom} text="RomCom" />
      <MovieCarousal movies={movies.Horror} text="Horror" />
      <MovieCarousal movies={movies.SciFi} text="SciFi" />
    </>
  );
};

export default HomePage;
