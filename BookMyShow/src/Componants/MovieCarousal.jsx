import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MovieCard from "./MovieCard";
import Label from './Label';


const MovieList = ({ movies, text }) => {
    const items = movies.map((movie) => (
        <div className="item" key={movie.movieId} style={{ padding: "10px" }}>
            <MovieCard movie={movie} />
        </div>
    ));

    return (
		<>
		<div style={{ 
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", 
            borderRadius: "10px", 
            padding: "10px", 
            background: "#fff",
            margin: "20px"
        }}>
		<Label text={text}/>
        <AliceCarousel 
            mouseTracking 
            items={items} 
            responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 3 },
            }} 
            disableDotsControls={false}
            disableButtonsControls
        />
		</div>
		</>
    );
};

export default MovieList;
