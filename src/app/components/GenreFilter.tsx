import React from "react";

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  setSelectedGenres,
}) => {
  const toggleGenre = (genre: string) => {
    setSelectedGenres(
      selectedGenres.includes(genre)
        ? selectedGenres.filter((g) => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  return (
    <div className="genre-filter">
      {genres.map((genre, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={genre}
            checked={selectedGenres.includes(genre)}
            onChange={() => toggleGenre(genre)}
          />
          {genre}
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;
