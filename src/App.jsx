import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);

	const fetchMovieHandler = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("https://swapi.dev/api/films");

			if (!response.ok) {
				throw new Error(
					`Could not fetch datas, received ${response.status} status`
				);
			}

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
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	let content = <h1>Found No Movies</h1>;

	if (error) {
		content = <h1>{error}</h1>;
	} else if (isLoading) {
		content = <h1>Loading...</h1>;
	} else if (!isLoading && movies.length > 0) {
		content = <MoviesList movies={movies} />;
	} else if (!isLoading && movies.length === 0) {
		content = <h1>Found No Movies</h1>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
