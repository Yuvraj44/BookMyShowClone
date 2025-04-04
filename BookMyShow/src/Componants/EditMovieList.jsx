import EditMovieCard from "./EditMovieCard";



const EditMovieList = ({movies}) => {

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "60px", justifyContent: "center" }}>
            {movies.map((movie) => (
                <EditMovieCard movie={movie} />
            ))}
        </div>
    );
};

export default EditMovieList;
