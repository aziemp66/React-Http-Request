import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [movies, setMovies] = useState([]);

	const fetchMovieHandler = () => {
		setIsLoading(true);
		fetch("https://swapi.dev/api/films/")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
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
			});
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>
				{isLoading ? (
					<h1>Loading...</h1>
				) : (
					<MoviesList movies={movies} />
				)}
			</section>
		</React.Fragment>
	);
}

export default App;
