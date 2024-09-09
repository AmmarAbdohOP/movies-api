import React, { useState } from "react";
import styles from "@/styles/Pages/Movies/MovieCard.module.css";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, overview, poster_path, release_date } = movie;
  const [imgSrc, setImgSrc] = useState(
    `https://image.tmdb.org/t/p/w500${poster_path}`
  );

  const fallbackImageUrl = "/no-image.svg";

  const handleImageError = () => {
    setImgSrc(fallbackImageUrl);
  };

  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.movie_card}>
      <img
        src={imgSrc}
        alt={title}
        className={styles.poster_image}
        onError={handleImageError}
      />
      <div className={styles.movie_info}>
        <h6 className={styles.movie_title}>{title}</h6>
        <p className={styles.release_date}>{formattedDate || "Unknown Date"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
