import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);

	const fetchMovieHandler = async () => {
		setIsLoading(true);
		const response = await fetch("https://swapi.dev/api/films");
		const data = await response.json();

		const transformedData = data.results.map((item) => {
			return {
				id: item.episode_id,
				title: item.title,
				openingText: item.opening_crawl,
				releaseDate: item.release_date,
			};
		});

		setMovies(transformedData);
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>
				{isLoading && <div>Loading...</div>}
				{!isLoading && movies.length > 0 && (
					<MoviesList movies={movies} />
				)}
				{!isLoading && movies.length === 0 && <h1>No movies found</h1>}
			</section>
		</React.Fragment>
	);
}

export default App;
