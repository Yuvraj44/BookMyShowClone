import MovieCard from "./MovieCard";

const MovieList = ({movies}) => {

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", justifyContent: "center" }}>
            {movies.map((movie) => (
                <MovieCard movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
