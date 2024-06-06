"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieItem from "./components/MovieItem";
import GenreFilter from "./components/GenreFilter";

interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string[];
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch((error) => {
        setError("No se pudo cargar los datos de las películas.");
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter(
        (movie) =>
          (movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.description.toLowerCase().includes(search.toLowerCase())) &&
          (genreFilter.length === 0 ||
            genreFilter.some((genre) => movie.genre.includes(genre)))
      )
    );
  }, [search, genreFilter, movies]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título, descripción"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <GenreFilter
        genres={["Action", "Drama", "Crime"]}
        selectedGenres={genreFilter}
        setSelectedGenres={setGenreFilter}
      />
      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <MovieItem
            key={movie.id}
            title={movie.title}
            description={movie.description}
            genre={movie.genre}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
