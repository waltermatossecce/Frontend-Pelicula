import React from "react";

interface MovieItemProps {
  title: string;
  description: string;
  genre: string[];
}

const MovieItem: React.FC<MovieItemProps> = ({ title, description, genre }) => {
  return (
    <div className="movie-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Géneros:</strong> {genre.join(", ")}
      </p>
    </div>
  );
};

export default MovieItem;
